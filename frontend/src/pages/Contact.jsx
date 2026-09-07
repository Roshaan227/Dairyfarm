import React from 'react'

const Contact = () => {
  return (
    <main className="min-h-screen bg-cream">

      <section className="bg-farm-green-dark px-6 py-32 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-7xl">

          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
            Get In Touch
          </p>

          <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
            Contact Bismillah
          </h1>

        </div>

      </section>


      <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10">

        <div className="grid gap-10 md:grid-cols-2">

          <div>

            <h2 className="font-display text-3xl text-farm-green">
              We'd love to hear from you.
            </h2>

            <p className="mt-5 leading-7 text-muted">
              Have a question about our dairy products,
              farm visits or availability? Get in touch with us.
            </p>

            <div className="mt-8 space-y-4 text-sm text-muted">
              <p>📞 +92 XXX XXXXXXX</p>
              <p>📧 info@bismillahdairyfarm.com</p>
              <p>📍 Pakistan</p>
            </div>

          </div>


          <form className="bg-white p-7 shadow-sm">

            <input
              className="mb-4 w-full border border-cream-dark bg-cream px-4 py-3 outline-none focus:border-gold"
              placeholder="Your Name"
            />

            <input
              className="mb-4 w-full border border-cream-dark bg-cream px-4 py-3 outline-none focus:border-gold"
              placeholder="Email"
              type="email"
            />

            <textarea
              className="mb-4 w-full border border-cream-dark bg-cream px-4 py-3 outline-none focus:border-gold"
              rows="5"
              placeholder="Your Message"
            />

            <button
              type="submit"
              className="w-full bg-farm-green py-3.5 text-sm font-semibold uppercase tracking-wider text-white"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

    </main>
  )
}

export default Contact