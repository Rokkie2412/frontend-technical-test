export const getLinkMoviesCategory = (category: string, page: number): string => {
  let url = ''

  if (category === 'now_playing') {
    url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
  } else if (category === 'popular') {
    url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  } else if (category === 'top_rated') {
    url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
  } else if (category === 'upcoming') {
    url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
  }
  

  console.log('url', url)

  return url;
}

export const getLinkQuery = (search: string, category: string, page: number) => {
  if (search) {
    return `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=${page}`
  }

  if(category) {
    getLinkMoviesCategory(category, page)
  }

  return `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`
}
