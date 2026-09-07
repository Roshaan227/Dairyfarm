import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'

const NavBar = () => {
  const [open, setOpen] = useState(false)

  const links = [
    // { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
  ]

  return (
    <header className="absolute left-0 right-0 top-0 z-50 border-b border-white/10 bg-farm-green-dark/20 backdrop-blur-md">

      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">

        {/* Logo */}
        <Link to="/" className="group">

          <div className="flex items-center gap-3">

            {/* Logo mark */}
            <div className="flex h-11 w-11 items-center justify-center border border-gold/60">
              <span className="font-display text-xl text-gold-light">
                B
              </span>
            </div>

            <div>
              <p className="font-display text-lg leading-none text-white">
                Bismillah
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-gold-light">
                Dairy Farm
              </p>
            </div>

          </div>

        </Link>


        {/* Desktop Navigation */}
        <div className="hidden items-center md:gap-9 md:flex">

          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-xs font-medium uppercase lg:tracking-[0.15em] tracking-tight text-white/80 transition hover:text-gold-light"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/contact"
            className="group flex items-center gap-2 border border-gold/60 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gold-light transition hover:bg-gold hover:text-farm-green-dark"
          >
            Contact
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
  to="/admin/login"
  className="border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 transition hover:border-gold hover:text-gold-light"
>
  Admin
</Link>

        </div>


        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={27} /> : <Menu size={27} />}
        </button>

      </nav>


      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-white/10 bg-farm-green-dark px-6 py-6 md:hidden">

          <div className="flex flex-col gap-5">

            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-wider text-white/80 hover:text-gold-light"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-2 bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-wider text-farm-green-dark"
            >
              Contact Us
              <ArrowRight size={14} />
            </Link>

            <Link
  to="/admin/login"
  className="border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 transition hover:border-gold hover:text-gold-light"
>
  Admin
</Link>

          </div>

        </div>
      )}

    </header>
  )
}

export default NavBar