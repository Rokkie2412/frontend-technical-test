export const getLinkListMovies = (category: string, page: number): string => {
  let url = ''

  if (category === 'now_playing') {
    url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
  } else if (category === 'popular') {
    url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  } else if (category === 'top_rated') {
    url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
  } else if (category === 'upcoming') {
    url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
  } else {
    url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}`
  }
  

  console.log('url', url)

  return url;
}
