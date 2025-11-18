// Simple authentication for admin panel
// In production, use a proper auth solution like NextAuth.js

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createSession(): string {
  // Simple session token (in production, use JWT or proper session management)
  return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
}

export function verifySession(sessionToken: string): boolean {
  // Simple session verification (in production, use proper session validation)
  try {
    const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8');
    const [timestamp] = decoded.split('-');
    const sessionAge = Date.now() - parseInt(timestamp);
    // Session valid for 24 hours
    return sessionAge < 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

