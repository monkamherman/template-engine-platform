import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js Fullstack Template API',
      version: '1.0.0',
      description: 'API documentation for Next.js Fullstack Template with Prisma ORM',
      contact: {
        name: 'SnowDev',
        email: 'dimitri.tedom@student.worketyamo.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://your-production-url.com',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'name'],
          properties: {
            id: {
              type: 'string',
              description: 'User ID',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        Post: {
          type: 'object',
          required: ['title', 'content', 'authorId'],
          properties: {
            id: {
              type: 'string',
              description: 'Post ID',
            },
            title: {
              type: 'string',
              description: 'Post title',
            },
            content: {
              type: 'string',
              description: 'Post content',
            },
            published: {
              type: 'boolean',
              description: 'Publication status',
              default: false,
            },
            authorId: {
              type: 'string',
              description: 'Author user ID',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Posts',
        description: 'Post management endpoints',
      },
    ],
  },
  apis: ['./app/api/**/*.ts'], // Path to API routes
};

export const swaggerSpec = swaggerJsdoc(options);
