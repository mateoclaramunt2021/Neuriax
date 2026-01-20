import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Este servicio no está disponible. El blog ha sido eliminado.'
  });
}
