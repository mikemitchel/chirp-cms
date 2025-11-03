/**
 * Webhook utility for notifying front-end applications of content changes
 */

interface WebhookPayload {
  collection: string
  operation: 'create' | 'update' | 'delete'
  timestamp: string
  id?: string | number
}

/**
 * Sends a webhook notification to the configured endpoint
 * Gracefully handles failures to prevent blocking CMS operations
 */
export async function sendWebhook(payload: WebhookPayload): Promise<void> {
  try {
    // Get webhook URL from environment, with fallback for local development
    const webhookUrl = process.env.WEBHOOK_URL || 'http://localhost:5173/api/webhook'

    // Don't send webhook if explicitly disabled
    if (process.env.WEBHOOK_ENABLED === 'false') {
      console.log('[Webhook] Webhooks disabled, skipping:', payload.collection)
      return
    }

    console.log(`[Webhook] Sending to ${webhookUrl}:`, payload)

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      console.warn(
        `[Webhook] Failed to send webhook (${response.status}):`,
        payload.collection
      )
    } else {
      console.log('[Webhook] Successfully sent:', payload.collection)
    }
  } catch (error) {
    // Log error but don't throw - webhook failures should not block saves
    console.error('[Webhook] Error sending webhook:', error)
  }
}
