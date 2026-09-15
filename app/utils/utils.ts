export const getLinkListMovies = (selectedGenre: string, page: number): string => {
  const genreParam = selectedGenre ? `&with_genres=${selectedGenre}` : '';

  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genreParam}`;

  return url;
}
