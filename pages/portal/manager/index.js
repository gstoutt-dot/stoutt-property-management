import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function ManagerDashboard() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data, error } = await supabase
      .from('bos_actions')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setItems(data || [])
  }

  async function updateStatus(id, status) {
    await supabase
      .from('bos_actions')
      .update({ status })
      .eq('id', id)

    fetchData()
  }

  const filtered = items.filter((i) => {
    if (filter === 'all') return true
    return i.status === filter
  })

  return (
    <div style={{ padding: 40, background: '#020617', minHeight: '100vh', color: 'white' }}>
      
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        Manager Command Center
      </h1>

      {/* Filters */}
      <div style={{ marginBottom: 20 }}>
        {['all', 'open', 'in_progress', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              marginRight: 10,
              padding: '8px 14px',
              background: filter === f ? '#38bdf8' : '#1e293b',
              border: 'none',
              borderRadius: 6,
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filtered.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid #334155',
            padding: 20,
            borderRadius: 10,
            marginBottom: 15,
            background: '#0f172a'
          }}
        >
          <h3>{item.title}</h3>

          <p>Status: {item.status}</p>
          <p>Priority: {item.priority}</p>

          <div style={{ marginTop: 10 }}>
            <button onClick={() => updateStatus(item.id, 'in_progress')}>
              Start
            </button>

            <button
              onClick={() => updateStatus(item.id, 'completed')}
              style={{ marginLeft: 10 }}
            >
              Complete
            </button>
          </div>
        </div>
      ))}

    </div>
  )
}

