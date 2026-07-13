import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { createPostSchema } from '@/lib/validations';
import { logRequest } from '@/lib/morgan';

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts
 *     description: Retrieve posts with optional filters
 *     parameters:
 *       - in: query
 *         name: published
 *         schema:
 *           type: boolean
 *         description: Filter by publication status
 *       - in: query
 *         name: authorId
 *         schema:
 *           type: string
 *         description: Filter by author ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const authorId = searchParams.get('authorId');

    const where: any = {};
    
    if (published !== null) {
      where.published = published === 'true';
    }
    
    if (authorId) {
      where.authorId = authorId;
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const response = NextResponse.json(successResponse(posts));
    logRequest(request, 200, Date.now() - startTime);
    return response;
  } catch (error) {
    logRequest(request, 500, Date.now() - startTime);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new post
 *     description: Create a new post with title and content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - authorId
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               content:
 *                 type: string
 *                 example: This is the content of my first post
 *               published:
 *                 type: boolean
 *                 default: false
 *               authorId:
 *                 type: string
 *                 example: cm3abc123def
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = createPostSchema.parse(body);

    // Check if author exists
    const author = await prisma.user.findUnique({
      where: { id: body.authorId },
    });

    if (!author) {
      logRequest(request, 404, Date.now() - startTime);
      return NextResponse.json(
        errorResponse('Author not found'),
        { status: 404 }
      );
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        ...validatedData,
        authorId: body.authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    const response = NextResponse.json(successResponse(post, 'Post created successfully'), {
      status: 201,
    });
    logRequest(request, 201, Date.now() - startTime);
    return response;
  } catch (error) {
    logRequest(request, 400, Date.now() - startTime);
    return NextResponse.json(handleApiError(error), { status: 400 });
  }
}
