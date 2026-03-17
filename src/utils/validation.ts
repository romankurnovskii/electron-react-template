// src/utils/validation.ts
// Validation utilities

/**
 * Validate an email address
 * @param email - Email to validate
 * @returns True if valid email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate a password
 * @param password - Password to validate
 * @param minLength - Minimum length (default: 8)
 * @returns Validation result
 */
export function validatePassword(
  password: string,
  minLength: number = 8
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate a URL
 * @param url - URL to validate
 * @returns True if valid URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate required field
 * @param value - Value to check
 * @returns True if not empty
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate minimum length
 * @param value - Value to check
 * @param min - Minimum length
 * @returns True if meets minimum
 */
export function validateMinLength(value: string, min: number): boolean {
  return value.length >= min;
}

/**
 * Validate maximum length
 * @param value - Value to check
 * @param max - Maximum length
 * @returns True if meets maximum
 */
export function validateMaxLength(value: string, max: number): boolean {
  return value.length <= max;
}
