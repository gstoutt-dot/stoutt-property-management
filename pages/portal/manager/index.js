import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../../lib/supabaseClient'

export default function ManagerDashboard() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [workflow, setWorkflow] = useState({})
  const [dispatchFeedback, setDispatchFeedback] = useState({})

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

  function syncBoardDecisions(data) {
    const saved = JSON.parse(localStorage.getItem('bos_manager_workflow') || '{}')

    data.forEach((item) => {
      const currentTimeline = saved[item.id]?.timeline || []

      if (
        item.status === 'approved' &&
        !currentTimeline.some((entry) => entry.text === 'Board approved request')
      ) {
        saved[item.id] = {
          ...(saved[item.id] || {}),
          timeline: [
            { text: 'Board approved request', date: new Date().toLocaleString() },
            ...currentTimeline,
          ],
        }
      }

      if (
        item.status === 'rejected' &&
        !currentTimeline.some((entry) => entry.text === 'Board rejected request')
      ) {
        saved[item.id] = {
          ...(saved[item.id] || {}),
          timeline: [
            { text: 'Board rejected request', date: new Date().toLocaleString() },
            ...currentTimeline,
          ],
        }
      }
    })

    localStorage.setItem('bos_manager_workflow', JSON.stringify(saved))
    setWorkflow(saved)
  }

  async function fetchData() {
  setLoading(true)

  const { data: bosData, error: bosError } = await supabase
    .from('bos_actions')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: adminData, error: adminError } = await supabase
    .from('admin_operational_records')
    .select('*')
    .order('created_at', { ascending: false })

  if (bosError) {
    console.error('Manager BOS queue load failed:', bosError)
  }

  if (adminError) {
    console.error('Manager admin queue load failed:', adminError)
  }

  const normalizedBosItems = (bosData || []).map((item) => ({
    ...item,
    manager_source_table: 'bos_actions',
    manager_source_type: 'bos',
    association_name: item.association_name || 'Sunset Condominium Association',
    owner_name: item.owner_name || '—',
    owner_phone: item.owner_phone || '',
    property_address: item.property_address || '',
    best_contact_time: item.best_contact_time || 'Normal business hours',
    status: item.status || 'open',
    priority: item.priority || 'medium',
  }))

  const normalizedAdminItems = (adminData || []).map((item) => ({
    id: `admin-${item.id}`,
    original_id: item.id,
    manager_source_table: 'admin_operational_records',
    manager_source_type: 'admin',

    title: item.title || 'Administrative Intake',
    description: item.description || 'Administrative operational record submitted for review.',
    request_type: item.request_type || 'owner_request',
    category: item.request_type || 'owner_request',

    status:
      String(item.status || '').toLowerCase() === 'submitted'
        ? 'open'
        : String(item.status || '').toLowerCase(),

    priority:
      String(item.priority || '').toLowerCase() === 'high'
        ? 'high'
        : String(item.priority || '').toLowerCase() === 'low'
          ? 'low'
          : 'medium',

    association_name: item.association_name || 'Sunset Condominium Association',
    owner_name: item.created_by || 'Ava / Admin Intake',
    owner_phone: '',
    property_address: item.routing_target || item.source_module || 'Admin Operations',
    best_contact_time: 'Normal business hours',

    created_at: item.created_at,
    updated_at: item.updated_at,
    source: item.source_module || 'Admin Operational Record',

    board_comment: item.description || '',
    board_response: item.recommended_action || '',
    board_acknowledged: false,
    board_reviewed: false,

    vendor_name: '',
    vendor_phone: '',
    vendor_email: '',
    dispatch_note: '',
    dispatched_at: null,
  }))

  const combinedItems = [
    ...normalizedBosItems,
    ...normalizedAdminItems,
  ].sort((a, b) => {
    const left = new Date(a.created_at || 0).getTime()
    const right = new Date(b.created_at || 0).getTime()

    return right - left
  })

  setItems(combinedItems)
  syncBoardDecisions(normalizedBosItems)

  setLoading(false)
}

  async function updateStatus(id, status) {
    await supabase.from('bos_actions').update({ status }).eq('id', id)
    addTimeline(id, getStatusLabel(status))
    fetchData()
  }

  function updateWorkflowField(id, field, value) {
    const current = workflow[id] || {}

    saveWorkflow({
      ...workflow,
      [id]: {
        ...current,
        [field]: value,
      },
    })
  }

  function addTimeline(id, text) {
    const current = workflow[id] || {}

    saveWorkflow({
      ...workflow,
      [id]: {
        ...current,
        timeline: [
          { text, date: new Date().toLocaleString() },
          ...(current.timeline || []),
        ],
      },
    })
  }

  function addNote(id) {
    const current = workflow[id] || {}
    const noteText = current.pendingNote

    if (!noteText || !noteText.trim()) return

    saveWorkflow({
      ...workflow,
      [id]: {
        ...current,
        pendingNote: '',
        notes: [
          { text: noteText.trim(), date: new Date().toLocaleString() },
          ...(current.notes || []),
        ],
        timeline: [
          { text: 'Manager note added', date: new Date().toLocaleString() },
          ...(current.timeline || []),
        ],
      },
    })
  }

  async function saveVendor(item) {
    const wf = workflow[item.id] || {}

    await supabase
      .from('bos_actions')
      .update({
        vendor_name: wf.vendor_name ?? item.vendor_name ?? '',
        vendor_phone: wf.vendor_phone ?? item.vendor_phone ?? '',
        vendor_email: wf.vendor_email ?? item.vendor_email ?? '',
        dispatch_note: wf.dispatch_note ?? item.dispatch_note ?? '',
      })
      .eq('id', item.id)

    addTimeline(item.id, 'Vendor details saved')
    fetchData()
  }

  async function dispatchVendor(item) {
    const wf = workflow[item.id] || {}

    const vendorName = wf.vendor_name ?? item.vendor_name ?? ''
    const vendorPhone = wf.vendor_phone ?? item.vendor_phone ?? ''
    const vendorEmail = wf.vendor_email ?? item.vendor_email ?? ''
    const dispatchNote = wf.dispatch_note ?? item.dispatch_note ?? ''

    if (!vendorName || !vendorPhone) {
      alert('Please enter at least vendor name and vendor phone before dispatching.')
      return
    }

    if (!vendorEmail) {
      alert('Please enter a vendor email before dispatching.')
      return
    }

    try {
      setDispatchFeedback({
        ...dispatchFeedback,
        [item.id]: {
          type: 'loading',
          message: 'Preparing simulated vendor dispatch...',
        },
      })

      const response = await fetch('/api/send-vendor-dispatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action_id: item.id,
          requestId: item.id,
          vendorName,
          vendorPhone,
          vendorEmail,
          requestType: item.request_type || item.title || 'Manager Dispatch',
          propertyName: item.association_name || 'Demo Association',
          ownerName: item.owner_name || '',
          ownerPhone: item.owner_phone || '',
          propertyAddress: item.property_address || '',
          description: item.description || '',
          dispatchNote,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Vendor dispatch failed.')
      }

      await supabase
        .from('bos_actions')
        .update({
          vendor_name: vendorName,
          vendor_phone: vendorPhone,
          vendor_email: vendorEmail,
          dispatch_note: dispatchNote || '',
          dispatched_at: new Date().toISOString(),
        })
        .eq('id', item.id)

      addTimeline(item.id, 'Vendor dispatch simulated successfully')

      setDispatchFeedback({
        ...dispatchFeedback,
        [item.id]: {
          type: 'success',
          message:
            'Vendor dispatch simulated successfully. Vendor email will be restored when Resend is reconnected.',
        },
      })

      fetchData()
    } catch (error) {
      console.error('Vendor dispatch error:', error)

      setDispatchFeedback({
        ...dispatchFeedback,
        [item.id]: {
          type: 'error',
          message: error.message || 'There was an error sending it.',
        },
      })
    }
  }

  const filtered = useMemo(() => {
    if (filter === 'all') return items
    return items.filter((item) => item.status === filter)
  }, [items, filter])

  const counts = {
    all: items.length,
    open: items.filter((i) => i.status === 'open').length,
    in_progress: items.filter((i) => i.status === 'in_progress').length,
    board_review: items.filter((i) => i.status === 'board_review').length,
    approved: items.filter((i) => i.status === 'approved').length,
    rejected: items.filter((i) => i.status === 'rejected').length,
    completed: items.filter((i) => i.status === 'completed').length,
  }

  const dispatchReadyCount = items.filter(
    (i) => i.status === 'approved' && !i.dispatched_at
  ).length

  const dispatchedCount = items.filter((i) => i.dispatched_at).length

  const highPriorityCount = items.filter((i) => i.priority === 'high').length

  const statusStyles = {
    open: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
    in_progress: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30',
    board_review: 'bg-purple-400/10 text-purple-300 border-purple-400/30',
    approved: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    rejected: 'bg-red-500/10 text-red-300 border-red-500/30',
    completed: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
  }

  const priorityStyles = {
    high: 'bg-red-400/10 text-red-300 border-red-400/30',
    medium: 'bg-orange-400/10 text-orange-300 border-orange-400/30',
    low: 'bg-slate-400/10 text-slate-300 border-slate-400/30',
  }

  const inputClass =
    'rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/40'

  return (
    <div className="min-h-screen bg-[#020617] pb-24 text-white md:pb-0">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
                BOS Manager Command Layer
              </div>

              <h1 className="text-4xl font-semibold tracking-tight">
                Manager Command Center
              </h1>

              <p className="mt-3 max-w-3xl text-slate-400">
                Live operational overview of manager-reviewed items, board-ready
                approvals, vendor dispatch activity, AI intake, and priority issues.
                The Action Center processes decisions; this Command Center shows the
                current operational picture.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
  href="/portal/manager#live-queue"
                className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-yellow-900/20 hover:bg-yellow-300"
              >
                Open Action Center
              </Link>

             <div />

              <button
                onClick={fetchData}
                className="hidden rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-white/10 md:block"
              >
                Refresh Live Data
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <CommandMetric
              label="Needs Manager Review"
              value={counts.open + counts.in_progress}
              text="New intake and items still requiring manager decision."
            />
            <CommandMetric
              label="Board Review"
              value={counts.board_review}
              text="Items routed for board approval or authorization."
            />
            <CommandMetric
              label="Ready for Vendor"
              value={dispatchReadyCount}
              text="Approved items not yet dispatched to vendor."
            />
            <CommandMetric
              label="High Priority"
              value={highPriorityCount}
              text="Items marked high priority across the live queue."
            />
          </div>
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-3">
          <CommandPanel
            title="Action Center Output"
            description="Manager decisions feed this Command Center after review, approval, escalation, rejection, or routing."
            href="/portal/manager/action-center"
            cta="Process Items"
            lines={[
              `${counts.open} request received`,
              `${counts.in_progress} under management review`,
              `${counts.approved} approved or scheduled`,
            ]}
          />

          <CommandPanel
            title="Vendor Dispatch Readiness"
            description="Approved work orders can be assigned, dispatched, tracked, and closed from the vendor workflow."
            href="/portal/manager/vendor-dispatch"
            cta="Open Vendor Dispatch"
            lines={[
              `${dispatchReadyCount} ready for vendor assignment`,
              `${dispatchedCount} already dispatched`,
              `${counts.completed} completed items`,
            ]}
          />

          <CommandPanel
            title="Board Approval Queue"
            description="Items requiring board review remain visible here while the detailed action record stays below."
            href="#live-queue"
            cta="View Live Queue"
            lines={[
              `${counts.board_review} awaiting board review`,
              `${counts.rejected} rejected items`,
              `${counts.all} total live records`,
            ]}
          />
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-7">
          {[
            ['all', 'Total'],
            ['open', 'Received'],
            ['in_progress', 'Mgmt Review'],
            ['board_review', 'Board Review'],
            ['approved', 'Approved'],
            ['rejected', 'Rejected'],
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

        <div
          id="live-queue"
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl"
        >
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

            {!loading &&
              filtered.map((item) => {
                const wf = workflow[item.id] || {}
                const vendorName = wf.vendor_name ?? item.vendor_name ?? ''
                const vendorPhone = wf.vendor_phone ?? item.vendor_phone ?? ''
                const vendorEmail = wf.vendor_email ?? item.vendor_email ?? ''
                const dispatchNote = wf.dispatch_note ?? item.dispatch_note ?? ''

                return (
                  <div
                    key={item.id}
                    className="px-6 py-6 transition hover:bg-white/[0.03]"
                  >
                    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                      <div>
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs ${
                              statusStyles[item.status] ||
                              'border-white/10 bg-white/5 text-slate-300'
                            }`}
                          >
                            {getStatusLabel(item.status)}
                          </span>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs ${
                              priorityStyles[item.priority] ||
                              'border-white/10 bg-white/5 text-slate-300'
                            }`}
                          >
                            {item.priority || 'normal'} priority
                          </span>

                          {item.association_name && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                              {item.association_name}
                            </span>
                          )}
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
                          <InfoBox
                            label="Association"
                            value={item.association_name || '—'}
                          />
                          <InfoBox label="Owner" value={item.owner_name || '—'} />
                          <InfoBox
                            label="Owner Phone"
                            value={
                              item.owner_phone ? (
                                <a
                                  href={`tel:${item.owner_phone}`}
                                  className="text-yellow-300 hover:underline"
                                >
                                  {item.owner_phone}
                                </a>
                              ) : (
                                '—'
                              )
                            }
                          />
                          <InfoBox
                            label="Address / Unit"
                            value={item.property_address || '—'}
                          />
                          <InfoBox
                            label="Best Contact Time"
                            value={item.best_contact_time || '—'}
                          />
                          <InfoBox
                            label="Submitted"
                            value={
                              item.created_at
                                ? new Date(item.created_at).toLocaleDateString()
                                : 'No date'
                            }
                          />

                          {item.request_type === 'amenity' && (
                            <>
                              <InfoBox
                                label="Amenity Chosen"
                                value={item.amenity_selected || '—'}
                              />
                              <InfoBox
                                label="Amenity Date"
                                value={
                                  item.amenity_date
                                    ? new Date(item.amenity_date).toLocaleDateString()
                                    : '—'
                                }
                              />
                            </>
                          )}
                        </div>

                        <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.05] p-5">
                          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div>
                              <h4 className="font-semibold text-white">
                                Vendor Dispatch
                              </h4>
                              <p className="mt-1 text-sm text-slate-400">
                                Assign the preferred vendor and dispatch the request when ready.
                              </p>
                            </div>

                            {item.dispatched_at && (
                              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                                Dispatched
                              </span>
                            )}
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            <input
                              value={vendorName}
                              onChange={(e) =>
                                updateWorkflowField(item.id, 'vendor_name', e.target.value)
                              }
                              placeholder="Vendor name"
                              className={inputClass}
                            />

                            <input
                              value={vendorPhone}
                              onChange={(e) =>
                                updateWorkflowField(item.id, 'vendor_phone', e.target.value)
                              }
                              placeholder="Vendor phone"
                              className={inputClass}
                            />

                            <input
                              value={vendorEmail}
                              onChange={(e) =>
                                updateWorkflowField(item.id, 'vendor_email', e.target.value)
                              }
                              placeholder="Vendor email"
                              className={inputClass}
                            />
                          </div>

                          <textarea
                            value={dispatchNote}
                            onChange={(e) =>
                              updateWorkflowField(item.id, 'dispatch_note', e.target.value)
                            }
                            placeholder="Dispatch note for vendor..."
                            rows={3}
                            className={`${inputClass} mt-3 w-full`}
                          />

                          <div className="mt-4 grid gap-3 md:grid-cols-3">
                            <button
                              onClick={() => saveVendor(item)}
                              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/10"
                            >
                              Save Vendor
                            </button>

                            {vendorPhone ? (
                              <a
                                href={`tel:${vendorPhone}`}
                                className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-center text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
                              >
                                Call Vendor
                              </a>
                            ) : (
                              <button
                                disabled
                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-500"
                              >
                                Call Vendor
                              </button>
                            )}

                            <button
                              onClick={() => {
                                if (!item.dispatched_at) dispatchVendor(item)
                              }}
                              disabled={!!item.dispatched_at}
                              className={`rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg transition ${
                                item.dispatched_at
                                  ? 'cursor-not-allowed border-emerald-400/30 bg-emerald-400/10 text-emerald-300 shadow-none'
                                  : 'border-yellow-400/40 bg-yellow-400 text-slate-950 shadow-yellow-900/20 hover:bg-yellow-300'
                              }`}
                            >
                              {dispatchFeedback[item.id]?.type === 'loading'
                                ? 'Dispatching...'
                                : item.dispatched_at
                                  ? 'Dispatch Locked'
                                  : 'Send Vendor Dispatch'}
                            </button>
                          </div>

                          {dispatchFeedback[item.id] && (
                            <div
                              className={`mt-4 rounded-xl border px-4 py-3 text-sm font-medium ${
                                dispatchFeedback[item.id].type === 'error'
                                  ? 'border-red-400/30 bg-red-400/10 text-red-300'
                                  : dispatchFeedback[item.id].type === 'loading'
                                    ? 'border-yellow-400/30 bg-yellow-400/10 text-yellow-300'
                                    : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                              }`}
                            >
                              {dispatchFeedback[item.id].message}
                            </div>
                          )}

                          {item.dispatched_at && (
                            <div className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-xs text-emerald-300">
                              Dispatched: {new Date(item.dispatched_at).toLocaleString()}
                            </div>
                          )}
                        </div>

                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                          <input
                            value={wf.vendor || ''}
                            onChange={(e) =>
                              updateWorkflowField(item.id, 'vendor', e.target.value)
                            }
                            placeholder="Internal assignment"
                            className={inputClass}
                          />

                          <input
                            type="date"
                            value={wf.dueDate || ''}
                            onChange={(e) =>
                              updateWorkflowField(item.id, 'dueDate', e.target.value)
                            }
                            className={inputClass}
                          />

                          <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                            Manager follow-up
                          </div>
                        </div>

                        <div className="mt-5">
                          <textarea
                            value={wf.pendingNote || ''}
                            onChange={(e) =>
                              updateWorkflowField(item.id, 'pendingNote', e.target.value)
                            }
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
                              <div
                                key={index}
                                className="rounded-xl border border-white/10 bg-black/20 p-4"
                              >
                                <div className="text-sm text-slate-300">{note.text}</div>
                                <div className="mt-2 text-xs text-slate-500">
                                  {note.date}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                        <h4 className="font-semibold">Workflow Controls</h4>

                        <div className="mt-4 grid gap-2">
                          <button
                            onClick={() => updateStatus(item.id, 'open')}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm hover:bg-white/10"
                          >
                            Request Received
                          </button>

                          <button
                            onClick={() => updateStatus(item.id, 'in_progress')}
                            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-left text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
                          >
                            Management Review
                          </button>

                          <button
                            onClick={() => updateStatus(item.id, 'board_review')}
                            className="rounded-xl border border-purple-400/30 bg-purple-400/10 px-4 py-3 text-left text-sm font-medium text-purple-300 hover:bg-purple-400/20"
                          >
                            Board Review If Needed
                          </button>

                          <button
                            onClick={() => updateStatus(item.id, 'approved')}
                            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-left text-sm font-medium text-emerald-300 hover:bg-emerald-500/20"
                          >
                            Approved / Scheduled
                          </button>

                          <button
                            onClick={() => updateStatus(item.id, 'completed')}
                            className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-left text-sm font-medium text-emerald-300 hover:bg-emerald-400/20"
                          >
                            Completed
                          </button>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-5">
                          <h4 className="font-semibold">Activity Timeline</h4>

                          <div className="mt-4 space-y-4">
                            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                              <div className="text-sm text-slate-300">
                                Request received
                              </div>
                              <div className="mt-1 text-xs text-slate-500">
                                {item.created_at
                                  ? new Date(item.created_at).toLocaleString()
                                  : '—'}
                              </div>
                            </div>

                            {(wf.timeline || []).map((entry, index) => (
                              <div
                                key={index}
                                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                              >
                                <div className="text-sm text-slate-300">
                                  {entry.text}
                                </div>
                                <div className="mt-1 text-xs text-slate-500">
                                  {entry.date}
                                </div>
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
              <div className="px-6 py-10 text-slate-400">No items found.</div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#020617]/95 p-3 backdrop-blur md:hidden">
        <button
          onClick={fetchData}
          className="w-full rounded-xl border border-yellow-400/30 bg-yellow-400 px-5 py-4 text-sm font-semibold text-slate-950"
        >
          Refresh Live Data
        </button>
      </div>
    </div>
  )
}

function CommandMetric({ label, value, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-yellow-300">{value}</div>
      <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  )
}

function CommandPanel({ title, description, lines, href, cta }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>

      <div className="mt-5 space-y-3">
        {lines.map((line) => (
          <div
            key={line}
            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300"
          >
            {line}
          </div>
        ))}
      </div>

      <Link
        href={href}
        className="mt-5 inline-flex rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
      >
        {cta}
      </Link>
    </div>
  )
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-300">{value}</div>
    </div>
  )
}


