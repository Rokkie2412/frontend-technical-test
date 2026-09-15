import type { Props } from './Spinner.types'

const Spinner = ({ width = 18, height = 18 }: Props) => (
  <div
    className={`inline-block h-${height} w-${width} animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
    role="status"
    style={{ width: `${width}px`, height: `${height}px` }}
  >
  </div>
)

export default Spinner