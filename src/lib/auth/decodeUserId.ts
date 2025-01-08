import { jwtDecode } from "jwt-decode";

/**
 * Decodes a JWT token and returns its payload.
 * @param token - The JWT token to decode.
 * @returns Decoded token payload or null if invalid.
 */
export function decodeToken(token: string): Record<string, any> | null {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
