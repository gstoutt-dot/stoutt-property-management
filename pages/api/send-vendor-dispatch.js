import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  try {
    const {
      vendorName,
      vendorEmail,
      vendorPhone,
      requestType,
      propertyName,
      ownerName,
      ownerPhone,
      propertyAddress,
      description,
      dispatchNote,
    } = req.body

    if (!vendorEmail) {
      return res.status(400).json({
        success: false,
        message: 'Vendor email is required.',
      })
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 24px;">
        <h2>New Vendor Dispatch</h2>

        <p>
          You have received a new dispatch request from
          <strong>Stoutt Property Management</strong>.
        </p>

        <hr style="margin: 20px 0;" />

        <h3>Request Details</h3>

        <p><strong>Request Type:</strong> ${requestType || 'Service Request'}</p>
        <p><strong>Association:</strong> ${propertyName || 'Association'}</p>
        <p><strong>Owner:</strong> ${ownerName || 'N/A'}</p>
        <p><strong>Owner Phone:</strong> ${ownerPhone || 'N/A'}</p>
        <p><strong>Location:</strong> ${propertyAddress || 'N/A'}</p>

        <p><strong>Description:</strong></p>

        <div style="padding: 12px; background: #f4f4f4; border-radius: 8px;">
          ${description || 'No description provided.'}
        </div>

        ${
          dispatchNote
            ? `
          <p><strong>Dispatch Notes:</strong></p>

          <div style="padding: 12px; background: #fff8dc; border-radius: 8px;">
            ${dispatchNote}
          </div>
        `
            : ''
        }

        <hr style="margin: 20px 0;" />

        <p>
          Please contact the resident to coordinate service scheduling.
        </p>

        <p>
          Vendor Phone on File:
          ${vendorPhone || 'N/A'}
        </p>

        <p style="margin-top: 32px;">
          — Stoutt Property Management
        </p>
      </div>
    `

    const emailResponse = await resend.emails.send({
      from: 'dispatch@stouttmgmt.com',
      to: vendorEmail,
      subject: `New Dispatch • ${requestType || 'Service Request'}`,
      html: emailHtml,
    })

    console.log('VENDOR DISPATCH EMAIL SENT:', emailResponse)

    return res.status(200).json({
      success: true,
      message: 'Vendor dispatch email sent successfully.',
      emailResponse,
    })
  } catch (error) {
    console.error('Vendor dispatch email failed:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to send vendor dispatch email.',
      error: error.message,
    })
  }
}
