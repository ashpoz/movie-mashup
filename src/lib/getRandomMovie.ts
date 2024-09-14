export async function getRandomMovie() {
  const response = await fetch('./.netlify/functions/get-movie-mashup');
  const data = await response.json();
  return data[0]
}

