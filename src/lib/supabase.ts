import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key. Please add them to your environment variables.');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
