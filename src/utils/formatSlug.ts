import type { FieldHook } from 'payload'

/**
 * Format a string into a URL-friendly slug
 * @param val - The value to format
 * @returns Formatted slug
 */
export const formatSlug = (val: string): string => {
  return val
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars (except spaces and hyphens)
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Hook to auto-generate slug from specified field (default: 'title')
 * Only generates if slug is empty
 */
export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    // Only auto-generate on create or if slug is empty
    if (operation === 'create' || !value) {
      const sourceValue = data?.[fallback]
      if (typeof sourceValue === 'string' && sourceValue.length > 0) {
        return formatSlug(sourceValue)
      }
    }
    return value
  }
