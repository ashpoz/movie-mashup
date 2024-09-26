import type { Context } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
import { getMovieDetails } from './get-movie-details.mts';

export default async (req: Request, context: Context) => {
  const supabaseUrl = process.env.SUPABASE_URL ?? ''
  const supabaseKey = process.env.SUPABASE_KEY ?? ''

  const mashupParam = new URL(req.url).searchParams.get('mashup');
  const mashupId = mashupParam ? mashupParam : null;

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    let { data: movieMashupRef, error: movieMashupRefError } = await supabase
    .from('Movie Mashups')
    .select()
    .eq('mashup_id', mashupId)
    .order('id', { ascending: true })

    if (movieMashupRefError) throw new Error(movieMashupRefError.message)
    if (!movieMashupRef) throw new Error('No mashups found')

    // get mashup data
    let {data: mashupData, error: mashupError} = await supabase
    .from('Mashups')
    .select()
    .eq('id', mashupId)

    if (mashupError) throw new Error(mashupError.message)
    if (!mashupData) throw new Error('Mashup is empty')

    const movieIds = movieMashupRef.map(item => item.movie_id)

    let {data: movieData, error: movieError} = await supabase
    .from('Movies')
    .select()
    .in('id', movieIds)
    
    if (movieError) throw new Error(movieError.message)
    if (!movieMashupRef || !movieData) throw new Error('Data is empty')

    movieData.sort((a, b) => movieIds.indexOf(a.id) - movieIds.indexOf(b.id))

    const movieTmdbIds = movieData.map(movie => movie.tmdb_id).filter(id => id)
    const getTmdbDetails = await Promise.all(movieTmdbIds.map(async (id) => await getMovieDetails(id)))

    const movieJson = {
      correct: true, 
      message: 'You got it!',
      answers: [true, true],
      mashup: mashupData[0],
      movies: [
        movieData[0],
        movieData[1],
      ],
    }
    // add TMDB details if they exist
    movieJson['movies'][0]['details'] = getTmdbDetails[0] ?? null
    movieJson['movies'][1]['details'] = getTmdbDetails[1] ?? null

    return Response.json(movieJson)

  } catch (err) {
    return Response.json(err);
  }
}
