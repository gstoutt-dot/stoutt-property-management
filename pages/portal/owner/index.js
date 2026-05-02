import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

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
    maintenance_category: 'plumbing',
    maintenance_location: '',
    access_permission: 'yes',
    preferred_time: 'anytime',
    impact_level: 'normal',
    access_notes: '',
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

  function buildDescription() {
    if (form.request_type !== 'maintenance') {
      return form.description.trim()
    }

    return `
MAINTENANCE MODULE DETAILS

Category: ${form.maintenance_category}
Location: ${form.maintenance_location || 'Not provided'}
Impact Level: ${form.impact_level}
Permission to Enter: ${form.access_permission}
Preferred Service Time: ${form.preferred_time}

Owner Description:
${form.description.trim()}

Access Notes:
${form.access_notes || 'None provided'}
    `.trim()
  }

  async function submitRequest(e) {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!form.title.trim() || !form.description.trim()) {
      setErrorMessage('Please enter both a title and description.')
      return
    }

    if (form.request_type === 'maintenance' && !form.maintenance_location.trim()) {
      setErrorMessage('Please enter the maintenance location.')
      return
    }

    setSubmitting(true)

    const { error } = await supabase.from('bos_actions').insert([
      {
        request_type: form.request_type,
        title: form.title.trim(),
        description: buildDescription(),
        priority: form.priority,
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
      maintenance_category: 'plumbing',
      maintenance_location: '',
      access_permission: 'yes',
      preferred_time: 'anytime',
      impact_level: 'normal',
      access_notes: '',
    })

    setSuccessMessage('Maintenance request submitted successfully.')
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
  in_progress: 'Management Review',
  board_review: 'Board Review',
  board_in_review: 'Board Review',
  accepted: 'Board Approved',
  approved: 'Approved',
  started: 'Work Started',
  manager_started: 'Work Started',
  completed: 'Completed',
}

  function getProgress(status) {
  if (status === 'open') return 20
  if (status === 'in_progress') return 40
  if (status === 'board_review') return 60
  if (status === 'board_in_review') return 60
  if (status === 'accepted') return 80
  if (status === 'approved') return 80
  if (status === 'started') return 90
  if (status === 'manager_started') return 90
  if (status === 'completed') return 100
  return 20
}

  function getNextStep(item) {
    if (item.status === 'completed') return 'No further action needed'
    if (item.status === 'board_review') return 'Awaiting Board decision'
    if (item.status === 'approved') return 'Management execution'
    if (item.request_type === 'maintenance') return 'Maintenance intake review'
    if (item.request_type === 'architectural') return 'Architectural review'
    if (item.request_type === 'amenity') return 'Amenity scheduling review'
    if (item.request_type === 'financial') return 'Account review'
    if (item.request_type === 'documents') return 'Document review'
    return 'Management review'
  }

  const isMaintenance = form.request_type === 'maintenance'

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
              Submit a request and stay informed as it moves through management review, approval, and completion.
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
          <div className="mb-5">
            <h2 className="text-2xl font-semibold">Submit a Request</h2>
            <p className="mt-2 text-sm text-slate-400">
              Maintenance requests now collect location, access, impact, and scheduling details for better routing.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
              {successMessage}
            </div>
          )}

          <form onSubmit={submitRequest} className="grid gap-4">
            <select
              value={form.request_type}
              onChange={(e) => setForm({ ...form, request_type: e.target.value })}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/40"
            >
              <option value="maintenance">Maintenance Request</option>
              <option value="architectural">Architectural Review</option>
              <option value="amenity">Amenity Reservation</option>
              <option value="financial">Financial / Account Request</option>
              <option value="violation">Violation Question</option>
              <option value="documents">Document Request</option>
              <option value="general">General Request</option>
            </select>

            {isMaintenance && (
              <div className="rounded-2xl border border-yellow-400/20 bg-black/20 p-5">
                <div className="mb-4 flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-yellow-300">
                    Maintenance Details
                  </h3>
                  <p className="text-sm text-slate-400">
                    These details help management determine urgency, access, and vendor routing.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <select
                    value={form.maintenance_category}
                    onChange={(e) =>
                      setForm({ ...form, maintenance_category: e.target.value })
                    }
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/40"
                  >
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC / Air Conditioning</option>
                    <option value="pool">Pool / Amenity Area</option>
                    <option value="landscaping">Landscaping</option>
                    <option value="gate_access">Gate / Access Control</option>
                    <option value="lighting">Lighting</option>
                    <option value="general_repair">General Repair</option>
                  </select>

                  <input
                    value={form.maintenance_location}
                    onChange={(e) =>
                      setForm({ ...form, maintenance_location: e.target.value })
                    }
                    placeholder="Location: unit, building, clubhouse, pool, gate..."
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/40"
                  />

                  <select
                    value={form.impact_level}
                    onChange={(e) =>
                      setForm({ ...form, impact_level: e.target.value })
                    }
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/40"
                  >
                    <option value="normal">Normal Impact</option>
                    <option value="inconvenience">Inconvenience</option>
                    <option value="safety">Safety Concern</option>
                    <option value="water_damage">Possible Water Damage</option>
                    <option value="urgent">Urgent / Time Sensitive</option>
                  </select>

                  <select
                    value={form.access_permission}
                    onChange={(e) =>
                      setForm({ ...form, access_permission: e.target.value })
                    }
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/40"
                  >
                    <option value="yes">Permission to Enter: Yes</option>
                    <option value="call_first">Call First</option>
                    <option value="no">Permission to Enter: No</option>
                    <option value="common_area">Common Area / No Unit Access Needed</option>
                  </select>

                  <select
                    value={form.preferred_time}
                    onChange={(e) =>
                      setForm({ ...form, preferred_time: e.target.value })
                    }
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/40"
                  >
                    <option value="anytime">Anytime</option>
                    <option value="morning">Morning Preferred</option>
                    <option value="afternoon">Afternoon Preferred</option>
                    <option value="weekday">Weekday Preferred</option>
                    <option value="call_to_schedule">Call to Schedule</option>
                  </select>

                  <input
                    value={form.access_notes}
                    onChange={(e) =>
                      setForm({ ...form, access_notes: e.target.value })
                    }
                    placeholder="Access notes, gate code, pets, special instructions..."
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/40"
                  />
                </div>
              </div>
            )}

            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder={isMaintenance ? 'Example: Pool light is out' : 'Short request title'}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/40"
            />

            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder={
                isMaintenance
                  ? 'Describe the maintenance issue in detail...'
                  : 'Describe what you need help with...'
              }
              rows={4}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/40"
            />

            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/40"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-sm font-medium text-yellow-300 transition hover:bg-yellow-400/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm text-slate-400">Active Requests</div>
            <div className="mt-2 text-3xl font-semibold">{visibleItems.length}</div>
          </div>

          <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
            <div className="text-sm text-yellow-300">Maintenance Module</div>
            <div className="mt-2 text-xl font-semibold">Enhanced Intake</div>
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
                const typeLabel =
                  requestTypeLabels[item.request_type] || 'General Request'

                return (
                  <div key={item.id} className="px-6 py-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                      <div>
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-300">
                            {ownerStatus}
                          </span>

                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                            {typeLabel}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold">
                          {item.title || 'Association Request'}
                        </h3>

                        {item.description && (
                          <p className="mt-2 max-w-3xl whitespace-pre-line text-sm leading-6 text-slate-400">
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
                              Request Type
                            </div>
                            <div className="mt-1 text-sm text-slate-300">
                              {typeLabel}
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
                              {getNextStep(item)}
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

