import type { Context } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

export default async (req: Request, context: Context) => {

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_KEY ?? ''

const mashupParam = new URL(req.url).searchParams.get('mashup');
const mashupId = mashupParam ? mashupParam : null;

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    // get mashup data
    let {data: mashupData, error: mashupError} = await supabase
      .from('Mashups')
      .select()
      .eq('id', mashupId)

    if (mashupError) throw new Error(mashupError.message)
    if (!mashupData) throw new Error('Data is empty')

    const json = { shared_word: mashupData[0].shared_word }

    return Response.json(json)
  } catch (error) {
    console.error(error)
    return Response.json(error)
  }
}