import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';

// TODO: Replace these with your actual Supabase Project URL and Anon Key
// Find these at: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/settings/api
const supabaseUrl = 'https://xkekczmogajrozdlyiuj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZWtjem1vZ2Fqcm96ZGx5aXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NDg0NzIsImV4cCI6MjA5MjQyNDQ3Mn0.gk-WMK07COyxcooaKoewbFMQxgMKygDP76q7SzQPF70';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
