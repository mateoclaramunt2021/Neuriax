import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Validar variables de entorno
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('[Supabase] Missing environment variables. Tracking will be disabled.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface Visitor {
  id: number
  email: string
  nombre: string | null
  telefono: string | null
  created_at: string
}

export interface VisitorEvent {
  id: number
  visitor_id: number
  pagina: string
  evento_tipo: 'page_view' | 'time_spent' | 'button_click' | 'form_submit'
  datos_adicionales: Record<string, any> | null
  timestamp: string
}

export interface LeadMagnet {
  id: number
  email: string
  source: string
  created_at: string
  updated_at: string
}
