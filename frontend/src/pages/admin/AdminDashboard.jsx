import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Milk,
  PawPrint,
  Package,
  TrendingUp,
  ArrowRight,
  LogOut,
} from 'lucide-react'
import api from '../../services/api'

const AdminDashboard = () => {
  const [statsData, setStatsData] = useState({
    totalAnimals: '0',
    todaysMilk: '0 L',
    milkRevenue: 'Rs. 0',
    products: '0',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const [animalRes, milkRes, productRes] = await Promise.allSettled([
        api.get('/animals'),
        api.get('/milk'),
        api.get('/products'),
      ]);

      // 1. Total Animals
      let animalsCount = 0;
      if (animalRes.status === 'fulfilled') {
        const data = animalRes.value.data;
        animalsCount = data.count ?? (Array.isArray(data) ? data.length : (data.animals?.length || 0));
      }

      // 2. Today's Milk & Revenue Calculation
      let todayYield = 0;
      let totalRev = 0;

      if (milkRes.status === 'fulfilled') {
        const resData = milkRes.value.data;
        const records = Array.isArray(resData) ? resData : (resData.records || resData.data || []);

        // Formats today's date to YYYY-MM-DD
        const todayStr = new Date().toLocaleDateString('en-CA');

        records.forEach((r) => {
          const recordDate = r.date ? r.date.split('T')[0] : '';
          const recordTotal = Number(r.total) || 0;
          const recordRevenue = Number(r.revenue) || 0;

          if (recordDate === todayStr) {
            todayYield += recordTotal;
          }

          totalRev += recordRevenue;
        });
      }

      // 3. Products Count
      let productsCount = 0;
      if (productRes.status === 'fulfilled') {
        const data = productRes.value.data;
        productsCount = data.count ?? (Array.isArray(data) ? data.length : (data.products?.length || 0));
      }

      setStatsData({
        totalAnimals: animalsCount.toString(),
        todaysMilk: `${todayYield} L`,
        milkRevenue: `Rs. ${totalRev.toLocaleString()}`,
        products: productsCount.toString(),
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardStats();
}, []);

  const stats = [
    {
      title: 'Total Animals',
      value: statsData.totalAnimals,
      icon: PawPrint,
      path: '/admin/animals',
    },
    {
      title: "Today's Milk",
      value: statsData.todaysMilk,
      icon: Milk,
      path: '/admin/milk-production',
    },
    {
      title: 'Milk Revenue',
      value: statsData.milkRevenue,
      icon: TrendingUp,
      path: '/admin/milk-production',
    },
    {
      title: 'Products',
      value: statsData.products,
      icon: Package,
      path: '/admin/products',
    },
  ]

  return (
    <main className="min-h-screen bg-cream">
      <AdminHeader title="Dashboard" />

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <Link
                key={stat.title}
                to={stat.path}
                className="group bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">
                      {stat.title}
                    </p>

                    <p className="mt-3 font-display text-3xl text-farm-green">
                      {loading ? '...' : stat.value}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center bg-cream">
                    <Icon
                      size={21}
                      className="text-gold-dark"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-farm-green">
                  Manage
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <section className="mt-10">
          <h2 className="font-display text-2xl text-farm-green">
            Quick Actions
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Link
              to="/admin/animals"
              className="bg-farm-green p-6 text-white transition hover:bg-farm-green-light"
            >
              <PawPrint className="mb-5 text-gold-light" />

              <h3 className="font-display text-xl">
                Add Animal
              </h3>

              <p className="mt-2 text-sm text-white/60">
                Register a new cow or buffalo.
              </p>
            </Link>

            <Link
              to="/admin/milk-production"
              className="bg-white p-6 transition hover:shadow-lg"
            >
              <Milk className="mb-5 text-gold-dark" />

              <h3 className="font-display text-xl text-farm-green">
                Record Milk
              </h3>

              <p className="mt-2 text-sm text-muted">
                Add today's milk production.
              </p>
            </Link>

            <Link
              to="/admin/products"
              className="bg-white p-6 transition hover:shadow-lg"
            >
              <Package className="mb-5 text-gold-dark" />

              <h3 className="font-display text-xl text-farm-green">
                Manage Products
              </h3>

              <p className="mt-2 text-sm text-muted">
                Update dairy products and prices.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

/* Header Component with Proper Logout */
const AdminHeader = ({ title }) => {
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      localStorage.removeItem('admin')
      navigate('/admin/login')
    }
  }

  return (
    <header className="border-b border-cream-dark bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <div>
          <p className="font-display text-xl text-farm-green">
            Bismillah Dairy Farm
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] text-gold-dark">
            Administration
          </p>
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden text-sm text-muted sm:block">
            {title}
          </span>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-farm-green transition hover:text-gold-dark"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminDashboard