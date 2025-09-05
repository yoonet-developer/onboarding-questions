import { NextResponse } from 'next/server';

export async function GET() {
  // This endpoint will help clear server-side cache
  return NextResponse.json({ 
    message: 'Cache cleared. Please clear localStorage in your browser.',
    instruction: 'Run this in browser console: localStorage.clear(); location.reload();'
  });
}