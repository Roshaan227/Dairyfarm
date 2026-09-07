import React, { useState, useEffect } from 'react'
import { Milk, Plus, TrendingUp, CalendarDays, Loader2, Trash2 } from 'lucide-react'

const MilkProduction = () => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    morning: '',
    evening: '',
    price: '',
  })

  // Fetch production history from backend on mount
  const fetchRecords = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/milk')
      const data = await res.json()
      if (data.success) {
        setRecords(data.records)
      }
    } catch (err) {
      console.error('Failed to load milk records:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const totalMilk = Number(form.morning || 0) + Number(form.evening || 0)
  const revenue = totalMilk * Number(form.price || 0)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/milk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save record')
      }

      // Refresh table with updated backend data
      await fetchRecords()

      // Reset form fields except date
      setForm((prev) => ({
        ...prev,
        morning: '',
        evening: '',
      }))
    } catch (err) {
      setErrorMsg(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  // Handle deletion of a record
  const handleDelete = async (id, date) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the milk record for ${date}?`
    )
    if (!confirmDelete) return

    try {
      setDeletingId(id)
      setErrorMsg('')

      const res = await fetch(`/api/milk/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete record')
      }

      // Remove record directly from local state for instant UI update
      setRecords((prev) => prev.filter((r) => (r._id || r.id) !== id))
    } catch (err) {
      setErrorMsg(err.message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      <header className="border-b border-cream-dark bg-white">
        <div className="mx-auto max-w-7xl px-6 py-7 sm:px-10 lg:px-16">
          <p className="font-display text-3xl text-farm-green">
            Milk Production
          </p>
          <p className="mt-1 text-sm text-muted">
            Record and monitor daily milk production
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        {/* FORM */}
        <section className="bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <Milk className="text-gold-dark" />
            <h2 className="font-display text-2xl text-farm-green">
              Add Daily Production
            </h2>
          </div>

          {errorMsg && (
            <div className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border border-cream-dark bg-cream px-4 py-3 outline-none focus:border-gold"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Morning Milk (L)
              </label>
              <input
                type="number"
                name="morning"
                value={form.morning}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full border border-cream-dark bg-cream px-4 py-3 outline-none focus:border-gold"
                placeholder="190"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Evening Milk (L)
              </label>
              <input
                type="number"
                name="evening"
                value={form.evening}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full border border-cream-dark bg-cream px-4 py-3 outline-none focus:border-gold"
                placeholder="196"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price / Liter (Rs.)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full border border-cream-dark bg-cream px-4 py-3 outline-none focus:border-gold"
                placeholder="180"
                required
              />
            </div>

            <div className="lg:col-span-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="bg-cream p-5">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Total Milk
                  </p>
                  <p className="mt-2 font-display text-2xl text-farm-green">
                    {totalMilk.toFixed(1)} L
                  </p>
                </div>

                <div className="bg-cream p-5">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Milk Price
                  </p>
                  <p className="mt-2 font-display text-2xl text-farm-green">
                    Rs. {form.price || 0}
                  </p>
                </div>

                <div className="bg-cream p-5">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Estimated Revenue
                  </p>
                  <p className="mt-2 font-display text-2xl text-farm-green">
                    Rs. {revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 bg-farm-green px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-farm-green-light disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Plus size={17} />
                )}
                {submitting ? 'Saving...' : 'Save Production'}
              </button>
            </div>
          </form>
        </section>

        {/* RECORDS */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl text-farm-green">
                Production History
              </h2>
              <p className="mt-1 text-sm text-muted">
                Daily milk production records
              </p>
            </div>
            <TrendingUp className="text-gold-dark" />
          </div>

          <div className="overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead>
                  <tr className="bg-cream">
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider">
                      Morning
                    </th>
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider">
                      Evening
                    </th>
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider">
                      Price/L
                    </th>
                    <th className="px-5 py-4 text-left text-xs uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-5 py-4 text-center text-xs uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-sm text-muted">
                        Loading milk records...
                      </td>
                    </tr>
                  ) : records.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-sm text-muted">
                        No milk records found. Add one above!
                      </td>
                    </tr>
                  ) : (
                    records.map((record) => {
                      const recId = record._id || record.id
                      const isDeleting = deletingId === recId

                      return (
                        <tr
                          key={recId}
                          className="border-t border-cream-dark"
                        >
                          <td className="px-5 py-5">
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarDays
                                size={15}
                                className="text-gold-dark"
                              />
                              {record.date}
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm">{record.morning} L</td>
                          <td className="px-5 py-5 text-sm">{record.evening} L</td>
                          <td className="px-5 py-5 font-semibold text-farm-green">
                            {record.total} L
                          </td>
                          <td className="px-5 py-5 text-sm">Rs. {record.price}</td>
                          <td className="px-5 py-5 font-semibold text-gold-dark">
                            Rs. {record.revenue?.toLocaleString() || 0}
                          </td>
                          <td className="px-5 py-5 text-center">
                            <button
                              onClick={() => handleDelete(recId, record.date)}
                              disabled={isDeleting}
                              title="Delete Record"
                              className="inline-flex items-center justify-center p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                            >
                              {isDeleting ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default MilkProduction