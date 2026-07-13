/**
 * Validation utilities using Zod
 */

import { z } from 'zod';

/**
 * Common validation schemas
 */
export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must not exceed 50 characters');

/**
 * User validation schemas
 */
export const createUserSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
});

export const updateUserSchema = z.object({
  email: emailSchema.optional(),
  name: nameSchema.optional(),
});

/**
 * Post validation schemas
 */
export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().optional(),
  published: z.boolean().optional().default(false),
});

export const updatePostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

/**
 * Type inference helpers
 */
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
