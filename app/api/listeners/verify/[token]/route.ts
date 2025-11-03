import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const payload = await getPayload({ config })

    // Use Payload's Local API to verify the email
    await payload.verifyEmail({
      collection: 'listeners',
      token: params.token,
    })

    // Redirect to frontend success page or show success message
    return NextResponse.json({
      message: 'Email verified successfully! You can now log in.',
      success: true
    })
  } catch (error: any) {
    console.error('Verification error:', error)

    return NextResponse.json({
      message: error.message || 'Verification failed',
      success: false
    }, { status: 400 })
  }
}
