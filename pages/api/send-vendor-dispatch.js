export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  console.log('SIMULATED VENDOR DISPATCH:', req.body)

  return res.status(200).json({
    success: true,
    simulated: true,
    message: 'Vendor dispatch simulated successfully.',
  })
}
