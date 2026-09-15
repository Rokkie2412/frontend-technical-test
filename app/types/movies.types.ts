export type MovieDataType = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;     
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  video: boolean;
  adult: boolean;
  original_language: string;
  softcore?: boolean;
}

export type ApiMovieResponseType = {
  page: number;
  results: MovieDataType[];
  total_pages: number;
  total_results: number;
}
