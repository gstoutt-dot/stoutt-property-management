import { supabase } from '../../lib/supabaseClient'

function normalizeRequestType(type) {
  const clean = String(type || '').toLowerCase()

  if (clean.includes('architectural')) return 'architectural'
  if (clean.includes('amenity')) return 'amenity'
  if (clean.includes('financial') || clean.includes('account')) return 'financial'
  if (clean.includes('violation')) return 'violation'
  if (clean.includes('document')) return 'documents'
  if (clean.includes('maintenance') || clean.includes('repair')) return 'maintenance'

  return 'general'
}

function normalizePriority(urgency) {
  const clean = String(urgency || '').toLowerCase()

  if (clean.includes('emergency') || clean.includes('urgent') || clean.includes('high')) return 'high'
  if (clean.includes('low')) return 'low'

  return 'medium'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  const {
    caller_name,
    caller_phone,
    association_name,
    property_address,
    request_type,
    issue_summary,
    urgency,
    best_contact_time,
  } = req.body || {}

  if (!issue_summary) {
    return res.status(400).json({
      success: false,
      message: 'Missing issue_summary',
    })
  }

  const { data, error } = await supabase
    .from('bos_actions')
    .insert([
      {
        request_type: normalizeRequestType(request_type),
        title: issue_summary.slice(0, 80),
        description: issue_summary,
        priority: normalizePriority(urgency),
        association_name: association_name || 'Unknown Association',
        owner_name: caller_name || 'Unknown Caller',
        owner_phone: caller_phone || '',
        owner_email: '',
        property_address: property_address || '',
        best_contact_time: best_contact_time || '',
        status: 'open',
        source: 'Ava AI Phone Intake',
      },
    ])
    .select()
    .single()

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Ava intake request created',
    action: data,
  })
}
