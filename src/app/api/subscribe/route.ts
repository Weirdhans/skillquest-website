import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, variant } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Kit.com (formerly ConvertKit) Integration
    // Get API credentials from environment variables
    const KIT_API_KEY = process.env.KIT_API_KEY || process.env.CONVERTKIT_API_KEY
    const KIT_FORM_ID = process.env.KIT_FORM_ID || process.env.CONVERTKIT_FORM_ID

    if (!KIT_API_KEY || !KIT_FORM_ID) {
      console.error('Kit.com credentials not configured')
      // For development mode, just log the subscription
      console.log('📧 Email signup:', { email, variant, timestamp: new Date().toISOString() })

      return NextResponse.json(
        { success: true, message: 'Subscription logged (dev mode)' },
        { status: 200 }
      )
    }

    // Subscribe to Kit.com (uses same API endpoints as ConvertKit)
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email,
          tags: [variant], // Tag user with landing page variant for A/B testing
          fields: {
            source: 'skill-quest.app',
            variant: variant,
            timestamp: new Date().toISOString(),
          }
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Kit.com API error')
    }

    const data = await response.json()

    // Optional: Track conversion in analytics (Plausible example)
    if (process.env.PLAUSIBLE_DOMAIN) {
      await fetch('https://plausible.io/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': request.headers.get('user-agent') || 'Unknown',
        },
        body: JSON.stringify({
          name: 'Email Signup',
          url: `https://skill-quest.app/${variant}`,
          domain: process.env.PLAUSIBLE_DOMAIN,
          props: { variant }
        })
      }).catch(err => console.error('Analytics error:', err))
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
