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

  const cleanStatus = String(status).toLowerCase().trim()

  if (cleanStatus === 'open') return 'open'
  if (cleanStatus === 'in_progress') return 'in_progress'
  if (cleanStatus === 'board_review') return 'board_review'
  if (cleanStatus === 'approved') return 'approved'
  if (cleanStatus === 'completed') return 'completed'

  if (cleanStatus.includes('complete')) return 'completed'
  if (cleanStatus.includes('approved') || cleanStatus.includes('scheduled')) return 'approved'
  if (cleanStatus.includes('board')) return 'board_review'
  if (cleanStatus.includes('review') || cleanStatus.includes('progress')) return 'in_progress'

  return 'open'
}

function needsBoardReview(item) {
  if (!item) return false

  const status = normalizeStatus(item.status)

  if (status === 'board_review') return true
  if (item.board_note) return true
  if (item.board_required === true) return true
  if (item.requires_board_review === true) return true

  return REQUEST_TYPES_THAT_MAY_NEED_BOARD.includes(item.request_type)
}

function getFlowForItem(item) {
  if (needsBoardReview(item)) return statusFlow
  return statusFlow.filter((step) => step.key !== 'board_review')
}

function getCurrentStepIndex(item) {
  const status = normalizeStatus(item.status)
  const flow = getFlowForItem(item)

  const index = flow.findIndex((step) => step.key === status)
  if (index >= 0) return index

  return 0
}

function getProgress(item) {
  const flow = getFlowForItem(item)
  const currentIndex = getCurrentStepIndex(item)
  const currentStep = flow[currentIndex]

  return currentStep?.progress || 20
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

    const { data, error } = await supabase
      .from('bos_actions')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setItems(data || [])
    setLoading(false)
  }

  async function submitRequest(e) {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!form.association_name.trim()) {
      setErrorMessage('Please select the association.')
      return
    }

    if (!form.owner_name.trim()) {
      setErrorMessage('Please enter the owner name.')
      return
    }

    if (!form.property_address.trim()) {
      setErrorMessage('Please enter the property address.')
      return
    }

    if (!form.owner_phone.trim()) {
      setErrorMessage('Please enter a phone number.')
      return
    }

    if (!form.title.trim() || !form.description.trim()) {
      setErrorMessage('Please enter both a title and description.')
      return
    }

    setSubmitting(true)

    const { error } = await supabase.from('bos_actions').insert([
      {
        request_type: form.request_type,
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        association_name: form.association_name,
        owner_name: form.owner_name.trim(),
        property_address: form.property_address.trim(),
        owner_phone: form.owner_phone.trim(),
        best_contact_time: form.best_contact_time.trim(),
        status: 'open',
        source: 'Owner Portal',
      },
    ])

    if (error) {
      setErrorMessage(error.message || 'Request could not be submitted.')
      setSubmitting(false)
      return
    }

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

    setSuccessMessage('Request submitted successfully.')
    await fetchItems()
    setSubmitting(false)
  }

  const visibleItems = useMemo(() => {
    return items.filter((item) => item.status !== 'rejected')
  }, [items])

  const requestTypeLabels = {
    maintenance: 'Maintenance Request',
    architectural: 'Architectural Review',
    amenity: 'Amenity Reservation',
    financial: 'Financial / Account Request',
    violation: 'Violation Question',
    documents: 'Document Request',
    general: 'General Request',
  }

  const statusCopy = {
    open: 'Received',
    in_progress: 'In Review',
    board_review: 'Board Review',
    approved: 'Approved',
    completed: 'Completed',
  }

  function getNextStep(item) {
    const status = normalizeStatus(item.status)

    if (status === 'completed') return 'No further action needed'
    if (status === 'board_review') return 'Awaiting Board decision'
    if (status === 'approved') return 'Management execution'
    if (status === 'in_progress' && needsBoardReview(item)) return 'Board review if needed'
    if (status === 'in_progress') return 'Approval or scheduling'
    if (item.request_type === 'architectural') return 'Architectural review'
    if (item.request_type === 'amenity') return 'Amenity scheduling review'
    if (item.request_type === 'financial') return 'Account review'
    if (item.request_type === 'documents') return 'Document review'

    return 'Management review'
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/10'

  const labelClass =
    'mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400'

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
              Submit a request, work order, architectural review, amenity request, or account question with the information management needs to route it properly.
            </p>
          </div>

          <button
            onClick={fetchItems}
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
          >
            Refresh Status
          </button>
        </div>

        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-6 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Submit a Request</h2>
            <p className="mt-2 text-sm text-slate-400">
              This captures the owner, association, contact, and request details needed for management review and vendor coordination.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
              {successMessage}
            </div>
          )}

          <form onSubmit={submitRequest} className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Owner & Association Information</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Used by management to identify the correct community, unit, and contact preference.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Association</label>
                  <select
                    value={form.association_name}
                    onChange={(e) => setForm({ ...form, association_name: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select Association</option>
                    {ASSOCIATIONS.map((association) => (
                      <option key={association} value={association}>
                        {association}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Owner Name</label>
                  <input
                    value={form.owner_name}
                    onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
                    placeholder="Owner name"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Property Address / Unit</label>
                  <input
                    value={form.property_address}
                    onChange={(e) => setForm({ ...form, property_address: e.target.value })}
                    placeholder="Property address, unit, or building number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    value={form.owner_phone}
                    onChange={(e) => setForm({ ...form, owner_phone: e.target.value })}
                    placeholder="Best contact number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Best Time to Contact</label>
                  <input
                    value={form.best_contact_time}
                    onChange={(e) => setForm({ ...form, best_contact_time: e.target.value })}
                    placeholder="Example: Weekdays after 3 PM"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Request Details</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Choose the request type so the system can route it through the correct workflow.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Request Type</label>
                  <select
                    value={form.request_type}
                    onChange={(e) => setForm({ ...form, request_type: e.target.value })}
                    className={inputClass}
                  >
                    <option value="maintenance">Maintenance Request</option>
                    <option value="architectural">Architectural Review</option>
                    <option value="amenity">Amenity Reservation</option>
                    <option value="financial">Financial / Account Request</option>
                    <option value="violation">Violation Question</option>
                    <option value="documents">Document Request</option>
                    <option value="general">General Request</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className={inputClass}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Request Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Short request title"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe what you need help with..."
                    rows={5}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl border border-yellow-400/30 bg-yellow-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Submitting Request...' : 'Submit Request'}
            </button>
          </form>
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
                const normalizedStatus = normalizeStatus(item.status)
                const flow = getFlowForItem(item)
                const currentIndex = getCurrentStepIndex(item)
                const progress = getProgress(item)
                const ownerStatus = statusCopy[normalizedStatus] || 'Received'
                const typeLabel =
                  requestTypeLabels[item.request_type] || 'General Request'

                return (
                  <div key={item.id} className="px-6 py-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                      <div>
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-300">
                            {ownerStatus}
                          </span>

                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                            {typeLabel}
                          </span>

                          {item.association_name && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                              {item.association_name}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold">
                          {item.title || 'Association Request'}
                        </h3>

                        {item.description && (
                          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                            {item.description}
                          </p>
                        )}

                        <div className="mt-5 grid gap-3 md:grid-cols-2">
                          <InfoCard label="Owner" value={item.owner_name || 'Not provided'} />
                          <InfoCard label="Phone" value={item.owner_phone || 'Not provided'} />
                          <InfoCard label="Address / Unit" value={item.property_address || 'Not provided'} />
                          <InfoCard label="Best Contact Time" value={item.best_contact_time || 'Not provided'} />
                        </div>

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
                          <InfoCard label="Request Type" value={typeLabel} />
                          <InfoCard
                            label="Submitted"
                            value={
                              item.created_at
                                ? new Date(item.created_at).toLocaleDateString()
                                : '—'
                            }
                          />
                          <InfoCard label="Next Step" value={getNextStep(item)} />
                        </div>
                      </div>

                      <div className="rounded-2xl border border-yellow-400/20 bg-black/30 p-5">
                        <div className="mb-5 flex items-center justify-between">
                          <h4 className="font-semibold text-white">Status Timeline</h4>
                          <span className="text-xs font-medium text-yellow-300">
                            {progress}%
                          </span>
                        </div>

                        <div className="space-y-0">
                          {flow.map((step, index) => (
                            <TimelineStep
                              key={step.key}
                              active={index <= currentIndex}
                              complete={index < currentIndex}
                              label={step.label}
                              isLast={index === flow.length - 1}
                            />
                          ))}
                        </div>

                        {!needsBoardReview(item) && (
                          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-5 text-slate-400">
                            Board review is not required for this request unless management escalates it.
                          </div>
                        )}
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

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-300">
        {value}
      </div>
    </div>
  )
}

function TimelineStep({ active, complete, label, isLast }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`h-4 w-4 rounded-full border ${
            active
              ? 'border-yellow-400 bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.45)]'
              : 'border-white/20 bg-white/10'
          }`}
        />

        {!isLast && (
          <div
            className={`h-8 w-px ${
              complete ? 'bg-yellow-400' : 'bg-white/15'
            }`}
          />
        )}
      </div>

      <div className={active ? 'pb-4 text-sm text-slate-200' : 'pb-4 text-sm text-slate-500'}>
        {label}
      </div>
    </div>
  )
}
