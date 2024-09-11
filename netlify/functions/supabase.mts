import type { Context } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

export default async (req: Request, context: Context) => {

const supabaseUrl = 'https://pjtgargnrnyssfnxbeep.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqdGdhcmducm55c3NmbnhiZWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMTczOTcsImV4cCI6MjA0MTU5MzM5N30.wNQyzaaHfRACkjsHg96Hw2gbQ7-yv1iDZnH5ZeLlEPU'
const supabase = createClient(supabaseUrl, supabaseKey)

const { data, error } = await supabase
.from('movies')
.select('id')

return Response.json(data);
}