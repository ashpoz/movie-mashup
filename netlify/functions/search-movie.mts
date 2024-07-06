import type { Context } from '@netlify/functions'

export default async (req: Request, context: Context) => {
  const queryParam = new URL(req.url).searchParams.get('query');
  const query = queryParam ? queryParam : '';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  };

  const searchMovie = fetch(`https://api.themoviedb.org/3/search/movie?query=${decodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, options);

  try {
    const data = (await searchMovie).json();
    const response = await data;
    const results = await response.results;
    const movies = results.map((item: { id: String; title: String; release_date: String; }) => (
      { id: item.id, title: item.title, release_date: item.release_date }
    ))
    return Response.json(movies);
  } catch (err) {
    Response.json(JSON.stringify(err));
  }
}

