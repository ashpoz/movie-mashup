export async function getMovieDetails(id) {
  const response = await fetch(`./.netlify/functions/get-movie-details?tmdb_id=${id}`);
  const data = await response.json();

  if (data.success === false) {
    return null
  } else {
    return data
  }
}