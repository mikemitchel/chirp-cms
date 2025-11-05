# Complete Guide: Automated DJ Show Archives from Google Cloud Storage

## Architecture Overview
```
GCS Upload → Cloud Function → CMS Webhook → Frontend Display
```

When a file is uploaded to `chirpradio-stream-archives` bucket:
1. **Cloud Function** is triggered automatically
2. Parses filename to extract DJ info and date
3. Calls **CMS webhook** to add show to DJ's previousShows
4. **Frontend** displays shows on DJ detail page

---

## Part 1: CMS Setup (✅ DONE)

The `previousShows` field has been added to Members collection.

---

## Part 2: Create CMS Webhook Endpoint

### Create `/api/webhooks/add-previous-show` route

**File: `chirp-cms/src/app/api/webhooks/add-previous-show/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

interface AddShowRequest {
  djName?: string
  showScheduleTime?: string  // e.g., "0-16" from filename
  fileName: string
  fileUrl: string
  showDate: string  // ISO date from filename
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
    let djQuery: any = {}

    if (body.djName) {
      djQuery = {
        or: [
          { djName: { equals: body.djName } },
          { firstName: { equals: body.djName } },
        ]
      }
    } else if (body.showScheduleTime) {
      // Try to match by show schedule (this is approximate)
      djQuery = {
        showTime: { contains: body.showScheduleTime }
      }
    }

    const djs = await payload.find({
      collection: 'listeners',
      where: {
        and: [
          djQuery,
          {
            roles: { contains: 'Regular DJ' }
          }
        ]
      },
      limit: 1
    })

    if (!djs.docs || djs.docs.length === 0) {
      console.log('[add-previous-show] No DJ found for:', body)
      return NextResponse.json({
        error: 'DJ not found',
        djName: body.djName,
        showScheduleTime: body.showScheduleTime
      }, { status: 404 })
    }

    const dj = djs.docs[0]

    // Check if show already exists
    const existingShows = dj.previousShows || []
    const isDuplicate = existingShows.some(
      (show: any) => show.gcsFileName === body.fileName
    )

    if (isDuplicate) {
      console.log('[add-previous-show] Show already exists:', body.fileName)
      return NextResponse.json({
        message: 'Show already exists',
        djId: dj.id
      })
    }

    // Format title from date
    const showDateObj = new Date(body.showDate)
    const formattedDate = showDateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
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
            gcsFileName: body.fileName
          }
        ]
      }
    })

    console.log('[add-previous-show] Successfully added show:', {
      djName: dj.djName,
      title,
      fileName: body.fileName
    })

    return NextResponse.json({
      success: true,
      djId: dj.id,
      djName: dj.djName,
      showTitle: title
    })

  } catch (error) {
    console.error('[add-previous-show] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}
```

### Add environment variable

**File: `chirp-cms/.env`**

```bash
# Add this line
GCS_WEBHOOK_SECRET=your-secret-key-here-generate-a-random-string
```

---

## Part 3: Google Cloud Function Setup

### Step 1: Install Google Cloud CLI

```bash
# Mac
brew install google-cloud-sdk

# Initialize
gcloud init
gcloud auth login
```

### Step 2: Enable Required APIs

```bash
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### Step 3: Create Cloud Function

**Create directory: `gcs-to-cms-function/`**

**File: `gcs-to-cms-function/index.js`**

```javascript
const functions = require('@google-cloud/functions-framework')
const axios = require('axios')

/**
 * Parses GCS filename: WCXP-LP-0-16-2025-10-26-2fc3df8a.mp3
 * Returns: { showTime: "0-16", date: "2025-10-26", hash: "2fc3df8a" }
 */
function parseFileName(fileName) {
  // Pattern: WCXP-LP-{time}-YYYY-MM-DD-{hash}.mp3
  const pattern = /WCXP-LP-(\d+-\d+)-(\d{4}-\d{2}-\d{2})-([a-f0-9]+)\.mp3/i
  const match = fileName.match(pattern)

  if (!match) {
    console.error('Failed to parse filename:', fileName)
    return null
  }

  return {
    showTime: match[1],  // e.g., "0-16"
    date: match[2],      // e.g., "2025-10-26"
    hash: match[3]       // e.g., "2fc3df8a"
  }
}

/**
 * Converts time range to show name
 * This is a mapping - update based on your actual schedule
 */
function getShowNameFromTime(timeRange) {
  const timeMap = {
    '0-16': 'Overnight Show',
    '16-20': 'Afternoon Drive',
    '20-24': 'Evening Show'
    // Add more mappings as needed
  }
  return timeMap[timeRange] || `Show (${timeRange})`
}

/**
 * Cloud Function triggered by GCS object finalize (upload)
 */
functions.cloudEvent('processShowArchive', async (cloudEvent) => {
  const file = cloudEvent.data

  console.log('Processing file:', {
    name: file.name,
    bucket: file.bucket,
    contentType: file.contentType,
    size: file.size
  })

  // Only process MP3 files in the correct bucket
  if (file.bucket !== 'chirpradio-stream-archives' || !file.name.endsWith('.mp3')) {
    console.log('Skipping file (not an archive MP3)')
    return
  }

  // Parse filename
  const parsed = parseFileName(file.name)
  if (!parsed) {
    console.error('Could not parse filename, skipping')
    return
  }

  // Construct public GCS URL
  const fileUrl = `https://storage.googleapis.com/download/storage/v1/b/${file.bucket}/o/${encodeURIComponent(file.name)}?generation=${file.generation}&alt=media`

  // Prepare payload for CMS webhook
  const payload = {
    showScheduleTime: parsed.showTime,
    fileName: file.name,
    fileUrl: fileUrl,
    showDate: parsed.date,
    secret: process.env.GCS_WEBHOOK_SECRET  // Must match CMS secret
  }

  // Call CMS webhook
  const cmsWebhookUrl = process.env.CMS_WEBHOOK_URL

  try {
    const response = await axios.post(cmsWebhookUrl, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000
    })

    console.log('Successfully notified CMS:', {
      djName: response.data.djName,
      showTitle: response.data.showTitle
    })

  } catch (error) {
    console.error('Failed to notify CMS:', {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status
    })
    throw error  // Retry on failure
  }
})
```

**File: `gcs-to-cms-function/package.json`**

```json
{
  "name": "gcs-to-cms-function",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "@google-cloud/functions-framework": "^3.4.2",
    "axios": "^1.7.9"
  }
}
```

### Step 4: Deploy Cloud Function

```bash
cd gcs-to-cms-function

# Deploy function
gcloud functions deploy processShowArchive \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=processShowArchive \
  --trigger-bucket=chirpradio-stream-archives \
  --set-env-vars="CMS_WEBHOOK_URL=https://your-cms-url.com/api/webhooks/add-previous-show,GCS_WEBHOOK_SECRET=your-secret-key-here"
```

**Replace:**
- `your-cms-url.com` with your actual CMS domain
- `your-secret-key-here` with the secret from `.env`

---

## Part 4: Update Frontend to Display Shows

### Update DJDetailPage

**File: `chirp-radio/src/pages/DJDetailPage.tsx`** (line 368)

```typescript
// Replace this line:
{!dj.isSubstitute && <CrPreviousShows />}

// With this:
{!dj.isSubstitute && dj.previousShows && dj.previousShows.length > 0 && (
  <CrPreviousShows
    shows={dj.previousShows.map(show => ({
      id: show.gcsFileName || show.date,
      title: show.title,
      date: new Date(show.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      duration: show.duration,
      audioUrl: show.audioUrl
    }))}
  />
)}
```

### Update Member type

**File: `chirp-radio/src/types/cms.ts`** (add to Member interface)

```typescript
export interface Member {
  // ... existing fields ...
  previousShows?: Array<{
    title: string
    date: string
    audioUrl: string
    duration?: string
    gcsFileName?: string
  }>
}
```

---

## Part 5: Testing

### Test the Webhook Manually

```bash
curl -X POST https://your-cms-url.com/api/webhooks/add-previous-show \
  -H "Content-Type: application/json" \
  -d '{
    "showScheduleTime": "0-16",
    "fileName": "WCXP-LP-0-16-2025-10-26-test1234.mp3",
    "fileUrl": "https://storage.googleapis.com/chirpradio-stream-archives/WCXP-LP-0-16-2025-10-26-test1234.mp3",
    "showDate": "2025-10-26",
    "secret": "your-secret-key-here"
  }'
```

### Test by Uploading File to GCS

```bash
# Upload a test MP3
gsutil cp test-show.mp3 gs://chirpradio-stream-archives/WCXP-LP-0-16-2025-10-26-testfile.mp3
```

**Check Cloud Function logs:**
```bash
gcloud functions logs read processShowArchive --region=us-central1 --limit=50
```

---

## Part 6: Maintenance & Monitoring

### View Function Status
```bash
gcloud functions describe processShowArchive --region=us-central1
```

### Update Function
```bash
gcloud functions deploy processShowArchive \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=processShowArchive \
  --trigger-bucket=chirpradio-stream-archives \
  --set-env-vars="CMS_WEBHOOK_URL=https://your-cms-url.com/api/webhooks/add-previous-show,GCS_WEBHOOK_SECRET=your-secret-key-here"
```

### Delete Function (if needed)
```bash
gcloud functions delete processShowArchive --region=us-central1
```

---

## Troubleshooting

### Show not appearing on frontend
1. Check Cloud Function logs for errors
2. Verify DJ exists in CMS with matching name/schedule
3. Check CMS webhook logs
4. Verify file URL is publicly accessible

### Duplicate shows being added
- Function checks `gcsFileName` for duplicates
- If re-uploading same file, delete old entry in CMS first

### DJ matching fails
- Update `getShowNameFromTime()` mapping in Cloud Function
- OR manually set `djName` in Cloud Function based on time slots
- OR add better DJ lookup logic (e.g., query ShowSchedules collection)

---

## Next Steps

1. ✅ Deploy CMS changes (Members.ts updated)
2. Create webhook route in CMS
3. Create and deploy Google Cloud Function
4. Test with manual curl request
5. Test with actual GCS upload
6. Update frontend to display shows
7. Monitor for a few days to ensure reliability

---

## Cost Estimate

- **Cloud Functions**: ~$0.40/million invocations (likely < $1/month)
- **Cloud Storage**: Already paying for the bucket
- **Total**: < $1/month additional cost
