export type CastMovieType = {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: string,
  order: number
}

export type CrewMovieType = {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  credit_id: string,
  department: string,
  job: string
}

type CreditsMovie = {
  cast: CastMovieType[],
  crew: CrewMovieType[]
}

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
  tagline: string,
  softcore?: boolean;
  credits?: CreditsMovie
}

export type ApiMovieResponseType = {
  page: number;
  results: MovieDataType[];
  total_pages: number;
  total_results: number;
}

export type MovieListCategoryFilter = { 
  label: string;
  value: string;
}