import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  PawPrint, 
  ArrowRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  Maximize2 
} from 'lucide-react'
import api from '../services/api'
import NavBar from '../components/NavBar'

const Gallery = () => {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)

  // Lightbox Modal States
  const [selectedImage, setSelectedImage] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const imgRef = useRef(null)

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get('/animals')
        setAnimals(response.data.animals || [])
      } catch (error) {
        console.error('Error fetching animals for gallery:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnimals()
  }, [])

  // Open Lightbox
  const handleOpenModal = (animal) => {
    setSelectedImage(animal)
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }

  // Close Lightbox
  const handleCloseModal = () => {
    setSelectedImage(null)
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }

  // Zoom Controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 4))
  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const nextZoom = Math.max(prev - 0.5, 1)
      if (nextZoom === 1) setPosition({ x: 0, y: 0 })
      return nextZoom
    })
  }

  const handleResetZoom = () => {
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 })
  }

  // Mouse Wheel Zoom
  const handleWheel = (e) => {
    if (!selectedImage) return
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  // Drag / Pan Logic
  const handleMouseDown = (e) => {
    if (zoomLevel <= 1) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e) => {
    if (!isDragging || zoomLevel <= 1) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => setIsDragging(false)

  return (
    <main className="min-h-screen bg-cream">
      <NavBar/>
      {/* Hero */}
      <section className="bg-farm-green-dark px-6 py-32 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
            Life at the Farm
          </p>
          <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
            Our Gallery
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-white/60">
            Meet the animals and discover the livestock behind Bismillah Dairy Farm.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-farm-green font-medium">Loading animals...</p>
            </div>
          ) : animals.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-muted font-medium">
                No animals available in the gallery yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {animals.map((animal) => (
                <article
                  key={animal._id}
                  className="group overflow-hidden bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Clickable Image Area */}
                  <div
                    className="relative h-80 cursor-pointer overflow-hidden"
                    onClick={() => handleOpenModal(animal)}
                  >
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                      <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-farm-green shadow-lg">
                        <Maximize2 size={14} />
                        View & Zoom
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold-dark">
                      <PawPrint size={14} />
                      {animal.type}
                    </div>

                    <h2 className="mt-2 font-display text-2xl text-farm-green">
                      {animal.name}
                    </h2>

                    <p className="mt-1 text-sm text-muted">{animal.breed}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Professional Zoom Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm select-none"
          onWheel={handleWheel}
        >
          {/* Top Control Bar */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-white">
            <div>
              <p className="font-display text-lg text-white">
                {selectedImage.name}
              </p>
              <p className="text-xs uppercase tracking-wider text-gold-light">
                {selectedImage.type} • {selectedImage.breed}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 bg-black/50 p-2 rounded-lg border border-white/10">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-2 hover:bg-white/20 rounded transition disabled:opacity-30"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>

              <span className="text-xs font-mono w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 4}
                className="p-2 hover:bg-white/20 rounded transition disabled:opacity-30"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>

              <button
                onClick={handleResetZoom}
                className="p-2 hover:bg-white/20 rounded transition"
                title="Reset Zoom"
              >
                <RotateCcw size={18} />
              </button>

              <div className="h-5 w-px bg-white/20 mx-1" />

              <button
                onClick={handleCloseModal}
                className="p-2 bg-red-600/80 hover:bg-red-600 rounded transition"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Interactive Image Display Area */}
          <div
            className="relative h-full w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imgRef}
              src={selectedImage.image}
              alt={selectedImage.name}
              draggable={false}
              className="max-h-[85vh] max-w-[90vw] object-contain transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
              }}
            />
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <section className="bg-farm-green px-6 py-20 text-center">
        <h2 className="font-display text-4xl text-white">
          Want to know more about our farm?
        </h2>
        <Link
          to="/contact"
          className="mt-7 inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-farm-green-dark transition hover:bg-gold-light"
        >
          Contact Us
          <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  )
}

export default Gallery