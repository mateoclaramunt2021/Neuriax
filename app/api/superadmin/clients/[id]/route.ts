import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// GET - Get client details + notes + events
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabase();
    const contactId = parseInt(id);

    // Get contact info
    const { data: contact } = await supabase
      .from('contact_forms')
      .select('*')
      .eq('id', contactId)
      .single();

    if (!contact) {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }

    // Get CRM status
    const { data: crmStatus } = await supabase
      .from('client_status')
      .select('*')
      .eq('contact_id', contactId)
      .single();

    // Get notes
    const { data: notes } = await supabase
      .from('client_notes')
      .select('*')
      .eq('contact_id', contactId)
      .order('created_at', { ascending: false });

    // Get emails sent to this contact
    const { data: emails } = await supabase
      .from('email_log')
      .select('*')
      .eq('recipient_email', contact.email)
      .order('created_at', { ascending: false })
      .limit(20);

    // Get visitor events if we can match by email
    const { data: visitor } = await supabase
      .from('visitors')
      .select('id')
      .eq('email', contact.email)
      .single();

    let events: any[] = [];
    if (visitor) {
      const { data: visitorEvents } = await supabase
        .from('visitor_events')
        .select('*')
        .eq('visitor_id', visitor.id)
        .order('timestamp', { ascending: false })
        .limit(50);
      events = visitorEvents || [];
    }

    return NextResponse.json({
      contact,
      crm: crmStatus || { status: 'nuevo', priority: 'normal', value: 0 },
      notes: notes || [],
      emails: emails || [],
      events,
    });
  } catch (error) {
    console.error('Client detail error:', error);
    return NextResponse.json({ error: 'Error cargando cliente' }, { status: 500 });
  }
}

// POST - Add note to client
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabase();
    const { note } = await request.json();

    if (!note) {
      return NextResponse.json({ error: 'Nota requerida' }, { status: 400 });
    }

    const { error } = await supabase.from('client_notes').insert({
      contact_id: parseInt(id),
      note,
      author: 'Mateo',
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Add note error:', error);
    return NextResponse.json({ error: 'Error añadiendo nota' }, { status: 500 });
  }
}
