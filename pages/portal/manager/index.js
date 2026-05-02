import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function ManagerDashboard() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [workflow, setWorkflow] = useState({})

  useEffect(() => {
    fetchData()
    loadWorkflow()
  }, [])

  function loadWorkflow() {
    const saved = localStorage.getItem('bos_manager_workflow')
    if (saved) setWorkflow(JSON.parse(saved))
  }

  function saveWorkflow(nextWorkflow) {
    setWorkflow(nextWorkflow)
    localStorage.setItem('bos_manager_workflow', JSON.stringify(nextWorkflow))
  }

  async function fetchData() {
    setLoading(true)

    const { data, error } = await supabase
      .from('bos_actions')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setItems(data || [])
    setLoading(false)
  }

  async function updateStatus(id, status) {
    await supabase
      .from('bos_actions')
      .update({ status })
      .eq('id', id)

    addTimeline(id, `Status changed to ${status.replace('_', ' ')}`)
    fetchData()
  }

  function updateWorkflowField(id, field, value) {
    const current = workflow[id] || {}
    const nextWorkflow = {
      ...workflow,
      [id]: {
        ...current,
        [field]: value,
      },
    }

    saveWorkflow(nextWorkflow)
  }

  function addNote(id) {
    const current = workflow[id] || {}
    const noteText = current.pendingNote

    if (!noteText || !noteText.trim()) return

    const nextNote = {
      text: noteText.trim(),
      date: new Date().toLocaleString(),
    }

    const nextWorkflow = {
      ...workflow,
      [id]: {
        ...current,
        pendingNote: '',
        notes: [nextNote, ...(current.notes || [])],
        timeline: [
          {
            text: 'Manager note added',
            date: new Date().toLocaleString(),
          },
          ...(current.timeline || []),
        ],
      },
    }

    saveWorkflow(nextWorkflow)
  }

  function addTimeline(id, text) {
    const current = workflow[id] || {}

    const nextWorkflow = {
      ...workflow,
      [id]: {
        ...current,
        timeline: [
          {
            text,
            date: new Date().toLocaleString(),
          },
          ...(current.timeline || []),
        ],
      },
    }

    saveWorkflow(nextWorkflow)
  }

  const filtered = useMemo(() => {
    if (filter === 'all') return items
    return items.filter((item) => item.status === filter)
  }, [items, filter])

  const counts = {
    all: items.length,
    open: items.filter((i) => i.status === 'open').length,
    in_progress: items.filter((i) => i.status === 'in_progress').length,
    completed: items.filter((i) => i.status === 'completed').length,
  }

  const statusStyles = {
    open: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
    in_progress: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30',
    completed: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
  }

  const priorityStyles = {
    high: 'bg-red-400/10 text-red-300 border-red-400/30',
    medium: 'bg-orange-400/10 text-orange-300 border-orange-400/30',
    low: 'bg-slate-400/10 text-slate-300 border-slate-400/30',
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
              BOS Manager Intake Layer
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Manager Command Center
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Review, prioritize, assign, document, and route live association requests.
            </p>
          </div>

          <button
            onClick={fetchData}
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-medium text-yellow-300 transition hover:bg-yellow-400/20"
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
                  ? 'border-yellow-400/40 bg-yellow-400/10 shadow-xl shadow-yellow-900/20'
                  : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'
              }`}
            >
              <div className="text-sm text-slate-400">{label}</div>
              <div className="mt-2 text-3xl font-semibold">{counts[key]}</div>
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
              <div className="px-6 py-10 text-slate-400">Loading...</div>
            )}

            {!loading && filtered.map((item) => {
              const wf = workflow[item.id] || {}

              return (
                <div key={item.id} className="px-6 py-6 transition hover:bg-white/[0.03]">
                  <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

                    <div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className={`rounded-full border px-3 py-1 text-xs ${statusStyles[item.status] || 'border-white/10'}`}>
                          {String(item.status || 'open').replace('_', ' ')}
                        </span>

                        <span className={`rounded-full border px-3 py-1 text-xs ${priorityStyles[item.priority] || 'border-white/10'}`}>
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
                        <input
                          value={wf.vendor || ''}
                          onChange={(e) => updateWorkflowField(item.id, 'vendor', e.target.value)}
                          placeholder="Assign vendor"
                          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/40"
                        />

                        <input
                          type="date"
                          value={wf.dueDate || ''}
                          onChange={(e) => updateWorkflowField(item.id, 'dueDate', e.target.value)}
                          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/40"
                        />

                        <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                          {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'No date'}
                        </div>
                      </div>

                      <div className="mt-5">
                        <textarea
                          value={wf.pendingNote || ''}
                          onChange={(e) => updateWorkflowField(item.id, 'pendingNote', e.target.value)}
                          placeholder="Add manager note..."
                          rows={3}
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/40"
                        />

                        <button
                          onClick={() => addNote(item.id)}
                          className="mt-3 rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
                        >
                          Save Note
                        </button>
                      </div>

                      {wf.notes && wf.notes.length > 0 && (
                        <div className="mt-5 space-y-3">
                          {wf.notes.map((note, index) => (
                            <div key={index} className="rounded-xl border border-white/10 bg-black/20 p-4">
                              <div className="text-sm text-slate-300">{note.text}</div>
                              <div className="mt-2 text-xs text-slate-500">{note.date}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                      <h4 className="font-semibold">Workflow Controls</h4>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          onClick={() => updateStatus(item.id, 'open')}
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                        >
                          Reopen
                        </button>

                        <button
                          onClick={() => updateStatus(item.id, 'in_progress')}
                          className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-300 hover:bg-yellow-400/20"
                        >
                          Start
                        </button>

                        <button
                          onClick={() => updateStatus(item.id, 'completed')}
                          className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-400/20"
                        >
                          Complete
                        </button>
                      </div>

                      <div className="mt-6 border-t border-white/10 pt-5">
                        <h4 className="font-semibold">Activity Timeline</h4>

                        <div className="mt-4 space-y-4">
                          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="text-sm text-slate-300">Request received</div>
                            <div className="mt-1 text-xs text-slate-500">
                              {item.created_at ? new Date(item.created_at).toLocaleString() : '—'}
                            </div>
                          </div>

                          {(wf.timeline || []).map((entry, index) => (
                            <div key={index} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                              <div className="text-sm text-slate-300">{entry.text}</div>
                              <div className="mt-1 text-xs text-slate-500">{entry.date}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}

            {!loading && filtered.length === 0 && (
              <div className="px-6 py-10 text-slate-400">
                No items found.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

