import type { Context } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

export default async (req: Request, context: Context) => {

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_KEY ?? ''

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase
    .from('Mashups')
    .select('*')

    if (error) throw error

    return Response.json(data)

  } catch (error) {
    console.error(error)
    return Response.json(error)
  }

}