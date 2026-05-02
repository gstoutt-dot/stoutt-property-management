import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function OwnerPortal() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    setLoading(true)

    const { data, error } = await supabase
      .from('bos_actions')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setItems(data || [])
    setLoading(false)
  }

  const visibleItems = useMemo(() => {
    return items.filter((item) => item.status !== 'rejected')
  }, [items])

  const statusCopy = {
    open: 'Received',
    in_progress: 'In Review',
    board_review: 'Board Review',
    approved: 'Approved',
    completed: 'Completed',
  }

  const statusStyles = {
    open: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    in_progress: 'border-yellow-400/30 bg-yellow-400/10 text-yellow-300',
    board_review: 'border-purple-400/30 bg-purple-400/10 text-purple-300',
    approved: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    completed: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  }

  function getProgress(status) {
    if (status === 'open') return 20
    if (status === 'in_progress') return 40
    if (status === 'board_review') return 60
    if (status === 'approved') return 80
    if (status === 'completed') return 100
    return 20
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
              Owner Request Portal
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Request Status Center
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Stay informed as your association request moves through review, approval, and completion.
            </p>
          </div>

          <button
            onClick={fetchItems}
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
          >
            Refresh Status
          </button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm text-slate-400">Active Requests</div>
            <div className="mt-2 text-3xl font-semibold">{visibleItems.length}</div>
          </div>

          <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
            <div className="text-sm text-yellow-300">Service Visibility</div>
            <div className="mt-2 text-xl font-semibold">Live Updates</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm text-slate-400">Managed By</div>
            <div className="mt-2 text-xl font-semibold">Stoutt Property Management</div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-xl font-semibold">My Requests</h2>
            <p className="mt-1 text-sm text-slate-400">
              Simple visibility into what is happening and where things stand.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {loading && (
              <div className="px-6 py-10 text-slate-400">
                Loading request updates...
              </div>
            )}

            {!loading && visibleItems.length === 0 && (
              <div className="px-6 py-10 text-slate-400">
                No active requests are currently visible.
              </div>
            )}

            {!loading &&
              visibleItems.map((item) => {
                const progress = getProgress(item.status)
                const ownerStatus = statusCopy[item.status] || 'Received'

                return (
                  <div key={item.id} className="px-6 py-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

                      <div>
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${
                              statusStyles[item.status] ||
                              'border-white/10 bg-white/5 text-slate-300'
                            }`}
                          >
                            {ownerStatus}
                          </span>

                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            Request received
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold">
                          {item.title || 'Association Request'}
                        </h3>

                        {item.description && (
                          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                            {item.description}
                          </p>
                        )}

                        <div className="mt-5">
                          <div className="mb-2 flex justify-between text-xs text-slate-400">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>

                          <div className="h-3 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-yellow-400"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                            <div className="text-xs uppercase tracking-wide text-slate-500">
                              Current Stage
                            </div>
                            <div className="mt-1 text-sm text-slate-300">
                              {ownerStatus}
                            </div>
                          </div>

                          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                            <div className="text-xs uppercase tracking-wide text-slate-500">
                              Submitted
                            </div>
                            <div className="mt-1 text-sm text-slate-300">
                              {item.created_at
                                ? new Date(item.created_at).toLocaleDateString()
                                : '—'}
                            </div>
                          </div>

                          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                            <div className="text-xs uppercase tracking-wide text-slate-500">
                              Next Step
                            </div>
                            <div className="mt-1 text-sm text-slate-300">
                              {item.status === 'completed'
                                ? 'No further action needed'
                                : item.status === 'board_review'
                                ? 'Awaiting Board decision'
                                : item.status === 'approved'
                                ? 'Management execution'
                                : 'Management review'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <h4 className="font-semibold">Status Timeline</h4>

                        <div className="mt-5 space-y-4">
                          <TimelineStep active label="Request received" />
                          <TimelineStep active={progress >= 40} label="Management review" />
                          <TimelineStep active={progress >= 60} label="Board review if needed" />
                          <TimelineStep active={progress >= 80} label="Approved / scheduled" />
                          <TimelineStep active={progress >= 100} label="Completed" />
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })}
          </div>
        </div>

      </div>
    </div>
  )
}

function TimelineStep({ active, label }) {
  return (
    <div className="flex gap-3">
      <div
        className={`mt-1 h-3 w-3 rounded-full ${
          active ? 'bg-yellow-400' : 'bg-white/20'
        }`}
      />
      <div className={active ? 'text-sm text-slate-200' : 'text-sm text-slate-500'}>
        {label}
      </div>
    </div>
  )
}

