import { useState } from 'react'

export default function AvaTestPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function sendAvaTest() {
    setLoading(true)
    setResult(null)

    const response = await fetch('/api/ava-intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caller_name: 'Linda Carver',
        caller_phone: '(954) 555-0192',
        association_name: 'Royal Palm Villas HOA',
        property_address: '1842 Palm Ridge Drive, Hollywood, FL 33021',
        request_type: 'maintenance',
        issue_summary:
          'Caller reported that the pool light near the clubhouse is burned out and needs to be inspected.',
        urgency: 'medium',
        best_contact_time: 'Weekdays after 2 PM',
      }),
    })

    const data = await response.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-8 shadow-2xl">
          <div className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
            Ava AI Phone Intake Test
          </div>

          <h1 className="text-4xl font-semibold tracking-tight">
            Send Demo Call to Manager Queue
          </h1>

          <p className="mt-4 text-slate-400">
            This simulates Ava receiving a homeowner call and sending the request into the BOS action queue.
          </p>

          <button
            onClick={sendAvaTest}
            disabled={loading}
            className="mt-8 rounded-xl border border-yellow-400/30 bg-yellow-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Sending Ava Intake...' : 'Send Ava Demo Intake'}
          </button>
        </div>

        {result && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">Result</h2>

            <pre className="mt-4 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
