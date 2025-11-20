import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

interface AddShowRequest {
  djName?: string
  showScheduleTime?: string // e.g., "0-16" from filename
  fileName: string
  fileUrl: string
  showDate: string // ISO date from filename
  duration?: string
  secret: string
}

export async function POST(req: NextRequest) {
  try {
    const body: AddShowRequest = await req.json()

    // Verify secret key
    if (body.secret !== process.env.GCS_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await getPayload({ config })

    // Find DJ by name or schedule time
    let djQuery: Record<string, unknown> = {}

    if (body.djName) {
      djQuery = {
        or: [{ djName: { equals: body.djName } }, { firstName: { equals: body.djName } }],
      }
    } else if (body.showScheduleTime) {
      // Try to match by show schedule (this is approximate)
      djQuery = {
        showTime: { contains: body.showScheduleTime },
      }
    }

    const djs = await payload.find({
      collection: 'listeners',
      where: {
        and: [
          djQuery,
          {
            roles: { contains: 'Regular DJ' },
          },
        ],
      },
      limit: 1,
    })

    if (!djs.docs || djs.docs.length === 0) {
      console.log('[add-previous-show] No DJ found for:', body)
      return NextResponse.json(
        {
          error: 'DJ not found',
          djName: body.djName,
          showScheduleTime: body.showScheduleTime,
        },
        { status: 404 }
      )
    }

    const dj = djs.docs[0]

    // Check if show already exists
    const existingShows = dj.previousShows || []
    const isDuplicate = existingShows.some((show) => show.gcsFileName === body.fileName)

    if (isDuplicate) {
      console.log('[add-previous-show] Show already exists:', body.fileName)
      return NextResponse.json({
        message: 'Show already exists',
        djId: dj.id,
      })
    }

    // Format title from date
    const showDateObj = new Date(body.showDate)
    const formattedDate = showDateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    const title = `${dj.showName || 'Show'} - ${formattedDate}`

    // Add new show to previousShows array
    await payload.update({
      collection: 'listeners',
      id: dj.id,
      data: {
        previousShows: [
          ...existingShows,
          {
            title,
            date: body.showDate,
            audioUrl: body.fileUrl,
            duration: body.duration,
            gcsFileName: body.fileName,
          },
        ],
      },
    })

    console.log('[add-previous-show] Successfully added show:', {
      djName: dj.djName,
      title,
      fileName: body.fileName,
    })

    return NextResponse.json({
      success: true,
      djId: dj.id,
      djName: dj.djName,
      showTitle: title,
    })
  } catch (error) {
    console.error('[add-previous-show] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}
