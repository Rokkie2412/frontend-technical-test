import type { ReactElement } from "react";

import type { ErrorScreenProps } from "./ErrorState.types";

const ErrorScreen = ({
  onClick
}: ErrorScreenProps): ReactElement  => (
  <div className='flex flex-1 flex-col w-full h-full justify-center items-center bg-zinc-900 pb-8'>
    <p className='text-3xl font-bold'>Something Went Wrong</p>
    <p className='text-lg my-2'>Cannot reload movies detail, please try again later!</p>
    <button
      onClick={onClick}
      className='px-8 py-3 bg-gray-100 mt-4 rounded-lg cursor-pointer hover:bg-gray-300'
    >
      <p className='text-zinc-900'>Reload Page</p>
    </button>
  </div>
)

export default ErrorScreen