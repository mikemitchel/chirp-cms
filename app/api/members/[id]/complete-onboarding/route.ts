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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await getPayload({ config })

    // Update member's onboarding status
    const member = await payload.update({
      collection: 'listeners',
      id: params.id,
      data: {
        onboardingCompleted: true,
      },
    })

    const allowedOrigin = getAllowedOrigin(request)

    return NextResponse.json(
      {
        success: true,
        message: 'Onboarding marked as complete',
        onboardingCompleted: member.onboardingCompleted,
        memberId: member.id,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  } catch (error: any) {
    console.error('Complete onboarding error:', error)

    const allowedOrigin = getAllowedOrigin(request)

    return NextResponse.json(
      {
        message: error.message || 'Failed to complete onboarding',
        success: false,
      },
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'PATCH, OPTIONS',
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
        'Access-Control-Allow-Methods': 'PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}
