import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  outputFileTracingRoot: __dirname, // Fix Next.js workspace root warning
  eslint: {
    // Disable ESLint during production builds (for Docker)
    // Linting should be done in CI/CD pipeline before build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during production builds (for Docker)
    // Type checking should be done in CI/CD pipeline before build
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    }
    return config
  },
}

export default withPayload(nextConfig)
