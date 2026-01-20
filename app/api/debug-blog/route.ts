import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { error: 'Este endpoint no está disponible' },
    { status: 404 }
  );
}
