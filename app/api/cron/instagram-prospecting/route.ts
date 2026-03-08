import { NextResponse } from 'next/server';

// ═══════════════════════════════════════════════════════════════════
//  SISTEMA DE PROSPECCIÓN — Stub
//  Los leads se añaden manualmente desde el dashboard.
//  El cron de cold-outreach envía DMs a leads con status='new'.
//  Este endpoint se mantiene para que el orchestrator no falle.
// ═══════════════════════════════════════════════════════════════════

export async function GET() {
  return NextResponse.json({
    success: true,
    mode: 'manual',
    message: 'Leads se añaden manualmente desde el panel de superadmin. El cron de cold-outreach les contactará automáticamente.',
    timestamp: new Date().toISOString(),
  });
}
