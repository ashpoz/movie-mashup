import type { Context } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

export default async (req: Request, context: Context) => {

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_KEY ?? ''

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    let { data: movieMashupRef, error: movieMashupRefError } = await supabase
    .from('Movie Mashups')
    .select()

    if (movieMashupRefError) throw new Error(movieMashupRefError.message)
    if (!movieMashupRef) throw new Error('No mashups found')

    // grab random index from ref array
    const randomIndex = Math.floor(Math.random() * (movieMashupRef.length - 1));
    // store random mashup id
    const randomMashupId = movieMashupRef[randomIndex].mashup_id
    // get both ref items with matching mashup ids
    const mashupIds = movieMashupRef.filter(item => item.mashup_id === randomMashupId)

    // get mashup data
    let {data: mashupData, error: mashupError} = await supabase
      .from('Mashups')
      .select()
      .eq('id', mashupIds[0].mashup_id)

    if (mashupError) throw new Error(mashupError.message)

    // get movies data
    let {data: movieData, error: movieError} = await supabase
    .from('Movies')
    .select()
    .in('id', mashupIds.map(item => item.movie_id))
    .order('id', { ascending: true })

    if (movieError) throw new Error(movieError.message)

    if (!mashupData || !movieData) throw new Error('Data is empty')

    const json = [
      {
        id: mashupData[0].id,
        synopsis: mashupData[0].synopsis,
        movies: [
          movieData[0].id,
          movieData[1].id
        ]
      }
    ]

    return Response.json(json)

  } catch (error) {
    console.error(error)
    return Response.json(error)
  }

}