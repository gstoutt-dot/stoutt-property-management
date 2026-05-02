import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

const REQUEST_TYPES_THAT_MAY_NEED_BOARD = ['architectural', 'amenity', 'financial']

const ASSOCIATIONS = [
  'Sunset Lakes HOA',
  'Palm Grove Condominium',
  'Oceanview Towers',
  'Lakeside Village',
  'Custom / Other',
]

const statusFlow = [
  { key: 'open', label: 'Request received', progress: 20 },
  { key: 'in_progress', label: 'Management review', progress: 40 },
  { key: 'board_review', label: 'Board review if needed', progress: 60 },
  { key: 'approved', label: 'Approved / scheduled', progress: 80 },
  { key: 'completed', label: 'Completed', progress: 100 },
]

function normalizeStatus(status) {
  if (!status) return 'open'
  const s = String(status).toLowerCase()

  if (s.includes('complete')) return 'completed'
  if (s.includes('approved')) return 'approved'
  if (s.includes('board')) return 'board_review'
  if (s.includes('progress') || s.includes('review')) return 'in_progress'
  return 'open'
}

function needsBoardReview(item) {
  if (!item) return false
  if (item.board_required) return true
  if (item.requires_board_review) return true
  if (item.board_note) return true
  return REQUEST_TYPES_THAT_MAY_NEED_BOARD.includes(item.request_type)
}

function getFlowForItem(item) {
  if (needsBoardReview(item)) return statusFlow
  return statusFlow.filter((s) => s.key !== 'board_review')
}

function getCurrentStepIndex(item) {
  const flow = getFlowForItem(item)
  const status = normalizeStatus(item.status)
  const index = flow.findIndex((s) => s.key === status)
  return index >= 0 ? index : 0
}

function getProgress(item) {
  const flow = getFlowForItem(item)
  const idx = getCurrentStepIndex(item)
  return flow[idx]?.progress || 20
}

export default function OwnerPortal() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [form, setForm] = useState({
    request_type: 'maintenance',
    title: '',
    description: '',
    priority: 'medium',
    association_name: '',
    owner_name: '',
    property_address: '',
    owner_phone: '',
    best_contact_time: '',
  })

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    setLoading(true)
    const { data } = await supabase
      .from('bos_actions')
      .select('*')
      .order('created_at', { ascending: false })

    setItems(data || [])
    setLoading(false)
  }

  async function submitRequest(e) {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!form.title || !form.description) {
      setErrorMessage('Title and description required.')
      return
    }

    setSubmitting(true)

    const { error } = await supabase.from('bos_actions').insert([
      {
        ...form,
        status: 'open',
        source: 'Owner Portal',
      },
    ])

    if (error) {
      setErrorMessage('Submission failed.')
      setSubmitting(false)
      return
    }

    setSuccessMessage('Request submitted successfully.')
    setForm({
      request_type: 'maintenance',
      title: '',
      description: '',
      priority: 'medium',
      association_name: '',
      owner_name: '',
      property_address: '',
      owner_phone: '',
      best_contact_time: '',
    })

    fetchItems()
    setSubmitting(false)
  }

  const visibleItems = useMemo(() => {
    return items.filter((i) => i.status !== 'rejected')
  }, [items])

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* FORM */}
        <div className="mb-10 rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.05] p-6">
          <h2 className="text-2xl font-semibold mb-4">Submit Request</h2>

          {errorMessage && <div className="text-red-400 mb-2">{errorMessage}</div>}
          {successMessage && <div className="text-emerald-400 mb-2">{successMessage}</div>}

          <form onSubmit={submitRequest} className="grid gap-4">

            <select
              value={form.association_name}
              onChange={(e) => setForm({ ...form, association_name: e.target.value })}
              className="input"
            >
              <option value="">Select Association</option>
              {ASSOCIATIONS.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>

            <input
              placeholder="Owner Name"
              value={form.owner_name}
              onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
              className="input"
            />

            <input
              placeholder="Property Address"
              value={form.property_address}
              onChange={(e) => setForm({ ...form, property_address: e.target.value })}
              className="input"
            />

            <input
              placeholder="Phone Number"
              value={form.owner_phone}
              onChange={(e) => setForm({ ...form, owner_phone: e.target.value })}
              className="input"
            />

            <input
              placeholder="Best Time to Contact"
              value={form.best_contact_time}
              onChange={(e) => setForm({ ...form, best_contact_time: e.target.value })}
              className="input"
            />

            <select
              value={form.request_type}
              onChange={(e) => setForm({ ...form, request_type: e.target.value })}
              className="input"
            >
              <option value="maintenance">Maintenance</option>
              <option value="architectural">Architectural</option>
              <option value="amenity">Amenity</option>
              <option value="financial">Financial</option>
              <option value="general">General</option>
            </select>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input"
            />

            <button
              disabled={submitting}
              className="bg-yellow-400 text-black py-3 rounded-xl font-semibold"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="space-y-6">
          {visibleItems.map((item) => {
            const flow = getFlowForItem(item)
            const idx = getCurrentStepIndex(item)
            const progress = getProgress(item)

            return (
              <div key={item.id} className="grid lg:grid-cols-[1fr_300px] gap-6 border border-white/10 p-5 rounded-2xl">

                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-slate-400 mt-2">{item.description}</p>

                  <div className="mt-4 text-sm text-slate-300 space-y-1">
                    <div><strong>Association:</strong> {item.association_name}</div>
                    <div><strong>Owner:</strong> {item.owner_name}</div>
                    <div><strong>Address:</strong> {item.property_address}</div>
                    <div><strong>Phone:</strong> {item.owner_phone}</div>
                    <div><strong>Contact Time:</strong> {item.best_contact_time}</div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded">
                      <div
                        className="h-2 bg-yellow-400 rounded"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 font-semibold">Status Timeline</h4>
                  {flow.map((step, i) => (
                    <div key={step.key} className="flex gap-3 mb-3">
                      <div className={`h-3 w-3 rounded-full ${i <= idx ? 'bg-yellow-400' : 'bg-white/20'}`} />
                      <div className={i <= idx ? '' : 'text-slate-500'}>
                        {step.label}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

