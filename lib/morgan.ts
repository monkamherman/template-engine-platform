import morgan from 'morgan';
import { NextRequest } from 'next/server';

// Custom morgan token for Next.js requests
morgan.token('url', (req: any) => req.url);
morgan.token('method', (req: any) => req.method);
morgan.token('status', (_req: any, res: any) => res.statusCode?.toString() || '');
morgan.token('content-length', (_req: any, res: any) => res.getHeader('content-length')?.toString() || '-');
morgan.token('response-time', (_req: any, res: any) => res.responseTime?.toString() || '-');

// Custom format for development
export const morganFormat = process.env.NODE_ENV === 'production'
  ? 'combined' // Apache combined log format for production
  : 'dev'; // Colored concise output for development

// Morgan logger instance
export const morganLogger = morgan(morganFormat, {
  skip: (req: any) => {
    // Skip logging for static files and Next.js internals
    const url = req.url || '';
    return (
      url.startsWith('/_next') ||
      url.startsWith('/static') ||
      url.startsWith('/favicon.ico') ||
      url.startsWith('/__nextjs')
    );
  },
});

// Middleware adapter for Next.js API routes
export function createMorganMiddleware(handler: Function) {
  return async (req: NextRequest, context: any) => {
    const startTime = Date.now();

    // Convert NextRequest to a format morgan can work with
    const mockReq = {
      method: req.method,
      url: req.url,
      headers: Object.fromEntries(req.headers.entries()),
    };

    // Execute the handler
    const response = await handler(req, context);

    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Log the request
    console.log(
      `${req.method} ${new URL(req.url).pathname} ${response?.status || 200} - ${responseTime}ms`
    );

    return response;
  };
}

// Simple logging function for API routes
export function logRequest(req: NextRequest, statusCode: number, responseTime?: number) {
  const method = req.method;
  const url = new URL(req.url).pathname;
  const status = statusCode;
  const time = responseTime ? `${responseTime}ms` : '-';
  
  const timestamp = new Date().toISOString();
  const coloredStatus = status >= 500 ? `\x1b[31m${status}\x1b[0m` : 
                        status >= 400 ? `\x1b[33m${status}\x1b[0m` : 
                        status >= 300 ? `\x1b[36m${status}\x1b[0m` : 
                        `\x1b[32m${status}\x1b[0m`;
  
  console.log(`[${timestamp}] ${method} ${url} ${coloredStatus} ${time}`);
}
