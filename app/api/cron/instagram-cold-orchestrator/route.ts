import { NextRequest, NextResponse } from 'next/server';

// ─── Orchestrator: Runs all cold outreach tasks in sequence ───
// This single cron handles:
//   1. Prospecting (discover new leads via hashtags)
//   2. Cold outreach (send first DMs to new leads)
//   3. Follow-up (re-contact after 48h if no response)

export async function GET(request: NextRequest) {
  const baseUrl = request.nextUrl.origin;
  const results: Record<string, unknown> = {};

  try {
    // Step 1: Prospecting — discover new leads
    try {
      const res = await fetch(`${baseUrl}/api/cron/instagram-prospecting`, {
        method: 'GET',
        headers: { 'x-internal': 'true' },
      });
      results.prospecting = await res.json();
    } catch (error) {
      results.prospecting = { error: String(error) };
    }

    // Small delay between steps
    await new Promise(r => setTimeout(r, 2000));

    // Step 2: Cold outreach — send DMs to new leads
    try {
      const res = await fetch(`${baseUrl}/api/cron/instagram-cold-outreach`, {
        method: 'GET',
        headers: { 'x-internal': 'true' },
      });
      results.coldOutreach = await res.json();
    } catch (error) {
      results.coldOutreach = { error: String(error) };
    }

    // Small delay
    await new Promise(r => setTimeout(r, 2000));

    // Step 3: Follow-up — re-contact non-responders
    try {
      const res = await fetch(`${baseUrl}/api/cron/instagram-followup`, {
        method: 'GET',
        headers: { 'x-internal': 'true' },
      });
      results.followup = await res.json();
    } catch (error) {
      results.followup = { error: String(error) };
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (error) {
    console.error('Cold outreach orchestrator error:', error);
    return NextResponse.json({
      error: 'Orchestrator failed',
      results,
    }, { status: 500 });
  }
}
