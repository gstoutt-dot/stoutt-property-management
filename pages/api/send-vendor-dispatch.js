import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  const { action_id } = req.body || {}

  if (!action_id) {
    return res.status(400).json({
      success: false,
      message: 'Missing action_id',
    })
  }

  const { data: action, error } = await supabase
    .from('bos_actions')
    .select('*')
    .eq('id', action_id)
    .single()

  if (error || !action) {
    return res.status(404).json({
      success: false,
      message: 'Request not found',
    })
  }

  if (!action.vendor_email) {
    return res.status(400).json({
      success: false,
      message: 'Vendor email is missing',
    })
  }

  // TEMP: simulate email
  console.log('Dispatching to vendor:', action.vendor_email)

  await supabase
    .from('bos_actions')
    .update({
      dispatched_at: new Date().toISOString(),
      status: action.status === 'open' ? 'in_progress' : action.status,
    })
    .eq('id', action_id)

  return res.status(200).json({
    success: true,
    message: 'Vendor dispatch simulated (email disabled for now)',
  })
}
