import React from 'react'

const products = [
  {
    name: 'Fresh Milk',
    description: 'Pure and fresh milk from our farm.',
  },
  {
    name: 'Pure Yogurt',
    description: 'Creamy traditionally cultured yogurt.',
  },
  {
    name: 'Fresh Cream',
    description: 'Rich cream made from quality milk.',
  },
  {
    name: 'Desi Ghee',
    description: 'Traditional rich and aromatic ghee.',
  },
]

const Products = () => {
  return (
    <main className="min-h-screen bg-cream">

      <section className="bg-farm-green-dark px-6 py-32 sm:px-10 lg:px-16">

        <div className="mx-auto max-w-7xl">

          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
            Our Dairy
          </p>

          <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">
            Pure. Fresh. Delicious.
          </h1>

        </div>

      </section>


      <section className="px-6 py-24 sm:px-10 lg:px-16">

        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (

            <article
              key={product.name}
              className="bg-white p-7 shadow-sm"
            >

              <div className="h-1 w-10 bg-gold" />

              <h2 className="mt-7 font-display text-2xl text-farm-green">
                {product.name}
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted">
                {product.description}
              </p>

            </article>

          ))}

        </div>

      </section>

    </main>
  )
}

export default Products