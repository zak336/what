// File validation utilities

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Only JPG, PNG, and PDF files are allowed.",
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: "File size exceeds 10MB limit.",
    };
  }

  return { valid: true };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}
