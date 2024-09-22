export const getPosterData = (data, tmdbPath = 'https://www.themoviedb.org/t/p/w1280') => {
  return {
    'url': data.details ? tmdbPath + data.details.poster_path : data.image_url, 
    'alt': data.image_alt ? data.image_alt : `${data.title} movie poster`
  }
}