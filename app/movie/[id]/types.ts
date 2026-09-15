import type { CastMovieType, Setter } from "@/types"

export type ImageProfileProps = {
  profilePath: string,
  name: string
}

export type ButtonShowMoreProps = {
  mainCast: CastMovieType[] | undefined,
  limitMainCast: number, 
  setLimitMainCast: Setter<number>
}

export type ListMainCastingProps = {
  mainCast: CastMovieType[] | undefined
}
