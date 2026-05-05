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
    clean.includes('maintenance') ||
    clean.includes('repair') ||
    clean.includes('pool') ||
    clean.includes('light') ||
    clean.includes('gate') ||
    clean.includes('leak') ||
    clean.includes('broken') ||
    clean.includes('burned out') ||
    clean.includes('burnt out') ||
    clean.includes('clubhouse') ||
    clean.includes('landscape') ||
    clean.includes('irrigation') ||
    clean.includes('elevator') ||
    clean.includes('electrical')
  ) {
    return 'maintenance'
  }

  if (
    clean.includes('violation') ||
    clean.includes('parking') ||
    clean.includes('trash') ||
    clean.includes('noise') ||
    clean.includes('pet') ||
    clean.includes('rules')
  ) {
    return 'violation'
  }

  if (
    clean.includes('billing') ||
    clean.includes('financial') ||
    clean.includes('account') ||
    clean.includes('balance') ||
    clean.includes('payment') ||
    clean.includes('ledger')
  ) {
    return 'financial'
  }

  if (
    clean.includes('owner request') ||
    clean.includes('management follow-up') ||
    clean.includes('follow up') ||
    clean.includes('message') ||
    clean.includes('complaint')
  ) {
    return 'owner_request'
  }

  if (
    clean.includes('proposal') ||
    clean.includes('sales') ||
    clean.includes('management quote') ||
    clean.includes('new association')
  ) {
    return 'sales_opportunity'
  }

  if (
    clean.includes('architectural') ||
    clean.includes('arc') ||
    clean.includes('paint') ||
    clean.includes('roof') ||
    clean.includes('fence')
  ) {
    return 'architectural'
  }

  if (
    clean.includes('amenity') ||
    clean.includes('reservation') ||
    clean.includes('access card') ||
    clean.includes('fob')
  ) {
    return 'amenity'
  }

  if (
    clean.includes('document') ||
    clean.includes('estoppel') ||
    clean.includes('questionnaire') ||
    clean.includes('records')
  ) {
    return 'documents'
  }

  return 'general'
}

function normalizePriority(priority, summary) {
  const clean = `${priority || ''} ${summary || ''}`.toLowerCase()

  if (
    clean.includes('emergency') ||
    clean.includes('urgent') ||
    clean.includes('high') ||
    clean.includes('flood') ||
    clean.includes('active leak') ||
    clean.includes('no water') ||
    clean.includes('fire') ||
    clean.includes('danger') ||
    clean.includes('unsafe') ||
    clean.includes('electrical hazard') ||
    clean.includes('elevator') ||
    clean.includes('security concern') ||
    clean.includes('gate stuck open')
  ) {
    return 'high'
  }

  if (
    clean.includes('low') ||
    clean.includes('not urgent') ||
    clean.includes('whenever') ||
    clean.includes('general question')
  ) {
    return 'low'
  }

  return 'medium'
}

function generateTitle(title, description, category) {
  const providedTitle = cleanText(title)
  const cleanDescription = cleanText(description)
  const combined = `${providedTitle} ${cleanDescription} ${category || ''}`.toLowerCase()

  if (providedTitle) {
    return titleCase(providedTitle.length > 90 ? `${providedTitle.slice(0, 87)}...` : providedTitle)
  }

  if ((combined.includes('pool') || combined.includes('clubhouse')) && (combined.includes('light') || combined.includes('burned') || combined.includes('burnt'))) {
    return 'Pool Light Near Clubhouse Burned Out'
  }

  if (combined.includes('gate')) return 'Gate Access Issue Reported'
  if (combined.includes('leak')) return 'Water Leak Reported'
  if (combined.includes('elevator')) return 'Elevator Service Issue Reported'
  if (combined.includes('violation')) return 'Violation Concern Reported'
  if (combined.includes('payment') || combined.includes('balance') || combined.includes('billing')) return 'Owner Billing Question Reported'
  if (combined.includes('proposal') || combined.includes('sales')) return 'New Management Proposal Inquiry'

  if (cleanDescription) {
    return titleCase(cleanDescription.length > 90 ? `${cleanDescription.slice(0, 87)}...` : cleanDescription)
  }

  return 'New Ava Intake Request'
}

function generateDescription({
  description,
  title,
  callerName,
  associationName,
  unit,
  category,
  priority,
  bestContactTime,
}) {
  const cleanDescription = cleanText(description)
  const cleanTitle = cleanText(title)
  const details = []

  if (cleanDescription) {
    details.push(`Caller reported: ${cleanDescription}`)
  } else if (cleanTitle) {
    details.push(`Caller reported: ${cleanTitle}`)
  } else {
    details.push('Ava created a new intake item requiring property manager review.')
  }

  if (cleanText(associationName)) {
    details.push(`Association: ${cleanText(associationName)}.`)
  }

  if (cleanText(unit)) {
    details.push(`Property / Unit: ${cleanText(unit)}.`)
  }

  if (cleanText(callerName)) {
    details.push(`Caller: ${cleanText(callerName)}.`)
  }

  if (cleanText(category)) {
    details.push(`Category: ${cleanText(category)}.`)
  }

  if (cleanText(priority)) {
    details.push(`Priority: ${cleanText(priority)}.`)
  }

  if (cleanText(bestContactTime)) {
    details.push(`Best Contact Time: ${cleanText(bestContactTime)}.`)
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

  const body = req.body || {}

  const callerName =
    cleanText(body.caller_name) ||
    cleanText(body.customer_name) ||
    cleanText(body.name)

  const callerPhone =
    cleanText(body.caller_phone) ||
    cleanText(body.customer_phone) ||
    cleanText(body.phone)

  const associationName =
    cleanText(body.association_name) ||
    cleanText(body.association) ||
    cleanText(body.community_name)

  const unit =
    cleanText(body.unit) ||
    cleanText(body.property_address) ||
    cleanText(body.address) ||
    cleanText(body.property)

  const rawCategory =
    cleanText(body.category) ||
    cleanText(body.request_type) ||
    cleanText(body.type)

  const rawPriority =
    cleanText(body.priority) ||
    cleanText(body.urgency)

  const rawDescription =
    cleanText(body.description) ||
    cleanText(body.issue_summary) ||
    cleanText(body.summary) ||
    cleanText(body.request_description)

  const rawTitle =
    cleanText(body.title)

  const bestContactTime =
    cleanText(body.best_contact_time) ||
    cleanText(body.contact_time)

  const usableIssueText = rawDescription || rawTitle

  if (!usableIssueText) {
    return res.status(400).json({
      success: false,
      message: 'Missing title or description',
    })
  }

  const normalizedType = normalizeRequestType(rawCategory, usableIssueText)
  const normalizedPriority = normalizePriority(rawPriority, usableIssueText)
  const finalTitle = generateTitle(rawTitle, rawDescription, normalizedType)

  const finalDescription = generateDescription({
    description: rawDescription,
    title: rawTitle,
    callerName,
    associationName,
    unit,
    category: normalizedType,
    priority: normalizedPriority,
    bestContactTime,
  })

  const { data, error } = await supabase
    .from('bos_actions')
    .insert([
      {
        request_type: normalizedType,
        title: finalTitle,
        description: finalDescription,
        priority: normalizedPriority,
        association_name: associationName || 'Demo Association',
        owner_name: callerName || 'Ava Caller',
        owner_phone: callerPhone,
        owner_email: '',
        property_address: unit || 'Pending manager confirmation',
        best_contact_time: bestContactTime || 'Normal business hours',
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
