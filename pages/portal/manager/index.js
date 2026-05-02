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

  function getStatusLabel(status) {
    if (status === 'open') return 'Request received'
    if (status === 'in_progress') return 'Management review'
    if (status === 'board_review') return 'Board review if needed'
    if (status === 'approved') return 'Approved / scheduled'
    if (status === 'completed') return 'Completed'
    if (status === 'rejected') return 'Rejected'
    return 'Request received'
  }

  async function fetchData() {
    setLoading(true)

    const { data } = await supabase
      .from('bos_actions')
      .select('*')
      .order('created_at', { ascending: false })

    setItems(data || [])
    setLoading(false)
  }

  async function updateStatus(id, status) {
    await supabase.from('bos_actions').update({ status }).eq('id', id)
    fetchData()
  }

  const filtered = useMemo(() => {
    if (filter === 'all') return items
    return items.filter((item) => item.status === filter)
  }, [items, filter])

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">

        <h1 className="text-4xl font-semibold mb-8">
          Manager Command Center
        </h1>

        <div className="space-y-6">
          {loading && <div>Loading...</div>}

          {!loading &&
            filtered.map((item) => (
              <div
                key={item.id}
                className="grid lg:grid-cols-[1fr_360px] gap-6 border border-white/10 p-6 rounded-2xl"
              >
                {/* LEFT SIDE */}
                <div>
                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    {item.description}
                  </p>

                  {/* CORE INFO */}
                  <div className="mt-5 grid md:grid-cols-2 gap-4 text-sm">

                    <Info label="Association" value={item.association_name} />
                    <Info label="Owner" value={item.owner_name} />
                    <Info label="Address / Unit" value={item.property_address} />
                    <Info label="Phone" value={item.owner_phone} />
                    <Info label="Best Contact Time" value={item.best_contact_time} />

                    {/* CONDITIONAL AMENITY */}
                    {item.request_type === 'amenity' && (
                      <>
                        <Info label="Amenity" value={item.amenity_selected} />
                        <Info
                          label="Reservation Date"
                          value={
                            item.amenity_date
                              ? new Date(item.amenity_date).toLocaleDateString()
                              : null
                          }
                        />
                      </>
                    )}
                  </div>

                  {/* STATUS */}
                  <div className="mt-6">
                    <div className="text-xs text-slate-400 mb-2">
                      Status
                    </div>
                    <div className="inline-block px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-300 text-xs">
                      {getStatusLabel(item.status)}
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE CONTROLS */}
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <h4 className="font-semibold mb-4">
                    Workflow Controls
                  </h4>

                  <div className="grid gap-2">

                    <button
                      onClick={() => updateStatus(item.id, 'open')}
                      className="btn"
                    >
                      Request Received
                    </button>

                    <button
                      onClick={() => updateStatus(item.id, 'in_progress')}
                      className="btn-yellow"
                    >
                      Management Review
                    </button>

                    <button
                      onClick={() => updateStatus(item.id, 'board_review')}
                      className="btn-purple"
                    >
                      Board Review
                    </button>

                    <button
                      onClick={() => updateStatus(item.id, 'approved')}
                      className="btn-green"
                    >
                      Approved / Scheduled
                    </button>

                    <button
                      onClick={() => updateStatus(item.id, 'completed')}
                      className="btn-green"
                    >
                      Completed
                    </button>

                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs text-slate-500 uppercase">
        {label}
      </div>
      <div className="text-sm text-slate-300 mt-1">
        {value || '—'}
      </div>
    </div>
  )
}
