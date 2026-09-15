import type { ReactElement } from "react";

import Spinner from "../Spinner";

import type { Props } from "./LoadingState.types";

const LoadingState = ({
  loadingText
}: Props): ReactElement => (
  <div className='flex flex-1 flex-col w-full h-full justify-center items-center bg-zinc-900'>
    <Spinner width={48} height={48}/>
    <p className='text-gray-500 font-bold mt-4'>{loadingText}</p>
  </div>
)

export default LoadingState
