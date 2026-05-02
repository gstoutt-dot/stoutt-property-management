import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { STATUS_LABELS, getProgress } from '../../../lib/statusFlow'

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

    setSuccessMessage('Request submitted successfully.')
    await fetchItems()
    setSubmitting(false)
  }

  const visibleItems = useMemo(() => {
    return items.filter((item) => item.status !== 'rejected')
  }, [items])

  function getNextStep(item) {
    if (item.status === 'completed') return 'No further action needed'
    if (item.status === 'started') return 'Work in progress'
    if (item.status === 'approved') return 'Scheduling / execution'
    if (item.status === 'board_review') return 'Awaiting Board decision'
    return 'Management review'
  }

  const isMaintenance = form.request_type === 'maintenance'

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
              Owner Request Portal
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Request Status Center
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Submit a request and track it from submission through completion.
            </p>
          </div>

          <button
            onClick={fetchItems}
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
          >
            Refresh Status
          </button>
        </div>

        {/* FORM */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-6 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4">Submit a Request</h2>

          {errorMessage && <div className="mb-4 text-red-400">{errorMessage}</div>}
          {successMessage && <div className="mb-4 text-green-400">{successMessage}</div>}

          <form onSubmit={submitRequest} className="grid gap-4">

            <select
              value={form.request_type}
              onChange={(e) => setForm({ ...form, request_type: e.target.value })}
              className="rounded-xl bg-black/30 px-4 py-3"
            >
              <option value="maintenance">Maintenance Request</option>
              <option value="general">General Request</option>
            </select>

            {isMaintenance && (
              <div className="grid gap-4 md:grid-cols-2">

                <input
                  placeholder="Location (Unit, Pool, Building, etc)"
                  value={form.maintenance_location}
                  onChange={(e) => setForm({ ...form, maintenance_location: e.target.value })}
                  className="rounded-xl bg-black/30 px-4 py-3"
                />

                <select
                  value={form.impact_level}
                  onChange={(e) => setForm({ ...form, impact_level: e.target.value })}
                  className="rounded-xl bg-black/30 px-4 py-3"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="damage">Possible Damage</option>
                </select>

              </div>
            )}

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-xl bg-black/30 px-4 py-3"
            />

            <textarea
              placeholder="Describe the request..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="rounded-xl bg-black/30 px-4 py-3"
            />

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-yellow-400 text-black py-3 font-semibold"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>

          </form>
        </div>

        {/* REQUEST LIST */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04]">
          {loading && <div className="p-6">Loading...</div>}

          {!loading && visibleItems.map((item) => {
            const progress = getProgress(item.status)
            const label = STATUS_LABELS[item.status] || 'Received'

            return (
              <div key={item.id} className="p-6 border-b border-white/10">

                <div className="mb-2 text-yellow-300 text-sm">{label}</div>

                <h3 className="text-xl font-semibold">{item.title}</h3>

                <p className="text-slate-400 mt-2 whitespace-pre-line">
                  {item.description}
                </p>

                <div className="mt-4">
                  <div className="h-2 bg-white/10 rounded-full">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 text-sm text-slate-400">
                  Next Step: {getNextStep(item)}
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

