import { NextResponse } from 'next/server'

/**
 * Health Check Endpoint
 *
 * Used by Docker health checks, load balancers, and monitoring systems
 * to verify the application is running and responsive.
 *
 * GET /api/health
 *
 * Returns:
 * - 200 OK: Application is healthy
 * - 503 Service Unavailable: Application is not healthy
 */
export async function GET() {
  try {
    // Basic health check - server is responding
    // You can add additional checks here:
    // - Database connectivity
    // - External API availability
    // - Disk space
    // - Memory usage

    const healthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    }

    return NextResponse.json(healthStatus, { status: 200 })
  } catch (error) {
    console.error('Health check failed:', error)

    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    )
  }
}
