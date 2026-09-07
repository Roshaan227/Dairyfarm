import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PawPrint, Plus, Trash2, ArrowLeft, Upload, CheckCircle2 } from 'lucide-react'
import api from '../../services/api'

const Animals = () => {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [formData, setFormData] = useState({
    name: '',
    type: 'Cow',
    breed: '',
    image: '', // Holds Base64 Data URI
  })

  // Fetch all animals
  const fetchAnimals = async () => {
    try {
      const response = await api.get('/animals')
      setAnimals(response.data.animals || [])
    } catch (error) {
      console.error('Error loading animals:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Convert selected local image to Base64 String
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Limit file size to 2MB to keep MongoDB performance optimal
    if (file.size > 2 * 1024 * 1024) {
      setMessage({
        type: 'error',
        text: 'Image size should be under 2MB.',
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }))
      setMessage({ type: '', text: '' })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.image) {
      setMessage({ type: 'error', text: 'Please select an animal image.' })
      return
    }

    setSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await api.post('/animals', formData)
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Animal added to Gallery successfully!' })
        setFormData({ name: '', type: 'Cow', breed: '', image: '' })
        fetchAnimals() // Refresh animal list
   
      }
   } catch (error) {
  console.error('Full Server Error:', error.response?.data);
  setMessage({
    type: 'error',
    text: error.response?.data?.message || error.response?.data?.error || 'Failed to add animal.',
  });
}
      finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this animal from the gallery?')) return

    try {
      await api.delete(`/animals/${id}`)
      fetchAnimals()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete animal')
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-cream-dark bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-farm-green hover:text-gold-dark"
            >
              <ArrowLeft size={16} />
              Dashboard
            </Link>
          </div>
          <p className="font-display text-xl text-farm-green">Manage Animals</p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Form to Add New Animal */}
          <div className="bg-white p-6 shadow-sm lg:col-span-1">
            <h2 className="flex items-center gap-2 font-display text-2xl text-farm-green">
              <PawPrint className="text-gold-dark" size={22} />
              Add New Animal
            </h2>
            <p className="mt-1 text-sm text-muted">
              Uploaded animals will appear immediately in the public gallery.
            </p>

            {message.text && (
              <div
                className={`mt-4 p-3 text-sm border ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50 text-red-600 border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Animal Name / Tag ID
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Sahiwal Queen #01"
                  required
                  className="mt-1 w-full border border-cream-dark bg-cream px-3 py-2 outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 w-full border border-cream-dark bg-cream px-3 py-2 outline-none focus:border-gold"
                >
                  <option value="Cow">Cow</option>
                  <option value="Buffalo">Buffalo</option>
                  <option value="Goat">Goat</option>
                  <option value="Bull">Bull</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Breed
                </label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="e.g., Pure Sahiwal"
                  required
                  className="mt-1 w-full border border-cream-dark bg-cream px-3 py-2 outline-none focus:border-gold"
                />
              </div>

              {/* File Upload Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Animal Photo
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-2 border border-cream-dark bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-wider text-farm-green transition hover:border-gold">
                    <Upload size={16} />
                    Choose Picture
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {formData.image && (
                    <div className="flex items-center gap-1 text-xs font-medium text-green-700">
                      <CheckCircle2 size={16} />
                      Photo Loaded
                    </div>
                  )}
                </div>

                {/* Preview Box */}
                {formData.image && (
                  <div className="mt-3 h-24 w-24 overflow-hidden border border-cream-dark">
                    <img
                      src={formData.image}
                      alt="Selected Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 bg-farm-green py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-farm-green-light disabled:opacity-50"
              >
                <Plus size={18} />
                {submitting ? 'Adding...' : 'Add Animal'}
              </button>
            </form>
          </div>

          {/* Existing Animals Table / Grid */}
          <div className="bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="font-display text-2xl text-farm-green">
              Live Gallery List ({animals.length})
            </h2>

            {loading ? (
              <p className="mt-4 text-sm text-muted">Loading animals...</p>
            ) : animals.length === 0 ? (
              <p className="mt-4 text-sm text-muted">No animals uploaded yet.</p>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {animals.map((animal) => (
                  <div
                    key={animal._id}
                    className="flex items-center gap-4 border border-cream-dark p-3"
                  >
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="h-20 w-20 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-lg text-farm-green truncate">
                        {animal.name}
                      </p>
                      <p className="text-xs uppercase tracking-wider text-gold-dark">
                        {animal.type} • {animal.breed}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(animal._id)}
                      className="p-2 text-red-500 hover:text-red-700"
                      title="Delete Animal"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}

export default Animals