import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

// Get allowed origins from environment
const getAllowedOrigin = (request: NextRequest): string => {
  const origin = request.headers.get('origin')
  const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:3001',
  ].filter(Boolean)

  return origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0]
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Get platform from query params (web, mobile, or both)
    const { searchParams } = new URL(request.url)
    const platform = searchParams.get('platform') || 'both'

    // Build where clause for platform filtering
    const whereClause: any = {
      isActive: { equals: true },
    }

    // If specific platform requested, filter for that platform or "both"
    if (platform !== 'both') {
      whereClause.or = [
        { platform: { equals: platform } },
        { platform: { equals: 'both' } },
      ]
    }

    // Fetch onboarding steps
    const steps = await payload.find({
      collection: 'onboarding',
      where: whereClause,
      sort: 'order',
      limit: 100,
    })

    const allowedOrigin = getAllowedOrigin(request)

    return NextResponse.json(
      {
        success: true,
        steps: steps.docs,
        totalSteps: steps.docs.length,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  } catch (error: any) {
    console.error('Get onboarding steps error:', error)

    const allowedOrigin = getAllowedOrigin(request)

    return NextResponse.json(
      {
        message: error.message || 'Failed to get onboarding steps',
        success: false,
      },
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const allowedOrigin = getAllowedOrigin(request)

  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}
