import { supabase } from '../../lib/supabaseClient'

function cleanText(value) {
  return String(value || '').trim()
}

function titleCase(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function normalizeRequestType(type, summary) {
  const clean = `${type || ''} ${summary || ''}`.toLowerCase()

  if (
    clean.includes('pool') ||
    clean.includes('light') ||
    clean.includes('gate') ||
    clean.includes('leak') ||
    clean.includes('broken') ||
    clean.includes('repair') ||
    clean.includes('maintenance') ||
    clean.includes('burned out') ||
    clean.includes('burnt out') ||
    clean.includes('clubhouse') ||
    clean.includes('landscape') ||
    clean.includes('irrigation')
  ) {
    return 'maintenance'
  }

  if (clean.includes('architectural') || clean.includes('arc') || clean.includes('paint') || clean.includes('roof') || clean.includes('fence')) {
    return 'architectural'
  }

  if (clean.includes('amenity') || clean.includes('reservation') || clean.includes('access card') || clean.includes('fob')) {
    return 'amenity'
  }

  if (clean.includes('financial') || clean.includes('account') || clean.includes('balance') || clean.includes('payment') || clean.includes('ledger')) {
    return 'financial'
  }

  if (clean.includes('violation') || clean.includes('parking') || clean.includes('trash') || clean.includes('noise')) {
    return 'violation'
  }

  if (clean.includes('document') || clean.includes('estoppel') || clean.includes('questionnaire') || clean.includes('records')) {
    return 'documents'
  }

  return 'general'
}

function normalizePriority(urgency, summary) {
  const clean = `${urgency || ''} ${summary || ''}`.toLowerCase()

  if (
    clean.includes('emergency') ||
    clean.includes('flood') ||
    clean.includes('active leak') ||
    clean.includes('no water') ||
    clean.includes('fire') ||
    clean.includes('danger') ||
    clean.includes('unsafe') ||
    clean.includes('security gate stuck open') ||
    clean.includes('gate stuck open')
  ) {
    return 'high'
  }

  if (
    clean.includes('burned out') ||
    clean.includes('burnt out') ||
    clean.includes('light') ||
    clean.includes('clubhouse') ||
    clean.includes('pool') ||
    clean.includes('soon') ||
    clean.includes('visibility')
  ) {
    return 'medium'
  }

  if (clean.includes('low') || clean.includes('not urgent') || clean.includes('whenever')) {
    return 'low'
  }

  if (clean.includes('urgent') || clean.includes('high')) {
    return 'high'
  }

  return 'medium'
}

function generateTitle(summary, requestType) {
  const clean = cleanText(summary)

  if (!clean) return 'New Ava Intake Request'

  const lower = clean.toLowerCase()

  if ((lower.includes('pool') || lower.includes('clubhouse')) && (lower.includes('light') || lower.includes('burned') || lower.includes('burnt'))) {
    return 'Pool Light Near Clubhouse Burned Out'
  }

  if (lower.includes('gate')) return 'Gate Access Issue Reported'
  if (lower.includes('leak')) return 'Water Leak Reported'
  if (lower.includes('violation')) return 'Violation Concern Reported'
  if (lower.includes('payment') || lower.includes('balance')) return 'Owner Account Question Reported'

  const shortened = clean.length > 80 ? `${clean.slice(0, 77)}...` : clean
  return titleCase(shortened)
}

function generateDescription({
  issue_summary,
  caller_name,
  association_name,
  property_address,
  request_type,
  urgency,
  best_contact_time,
}) {
  const summary = cleanText(issue_summary)
  const caller = cleanText(caller_name)
  const association = cleanText(association_name)
  const address = cleanText(property_address)
  const category = cleanText(request_type)
  const priority = cleanText(urgency)
  const contactTime = cleanText(best_contact_time)

  const details = []

  if (summary) {
    details.push(`Caller reported: ${summary}`)
  }

  if (association) {
    details.push(`Association: ${association}.`)
  }

  if (address) {
    details.push(`Property / Unit: ${address}.`)
  }

  if (caller) {
    details.push(`Caller: ${caller}.`)
  }

  if (category) {
    details.push(`Request Type: ${category}.`)
  }

  if (priority) {
    details.push(`Reported Urgency: ${priority}.`)
  }

  if (contactTime) {
    details.push(`Best Contact Time: ${contactTime}.`)
  }

  if (!details.length) {
    return 'Ava created a new intake item requiring property manager review.'
  }

  return details.join(' ')
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

  const cleanSummary = cleanText(issue_summary)

  if (!cleanSummary) {
    return res.status(400).json({
      success: false,
      message: 'Missing issue_summary',
    })
  }

  const normalizedType = normalizeRequestType(request_type, cleanSummary)
  const normalizedPriority = normalizePriority(urgency, cleanSummary)
  const title = generateTitle(cleanSummary, normalizedType)

  const description = generateDescription({
    issue_summary: cleanSummary,
    caller_name,
    association_name,
    property_address,
    request_type: normalizedType,
    urgency: normalizedPriority,
    best_contact_time,
  })

  const { data, error } = await supabase
    .from('bos_actions')
    .insert([
      {
        request_type: normalizedType,
        title,
        description,
        priority: normalizedPriority,
        association_name: cleanText(association_name) || 'Demo Association',
        owner_name: cleanText(caller_name) || 'Ava Caller',
        owner_phone: cleanText(caller_phone),
        owner_email: '',
        property_address: cleanText(property_address) || 'Pending manager confirmation',
        best_contact_time: cleanText(best_contact_time) || 'Normal business hours',
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
