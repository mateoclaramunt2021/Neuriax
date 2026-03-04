import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// GET - List all clients with their CRM status
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Get contacts with their status
    let query = supabase
      .from('contact_forms')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(`nombre.ilike.%${search}%,email.ilike.%${search}%,telefono.ilike.%${search}%`);
    }

    const { data: contacts, count, error } = await query;

    if (error) throw error;

    // Get CRM statuses for these contacts
    const contactIds = contacts?.map(c => c.id) || [];
    const { data: statuses } = await supabase
      .from('client_status')
      .select('*')
      .in('contact_id', contactIds.length > 0 ? contactIds : [0]);

    // Merge contacts with statuses
    const statusMap = new Map(statuses?.map(s => [s.contact_id, s]) || []);
    const enrichedContacts = contacts?.map(c => ({
      ...c,
      crm: statusMap.get(c.id) || { status: 'nuevo', priority: 'normal', value: 0, source: 'web' },
    }));

    // Filter by CRM status if provided
    let filtered = enrichedContacts;
    if (status && status !== 'all') {
      filtered = enrichedContacts?.filter(c => c.crm.status === status);
    }

    return NextResponse.json({
      clients: filtered || [],
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('Clients API error:', error);
    return NextResponse.json({ error: 'Error cargando clientes' }, { status: 500 });
  }
}

// PUT - Update client CRM status
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { contactId, status, priority, value, source, notes } = await request.json();

    if (!contactId) {
      return NextResponse.json({ error: 'contactId requerido' }, { status: 400 });
    }

    // Upsert CRM status
    const { error: statusError } = await supabase
      .from('client_status')
      .upsert({
        contact_id: contactId,
        status: status || 'nuevo',
        priority: priority || 'normal',
        value: value || 0,
        source: source || 'web',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'contact_id' });

    if (statusError) {
      // If upsert fails (no unique constraint), try insert then update
      const { data: existing } = await supabase
        .from('client_status')
        .select('id')
        .eq('contact_id', contactId)
        .single();

      if (existing) {
        await supabase
          .from('client_status')
          .update({
            status: status || 'nuevo',
            priority: priority || 'normal',
            value: value || 0,
            source: source || 'web',
            updated_at: new Date().toISOString(),
          })
          .eq('contact_id', contactId);
      } else {
        await supabase
          .from('client_status')
          .insert({
            contact_id: contactId,
            status: status || 'nuevo',
            priority: priority || 'normal',
            value: value || 0,
            source: source || 'web',
          });
      }
    }

    // Add note if provided
    if (notes) {
      await supabase.from('client_notes').insert({
        contact_id: contactId,
        note: notes,
        author: 'Mateo',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update client error:', error);
    return NextResponse.json({ error: 'Error actualizando cliente' }, { status: 500 });
  }
}
