import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';
import { createUserSchema } from '@/lib/validations';
import { logRequest } from '@/lib/morgan';

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of all users with their profiles and post counts
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
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
        _count: {
          select: { posts: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const response = NextResponse.json(successResponse(users));
    logRequest(request, 200, Date.now() - startTime);
    return response;
  } catch (error) {
    logRequest(request, 500, Date.now() - startTime);
    return NextResponse.json(handleApiError(error), { status: 500 });
  }
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Create a new user with email and name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User created successfully
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
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - validation error or user already exists
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
    const validatedData = createUserSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      logRequest(request, 400, Date.now() - startTime);
      return NextResponse.json(
        errorResponse('User with this email already exists'),
        { status: 400 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: validatedData,
      include: {
        profile: true,
      },
    });

    const response = NextResponse.json(successResponse(user, 'User created successfully'), {
      status: 201,
    });
    logRequest(request, 201, Date.now() - startTime);
    return response;
  } catch (error) {
    logRequest(request, 400, Date.now() - startTime);
    return NextResponse.json(handleApiError(error), { status: 400 });
  }
}
