/**
 * Alt Text Generation using Hugging Face BLIP Model
 * Uses Salesforce/blip-image-captioning-large for high-quality image descriptions
 */

interface HuggingFaceResponse {
  generated_text?: string
  error?: string
}

/**
 * Generates alt text for an image using Hugging Face Inference API
 * @param imageBuffer - Image file as Buffer
 * @returns Generated alt text description
 */
export async function generateAltText(imageBuffer: Buffer): Promise<string | null> {
  const apiToken = process.env.HUGGINGFACE_API_TOKEN

  if (!apiToken) {
    console.warn('[generateAltText] No HUGGINGFACE_API_TOKEN found, skipping alt text generation')
    return null
  }

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/octet-stream',
        },
        body: imageBuffer,
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[generateAltText] Hugging Face API error:', response.status, errorText)
      return null
    }

    const result = (await response.json()) as HuggingFaceResponse[]

    if (result && result[0]?.generated_text) {
      const altText = result[0].generated_text.trim()
      console.log('[generateAltText] Generated alt text:', altText)
      return altText
    }

    console.warn('[generateAltText] No generated text in response:', result)
    return null
  } catch (error) {
    console.error('[generateAltText] Error generating alt text:', error)
    return null
  }
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalizeFirstLetter(text: string): string {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}
