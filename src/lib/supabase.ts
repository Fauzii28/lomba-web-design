import { createClient } from '@supabase/supabase-js';

// Ambil kunci dari file .env yang Master buat tadi
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validasi biar Master gak bingung kalau kuncinya lupa dipasang
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Woi King! Kunci Supabase di file .env belum diisi atau salah nama variabelnya!");
}

// Inilah pesawat telepon yang bakal kita pakai buat kirim data
export const supabase = createClient(supabaseUrl, supabaseAnonKey);