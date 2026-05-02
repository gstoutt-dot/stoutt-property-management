import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function BoardDecisionCenter() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBoardItems()
  }, [])

  async function fetchBoardItems() {
    setLoading(true)

    const { data, error } = await supabase
      .from('bos_actions')
      .select('*')
      .eq('status', 'board_review')
      .order('created_at', { ascending: false })

    if (!error) setItems(data || [])
    setLoading(false)
  }

  async function updateStatus(id, status) {
    await supabase
      .from('bos_actions')
      .update({ status })
      .eq('id', id)

    fetchBoardItems()
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
              BOS Board Decision Layer
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Board Decision Center
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Review manager-routed items and make clean approval decisions without seeing the full manager workload.
            </p>
          </div>

          <button
            onClick={fetchBoardItems}
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
          >
            Refresh Board Queue
          </button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm text-slate-400">Pending Board Review</div>
            <div className="mt-2 text-3xl font-semibold">{items.length}</div>
          </div>

          <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
            <div className="text-sm text-yellow-300">Decision Mode</div>
            <div className="mt-2 text-xl font-semibold">Approve / Reject</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm text-slate-400">Routing Source</div>
            <div className="mt-2 text-xl font-semibold">Manager Reviewed</div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-xl font-semibold">Board Approval Queue</h2>
            <p className="mt-1 text-sm text-slate-400">
              Only items sent to Board Review appear here.
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {loading && (
              <div className="px-6 py-10 text-slate-400">
                Loading board review items...
              </div>
            )}

            {!loading && items.length === 0 && (
              <div className="px-6 py-10 text-slate-400">
                No items currently require Board review.
              </div>
            )}

            {!loading &&
              items.map((item) => (
                <div key={item.id} className="px-6 py-6 transition hover:bg-white/[0.03]">
                  <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

                    <div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs text-purple-300">
                          board review
                        </span>

                        <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-300">
                          manager routed
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                          {item.priority || 'normal'} priority
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold">
                        {item.title || 'Untitled Request'}
                      </h3>

                      {item.description && (
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                          {item.description}
                        </p>
                      )}

                      <div className="mt-5 grid gap-3 md:grid-cols-3">
                        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                          <div className="text-xs uppercase tracking-wide text-slate-500">
                            Created
                          </div>
                          <div className="mt-1 text-sm text-slate-300">
                            {item.created_at
                              ? new Date(item.created_at).toLocaleString()
                              : '—'}
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                          <div className="text-xs uppercase tracking-wide text-slate-500">
                            Current Status
                          </div>
                          <div className="mt-1 text-sm text-slate-300">
                            {String(item.status || '').replace('_', ' ')}
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                          <div className="text-xs uppercase tracking-wide text-slate-500">
                            Board Action
                          </div>
                          <div className="mt-1 text-sm text-slate-300">
                            Decision Required
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <h4 className="font-semibold">Board Decision</h4>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Approving returns this item to active management for execution.
                        Rejecting routes it back as declined.
                      </p>

                      <div className="mt-5 space-y-3">
                        <button
                          onClick={() => updateStatus(item.id, 'approved')}
                          className="w-full rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300 hover:bg-emerald-400/20"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(item.id, 'rejected')}
                          className="w-full rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm font-medium text-red-300 hover:bg-red-400/20"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => updateStatus(item.id, 'in_progress')}
                          className="w-full rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
                        >
                          Return to Manager
                        </button>
                      </div>
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
