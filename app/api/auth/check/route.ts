import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    // Verify token (use your JWT secret)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return NextResponse.json({ isAuthenticated: true, user: decoded });
  } catch {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}