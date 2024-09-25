export async function getMovieCredits(tmdbId) {
  if (tmdbId) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    };
  
    const getMovieCredits = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/credits`, options);
    const json = await getMovieCredits.json()
    const cast = json.cast.slice(0, 2).map(item => item.name)
    const directorArr = json.crew.filter(item => item.job === 'Director')
    const directors = directorArr.map(director => director.name)

    return { cast, directors }
  }
}

