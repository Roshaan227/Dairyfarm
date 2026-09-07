import React from 'react'

const AdminProducts = () => {
  return (
    <main className="min-h-screen bg-cream px-6 py-20">
      <div className="mx-auto max-w-5xl">

        <h1 className="font-display text-4xl text-farm-green">
          Manage Products
        </h1>

        <p className="mt-3 text-muted">
          Add, edit and update dairy products and their prices.
        </p>

        <div className="mt-10 bg-white p-8">
          Product management will be connected to MongoDB here.
        </div>

      </div>
    </main>
  )
}

export default AdminProducts