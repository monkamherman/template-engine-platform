/**
 * API Response utility types and functions
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Create a successful API response
 */
export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

/**
 * Create an error API response
 */
export function errorResponse(error: string, message?: string): ApiResponse {
  return {
    success: false,
    error,
    message,
  };
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: unknown): ApiResponse {
  if (error instanceof Error) {
    return errorResponse(error.message);
  }
  return errorResponse('An unknown error occurred');
}
