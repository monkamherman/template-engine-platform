import { NextResponse } from 'next/server';

/**
 * Health Check Endpoint
 * GET /api/health
 * 
 * Returns the health status of the application
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'nextjs-template',
    version: '1.0.0',
  });
}
