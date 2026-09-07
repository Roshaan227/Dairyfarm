import React from 'react'

const About = () => {
  return (
    <main className="min-h-screen bg-cream">

      <section className="bg-farm-green-dark px-6 py-32 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-7xl">

          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
            Our Story
          </p>

          <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
            A Farm Built on Trust
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-white/60">
            Bismillah Dairy Farm is dedicated to producing fresh,
            wholesome dairy through responsible farming and
            generations of experience.
          </p>

        </div>

      </section>


      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">

        <div className="grid gap-14 lg:grid-cols-2">

          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1400&q=85"
            alt="Bismillah Dairy Farm"
            className="h-[500px] w-full object-cover"
          />

          <div className="self-center">

            <p className="text-xs uppercase tracking-[0.3em] text-gold-dark">
              Who We Are
            </p>

            <h2 className="mt-4 font-display text-4xl text-farm-green">
              Where tradition meets modern farming.
            </h2>

            <p className="mt-6 leading-8 text-muted">
              At Bismillah Dairy Farm, our mission is simple:
              provide families with dairy they can trust.
            </p>

            <p className="mt-5 leading-8 text-muted">
              We believe that healthy animals, responsible
              farming and careful handling create better dairy
              products.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}

export default About