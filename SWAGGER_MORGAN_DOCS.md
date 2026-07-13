# Swagger & Morgan Integration Guide

## Overview

This Next.js fullstack template now includes:
- **Swagger UI** - Interactive API documentation
- **Morgan** - HTTP request logging middleware

## 📚 Swagger API Documentation

### Accessing Swagger UI

Once your development server is running, access the interactive API documentation at:

```
http://localhost:3000/api-docs
```

### Features

- **Interactive Testing**: Test API endpoints directly from the browser
- **Request/Response Examples**: See sample requests and responses
- **Schema Definitions**: View data models and validation requirements
- **Authentication**: Test protected endpoints (when auth is added)

### Configuration

Swagger is configured in `/lib/swagger.ts`:

```typescript
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js Fullstack Template API',
      version: '1.0.0',
      description: 'API documentation for Next.js Fullstack Template',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./app/api/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
```

### Adding Swagger Documentation to Routes

Add JSDoc comments with Swagger annotations to your API routes:

```typescript
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
export async function GET(request: NextRequest) {
  // Your implementation
}
```

### Available Endpoints

#### Users API
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user by ID
- `DELETE /api/users/{id}` - Delete user by ID

#### Posts API
- `GET /api/posts` - Get all posts (with optional filters)
- `POST /api/posts` - Create a new post

## 📊 Morgan HTTP Request Logging

### Features

- **Colored Output**: Different colors for different HTTP status codes
- **Response Times**: Track how long each request takes
- **Smart Filtering**: Skips logging for static files and Next.js internals
- **Environment-Aware**: Different log formats for development and production

### Log Format

Development mode shows colored, concise logs:
```
[2025-10-19T12:34:56.789Z] GET /api/users 200 45ms
[2025-10-19T12:34:57.123Z] POST /api/users 201 123ms
[2025-10-19T12:34:58.456Z] GET /api/users/invalid-id 404 12ms
```

Status code colors:
- 🟢 **Green** (2xx): Success
- 🔵 **Cyan** (3xx): Redirection
- 🟡 **Yellow** (4xx): Client error
- 🔴 **Red** (5xx): Server error

### Configuration

Morgan is configured in `/lib/morgan.ts`:

```typescript
import morgan from 'morgan';

export const morganFormat = process.env.NODE_ENV === 'production'
  ? 'combined'  // Apache combined log format
  : 'dev';      // Colored concise output

export const morganLogger = morgan(morganFormat, {
  skip: (req: any) => {
    const url = req.url || '';
    return (
      url.startsWith('/_next') ||
      url.startsWith('/static') ||
      url.startsWith('/favicon.ico')
    );
  },
});
```

### Using Morgan in API Routes

Import and use the `logRequest` helper:

```typescript
import { logRequest } from '@/lib/morgan';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Your logic here
    const data = await fetchData();
    
    const response = NextResponse.json(successResponse(data));
    logRequest(request, 200, Date.now() - startTime);
    return response;
  } catch (error) {
    logRequest(request, 500, Date.now() - startTime);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}
```

### Custom Logging

For custom log messages:

```typescript
import { logRequest } from '@/lib/morgan';

// Log with status and response time
logRequest(request, 200, 45);

// Log without response time
logRequest(request, 404);
```

## 🔧 Environment Configuration

Add these optional environment variables to your `.env` file:

```bash
# Logging
NODE_ENV=development          # 'development' or 'production'
LOG_LEVEL=info               # Optional: log level (info, warn, error)

# API Documentation
API_DOCS_ENABLED=true        # Enable/disable Swagger UI
```

## 🚀 Best Practices

### Swagger Documentation

1. **Always document new endpoints**: Add Swagger annotations when creating new API routes
2. **Include examples**: Provide request/response examples for better understanding
3. **Document error responses**: Show all possible error scenarios
4. **Use schema references**: Reference shared schemas for consistency

### Request Logging

1. **Log all API requests**: Use `logRequest` in every API route handler
2. **Include response times**: Always measure and log execution time
3. **Log at appropriate levels**: Use different status codes for different scenarios
4. **Don't log sensitive data**: Be careful with request bodies containing passwords or tokens

## 📦 Installed Packages

```json
{
  "dependencies": {
    "swagger-ui-react": "^5.29.5",
    "swagger-jsdoc": "^6.2.8",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "@types/swagger-ui-react": "^4.18.3",
    "@types/swagger-jsdoc": "^6.0.4",
    "@types/morgan": "^1.9.9"
  }
}
```

## 🔍 Troubleshooting

### Swagger UI not loading

1. Check if the dev server is running
2. Verify `/app/api-docs/page.tsx` exists
3. Check browser console for errors
4. Ensure `swagger-ui-react` CSS is imported

### Morgan not logging

1. Verify `logRequest` is called in your route handlers
2. Check if the request URL is being filtered (static files)
3. Ensure proper error handling in your routes

### Build errors

If you encounter build errors:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## 📚 Additional Resources

- [Swagger OpenAPI Specification](https://swagger.io/specification/)
- [swagger-jsdoc Documentation](https://github.com/Surnet/swagger-jsdoc)
- [Morgan Documentation](https://github.com/expressjs/morgan)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 🎯 Next Steps

1. Visit http://localhost:3000/api-docs to explore the API documentation
2. Test the endpoints using the interactive Swagger UI
3. Monitor request logs in your terminal
4. Add documentation to any custom API routes you create
5. Consider adding authentication and documenting protected endpoints

---

**Note**: In production, consider restricting access to `/api-docs` using middleware or environment-based conditional rendering.
