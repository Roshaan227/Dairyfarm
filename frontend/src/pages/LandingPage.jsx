import React from 'react'
import NavBar from '../components/NavBar'
import {
  ArrowRight,
  Award,
  Leaf,
  Milk,
  ShieldCheck,
  Star,
  ChevronDown,
} from 'lucide-react'

const LandingPage = () => {
  return (
    <main className="bg-cream">

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <NavBar />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative min-h-[92vh] overflow-hidden bg-farm-green">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        {/* Luxury dark overlay */}
        <div className="absolute inset-0 bg-farm-green-dark/70" />

        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-farm-green-dark/90 via-farm-green-dark/55 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 py-24 sm:px-10 lg:px-16">

          <div className="max-w-3xl">

            {/* Small label */}
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-12 bg-gold" />

              <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold-light">
                Since 1998 • Purely Natural
              </p>
            </div>

            {/* Main heading */}
            <h1 className="font-display text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              From Our Farm
              <br />
              <span className="text-gold-light">
                To Your Table.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
              Welcome to Bismillah Dairy Farm — where traditional
              care meets modern dairy farming to bring you naturally
              fresh, wholesome and trusted dairy products.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <a
                href="/products"
                className="group inline-flex items-center justify-center gap-3 bg-gold px-7 py-4 text-sm font-semibold uppercase tracking-wider text-farm-green-dark transition duration-300 hover:bg-gold-light"
              >
                Explore Our Dairy
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#story"
                className="inline-flex items-center justify-center gap-2 border border-white/30 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white transition duration-300 hover:border-gold hover:text-gold-light"
              >
                Discover Our Story
              </a>

            </div>

          </div>
        </div>

        {/* Bottom scroll indicator */}
        <a
          href="#story"
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition hover:text-gold"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>

          <ChevronDown
            size={18}
            className="animate-bounce"
          />
        </a>

      </section>


      {/* =====================================================
          TRUST BAR
      ===================================================== */}
      <section className="border-b border-cream-dark bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-cream-dark md:grid-cols-4">

          <div className="flex items-center justify-center gap-3 px-5 py-7">
            <Milk className="text-gold" size={24} />
            <div>
              <p className="font-display text-lg text-farm-green">
                100%
              </p>
              <p className="text-xs uppercase tracking-wider text-muted">
                Fresh Milk
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 px-5 py-7">
            <Leaf className="text-gold" size={24} />
            <div>
              <p className="font-display text-lg text-farm-green">
                Natural
              </p>
              <p className="text-xs uppercase tracking-wider text-muted">
                Farming
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 px-5 py-7">
            <ShieldCheck className="text-gold" size={24} />
            <div>
              <p className="font-display text-lg text-farm-green">
                Trusted
              </p>
              <p className="text-xs uppercase tracking-wider text-muted">
                Quality
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 px-5 py-7">
            <Award className="text-gold" size={24} />
            <div>
              <p className="font-display text-lg text-farm-green">
                25+
              </p>
              <p className="text-xs uppercase tracking-wider text-muted">
                Years Experience
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          STORY SECTION
      ===================================================== */}
      <section
        id="story"
        className="overflow-hidden bg-cream px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* Images */}
          <div className="relative">

            <div className="relative z-10 h-[480px] overflow-hidden sm:h-[560px]">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=85"
                alt="Cows grazing at Bismillah Dairy Farm"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Decorative gold frame */}
            <div className="absolute -bottom-6 -right-6 h-40 w-40 border-b-2 border-r-2 border-gold" />

            {/* Experience card */}
            <div className="absolute -bottom-8 -left-4 z-20 bg-farm-green px-8 py-7 shadow-2xl sm:-left-8">
              <p className="font-display text-4xl text-gold-light">
                25+
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">
                Years of Dedication
              </p>
            </div>

          </div>


          {/* Content */}
          <div>

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
                Our Story
              </span>
            </div>

            <h2 className="max-w-xl font-display text-4xl leading-tight text-farm-green sm:text-5xl lg:text-6xl">
              A Tradition of
              <span className="block italic text-gold-dark">
                Pure Goodness.
              </span>
            </h2>

            <p className="mt-7 leading-8 text-muted">
              At Bismillah Dairy Farm, we believe exceptional dairy
              begins with exceptional care. From the way we raise our
              cattle to the way we handle every drop of milk, quality
              is never compromised.
            </p>

            <p className="mt-5 leading-8 text-muted">
              Our farm combines generations of agricultural wisdom
              with responsible modern farming practices — creating
              dairy products that families can enjoy with complete
              confidence.
            </p>

            <a
              href="/about"
              className="group mt-8 inline-flex items-center gap-3 font-semibold text-farm-green"
            >
              Learn More About Us

              <ArrowRight
                size={18}
                className="text-gold transition-transform duration-300 group-hover:translate-x-2"
              />
            </a>

          </div>

        </div>
      </section>


      {/* =====================================================
          PRODUCTS SECTION
      ===================================================== */}
      <section className="bg-farm-green-dark px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />

                <span className="text-xs uppercase tracking-[0.3em] text-gold-light">
                  From Our Farm
                </span>
              </div>

              <h2 className="font-display text-4xl text-white sm:text-5xl">
                Naturally Delicious
              </h2>
            </div>

            <a
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-light"
            >
              View All Products
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {/* Milk */}
            <div className="group overflow-hidden bg-white">

              <div className="h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1000&q=85"
                  alt="Fresh milk"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">
                  Fresh Daily
                </p>

                <h3 className="mt-2 font-display text-2xl text-farm-green">
                  Fresh Milk
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted">
                  Pure, creamy and naturally fresh milk delivered
                  from our farm.
                </p>
              </div>

            </div>


            {/* Yogurt */}
            <div className="group overflow-hidden bg-white">

              <div className="h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=85"
                  alt="Fresh dairy products"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">
                  Traditionally Made
                </p>

                <h3 className="mt-2 font-display text-2xl text-farm-green">
                  Pure Yogurt
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted">
                  Rich, smooth and naturally cultured for authentic
                  dairy goodness.
                </p>
              </div>

            </div>


            {/* Cream */}
            <div className="group overflow-hidden bg-white">

              <div className="h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=1000&q=85"
                  alt="Premium dairy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">
                  Farm Fresh
                </p>

                <h3 className="mt-2 font-display text-2xl text-farm-green">
                  Premium Cream
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted">
                  Silky, rich cream made from the freshest milk
                  from our farm.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          QUALITY SECTION
      ===================================================== */}
      <section className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          <div>

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />

              <span className="text-xs uppercase tracking-[0.3em] text-gold-dark">
                Why Bismillah
              </span>
            </div>

            <h2 className="font-display text-4xl leading-tight text-farm-green sm:text-5xl">
              Good Dairy Starts
              <span className="block italic text-gold-dark">
                With Good Care.
              </span>
            </h2>

            <div className="mt-10 space-y-7">

              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-cream">
                  <Leaf size={22} className="text-gold-dark" />
                </div>

                <div>
                  <h3 className="font-display text-xl text-farm-green">
                    Responsible Farming
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted">
                    We care for our animals and the land that
                    sustains them.
                  </p>
                </div>
              </div>


              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-cream">
                  <ShieldCheck size={22} className="text-gold-dark" />
                </div>

                <div>
                  <h3 className="font-display text-xl text-farm-green">
                    Quality You Can Trust
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted">
                    Every product is handled with care from farm
                    to family.
                  </p>
                </div>
              </div>


              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-cream">
                  <Award size={22} className="text-gold-dark" />
                </div>

                <div>
                  <h3 className="font-display text-xl text-farm-green">
                    Years of Experience
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted">
                    Decades of experience dedicated to producing
                    better dairy.
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* Large image */}
          <div className="relative h-[500px] overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1400&q=85"
              alt="Cattle at the dairy farm"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-farm-green-dark/60 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-display text-3xl text-white">
                Raised with care.
              </p>

              <p className="mt-2 text-sm text-white/70">
                Because quality begins long before the milk reaches
                your table.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TESTIMONIAL
      ===================================================== */}
      <section className="bg-cream px-6 py-24 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-4xl text-center">

          <div className="mb-6 flex justify-center gap-1 text-gold">
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
            <Star size={18} fill="currentColor" />
          </div>

          <blockquote className="font-display text-3xl leading-relaxed text-farm-green sm:text-4xl lg:text-5xl">
            “Freshness you can taste, quality you can trust,
            and a farm that truly cares.”
          </blockquote>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Our Customers
          </p>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="relative overflow-hidden bg-farm-green px-6 py-24 sm:px-10 lg:px-16 lg:py-28">

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-gold/20" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border border-gold/10" />

        <div className="relative mx-auto max-w-4xl text-center">

          <p className="text-xs uppercase tracking-[0.35em] text-gold-light">
            Experience the Difference
          </p>

          <h2 className="mt-5 font-display text-4xl text-white sm:text-5xl lg:text-6xl">
            From Our Family
            <br />
            <span className="italic text-gold-light">
              To Yours.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-white/70">
            Discover fresh, wholesome dairy products made with
            care and delivered with trust.
          </p>

          <a
            href="/contact"
            className="mt-9 inline-flex items-center gap-3 bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-farm-green-dark transition hover:bg-gold-light"
          >
            Get In Touch
            <ArrowRight size={17} />
          </a>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="bg-farm-green-dark px-6 py-8 sm:px-10 lg:px-16">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <div>
            <p className="font-display text-xl text-white">
              Bismillah Dairy Farm
            </p>

            <p className="mt-1 text-xs text-white/40">
              Pure goodness, naturally.
            </p>
          </div>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Bismillah Dairy Farm. All rights reserved.
          </p>

        </div>

      </footer>

    </main>
  )
}

export default LandingPage