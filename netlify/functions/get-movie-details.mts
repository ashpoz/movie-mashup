import type { Context } from '@netlify/functions'

export default async (req: Request, context: Context) => {
  const tmdbIdParam = new URL(req.url).searchParams.get('tmdb_id');
  const tmdbId = tmdbIdParam ? tmdbIdParam : '';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  };

  const getMovieDetails = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}`, options);

  try {
    const data = await getMovieDetails.json();
    return Response.json(data);
  } catch (err) {
    Response.json(JSON.stringify(err));
  }
}

