import { Resend } from 'resend'
import { supabase } from '../../lib/supabaseClient'

const resend = new Resend(process.env.RESEND_API_KEY)

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

  const subject = `Service Dispatch: ${action.title || 'Association Request'}`

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2>Stoutt Property Management - Vendor Dispatch</h2>

      <p>You have been assigned a service request.</p>

      <hr />

      <p><strong>Association:</strong> ${action.association_name || 'Not provided'}</p>
      <p><strong>Property Address:</strong> ${action.property_address || 'Not provided'}</p>
      <p><strong>Owner:</strong> ${action.owner_name || 'Not provided'}</p>
      <p><strong>Owner Phone:</strong> ${action.owner_phone || 'Not provided'}</p>
      <p><strong>Best Contact Time:</strong> ${action.best_contact_time || 'Not provided'}</p>

      <hr />

      <p><strong>Request Type:</strong> ${action.request_type || 'General'}</p>
      <p><strong>Priority:</strong> ${action.priority || 'Medium'}</p>
      <p><strong>Issue:</strong></p>
      <p>${action.description || action.title || 'No description provided.'}</p>

      ${
        action.dispatch_note
          ? `<p><strong>Manager Dispatch Note:</strong></p><p>${action.dispatch_note}</p>`
          : ''
      }

      <hr />

      <p>Please review and coordinate service with the property manager.</p>

      <p>
        Thank you,<br />
        <strong>Stoutt Property Management</strong>
      </p>
    </div>
  `

  const emailResult = await resend.emails.send({
    from: 'Stoutt Property Management <onboarding@resend.dev>',
    to: action.vendor_email,
    subject,
    html,
  })

  if (emailResult.error) {
    return res.status(500).json({
      success: false,
      message: emailResult.error.message,
    })
  }

  await supabase
    .from('bos_actions')
    .update({
      dispatched_at: new Date().toISOString(),
      status: action.status === 'open' ? 'in_progress' : action.status,
    })
    .eq('id', action_id)

  return res.status(200).json({
    success: true,
    message: 'Vendor dispatch email sent',
    email: emailResult.data,
  })
}
