'use client'

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { axiosFetcher } from './libs/axios'
import { MovieList } from './components'

export default function Home() {
  const linkGetMovies = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
  const { isPending, error, data } = useQuery({
    queryKey: ['getMovieList'],
    queryFn: () => axiosFetcher(linkGetMovies)
  })

  console.log('data', data)
  
  return (
    <main className="flex flex-col bg-[#212121] w-full h-full">
      <p>asd</p>
      <div className="flex w-full h-full">
        {data && <MovieList movieData={data.results} />}
      </div>

    </main>
  );
}
