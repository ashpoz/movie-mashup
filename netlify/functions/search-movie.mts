import type { Context } from '@netlify/functions'

interface MovieResult {
  id: String; 
  title: String; 
  release_date: String; 
  poster_path: String;
}

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

  const searchMovie = await fetch(`https://api.themoviedb.org/3/search/movie?query=${decodeURIComponent(query)}&include_adult=false&language=en-US&page=1&region="US"`, options);

  try {
    const data = searchMovie.json();
    const response = await data;
    const results = await response.results;
    const movies = results.map((item: MovieResult) => (
      { id: item.id, title: item.title, release_date: item.release_date, poster_path: item.poster_path }
    ))

    const removeDuplicateTitles = (array: Array<MovieResult>) => {
      return array.filter((value, index, self) =>
        index === self.findIndex((item) => (
          item.title === value.title
        ))
      )
    }

    return Response.json(removeDuplicateTitles(movies));
  } catch (err) {
    Response.json(JSON.stringify(err));
  }
}

