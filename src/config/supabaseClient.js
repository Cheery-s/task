// config/supabase.js
import { createClient } from '@supabase/supabase-js'

 const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL
 const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY

 if (!SUPABASE_URL||!SUPABASE_ANON_KEY){
    console.error('Missing Supabase environment variables')
 }
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

//    const SUPABASE_URL = 'https://glzukmcfgcfedylhlbvz.supabase.co'
//    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsenVrbWNmZ2NmZWR5bGhsYnZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMDc2NzksImV4cCI6MjA1NTU4MzY3OX0.wkXfi8ft9TOAh5T5wLsu8x4L5XQrXRfnr3EWvbg85Z8'