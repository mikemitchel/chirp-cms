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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await getPayload({ config })

    // Get member by ID
    const member = await payload.findByID({
      collection: 'listeners',
      id: params.id,
    })

    const allowedOrigin = getAllowedOrigin(request)

    if (!member) {
      return NextResponse.json(
        {
          message: 'Member not found',
          success: false,
        },
        {
          status: 404,
          headers: {
            'Access-Control-Allow-Origin': allowedOrigin,
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      )
    }

    // Return onboarding status
    return NextResponse.json(
      {
        success: true,
        onboardingCompleted: member.onboardingCompleted || false,
        memberId: member.id,
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
    console.error('Onboarding status error:', error)

    const allowedOrigin = getAllowedOrigin(request)

    return NextResponse.json(
      {
        message: error.message || 'Failed to get onboarding status',
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
