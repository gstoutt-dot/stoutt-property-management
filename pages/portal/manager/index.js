import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function ManagerDashboard() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)

    const { data, error } = await supabase
      .from('bos_actions')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) {
      setItems(data || [])
    }

    setLoading(false)
  }

  async function updateStatus(id, status) {
    await supabase
      .from('bos_actions')
      .update({ status })
      .eq('id', id)

    fetchData()
  }

  const filtered = useMemo(() => {
    if (filter === 'all') return items
    return items.filter((item) => item.status === filter)
  }, [items, filter])

  const counts = {
    all: items.length,
    open: items.filter((item) => item.status === 'open').length,
    in_progress: items.filter((item) => item.status === 'in_progress').length,
    completed: items.filter((item) => item.status === 'completed').length,
  }

  const statusStyles = {
    open: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    in_progress: 'bg-sky-400/10 text-sky-300 border-sky-400/20',
    completed: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  }

  const priorityStyles = {
    high: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
    medium: 'bg-orange-400/10 text-orange-300 border-orange-400/20',
    low: 'bg-slate-400/10 text-slate-300 border-slate-400/20',
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-300">
              BOS Manager Intake Layer
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Manager Command Center
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Review, prioritize, route, and complete live association requests before they move to the Board, vendors, or owner updates.
            </p>
          </div>

          <button
            onClick={fetchData}
            className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-white/15"
          >
            Refresh Live Data
          </button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {[
            ['all', 'Total Items'],
            ['open', 'Open'],
            ['in_progress', 'In Progress'],
            ['completed', 'Completed'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-2xl border p-5 text-left transition ${
                filter === key
                  ? 'border-sky-400/40 bg-sky-400/10 shadow-xl shadow-sky-950/30'
                  : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'
              }`}
            >
              <div className="text-sm text-slate-400">{label}</div>
              <div className="mt-2 text-3xl font-semibold">
                {counts[key]}
              </div>
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-xl font-semibold">Live Intake Queue</h2>
            <p className="mt-1 text-sm text-slate-400">
              Showing {filtered.length} item{filtered.length === 1 ? '' : 's'}
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {loading && (
              <div className="px-6 py-10 text-slate-400">
                Loading command center data...
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="px-6 py-10 text-slate-400">
                No items found for this filter.
              </div>
            )}

            {!loading &&
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="px-6 py-6 transition hover:bg-white/[0.03]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            statusStyles[item.status] ||
                            'border-white/10 bg-white/10 text-slate-300'
                          }`}
                        >
                          {String(item.status || 'open').replace('_', ' ')}
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            priorityStyles[item.priority] ||
                            'border-white/10 bg-white/10 text-slate-300'
                          }`}
                        >
                          {item.priority || 'normal'} priority
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-white">
                        {item.title || 'Untitled Request'}
                      </h3>

                      {item.description && (
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                          {item.description}
                        </p>
                      )}

                      <div className="mt-4 grid gap-3 text-sm text-slate-400 md:grid-cols-3">
                        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                          <div className="text-xs uppercase tracking-wide text-slate-500">
                            Source
                          </div>
                          <div className="mt-1 text-slate-300">
                            {item.source || 'Ava / Portal'}
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                          <div className="text-xs uppercase tracking-wide text-slate-500">
                            Created
                          </div>
                          <div className="mt-1 text-slate-300">
                            {item.created_at
                              ? new Date(item.created_at).toLocaleString()
                              : '—'}
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                          <div className="text-xs uppercase tracking-wide text-slate-500">
                            Routing
                          </div>
                          <div className="mt-1 text-slate-300">
                            Manager Review
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:w-64 lg:justify-end">
                      <button
                        onClick={() => updateStatus(item.id, 'open')}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                      >
                        Reopen
                      </button>

                      <button
                        onClick={() => updateStatus(item.id, 'in_progress')}
                        className="rounded-xl border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-300 transition hover:bg-sky-400/20"
                      >
                        Start
                      </button>

                      <button
                        onClick={() => updateStatus(item.id, 'completed')}
                        className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-400/20"
                      >
                        Complete
                      </button>
                    </div>

                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  )
}

