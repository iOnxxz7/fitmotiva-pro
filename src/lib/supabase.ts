import { createClient } from '@supabase/supabase-js'

export interface User {
  id: string
  email: string
  name: string
  phone: string
  plan: 'basic' | 'premium' | 'elite'
  subscription_status: 'active' | 'trial' | 'cancelled'
  referral_code: string
  referral_count: number
  points: number
  level: 'bronze' | 'silver' | 'gold' | 'diamond'
  created_at: string
  updated_at: string
}

// Configuração segura do Supabase com fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Criar cliente apenas se as variáveis estiverem configuradas
export const supabase = (supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key') 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper para verificar se Supabase está configurado
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'
}