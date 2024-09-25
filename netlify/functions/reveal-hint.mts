import type { Context } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
import { getMovieYear } from './get-movie-year.mts';
import { getMovieCredits } from './get-movie-credits.mts';

export default async (req: Request, context: Context) => {
  const supabaseUrl = process.env.SUPABASE_URL ?? ''
  const supabaseKey = process.env.SUPABASE_KEY ?? ''

  const mashupParam = new URL(req.url).searchParams.get('mashup');
  const mashupId = mashupParam ? mashupParam : null;
  const hintParam = new URL(req.url).searchParams.get('hint');
  const hintId = hintParam ? Number(hintParam) : 0;


  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    if (hintId === 3) {
      let {data: mashupData, error: mashupError} = await supabase
      .from('Mashups')
      .select()
      .eq('id', mashupId)

      if (mashupError) throw new Error(mashupError.message)
      if (!mashupData) throw new Error('Data is empty')

      const json = { shared_word: mashupData[0].shared_word }

      return Response.json(json)
    }


    let { data: movieMashupRef, error: movieMashupRefError } = await supabase
    .from('Movie Mashups')
    .select()
    .eq('mashup_id', mashupId)
    .order('id', { ascending: true })

    if (movieMashupRefError) throw new Error(movieMashupRefError.message)
    if (!movieMashupRef) throw new Error('No mashups found')

    const movieIds = movieMashupRef.map(item => item.movie_id)

    let {data: movieData, error: movieError} = await supabase
    .from('Movies')
    .select()
    .in('id', movieIds)
    
    if (movieError) throw new Error(movieError.message)
    if (!movieMashupRef || !movieData) throw new Error('Data is empty')

    movieData.sort((a, b) => movieIds.indexOf(a.id) - movieIds.indexOf(b.id))

    const movieTmdbIds = movieData.map(movie => movie.tmdb_id).filter(id => id)

    if (hintId === 1) {
      const getTmdbYears = await Promise.all(movieTmdbIds.map(async (id) => await getMovieYear(id)))
  
      // add TMDB years if they exist
      return Response.json(getTmdbYears)
    }

    if (hintId === 2) {
      const getTmdbCredits = await Promise.all(movieTmdbIds.map(async (id) => await getMovieCredits(id)))
  
      // add TMDB years if they exist
      return Response.json(getTmdbCredits)
    }
    

  } catch (err) {
    return Response.json(err);
  }
}
