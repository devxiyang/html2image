import type { BaseFetchOptions } from './utils/fetch'
import { baseFetch } from './utils/fetch'
import { consoleWarn } from './utils/utils'

// eslint-disable-next-line
const worker = self as unknown as Worker

worker.onmessage = async (event) => {
  const options = event.data as BaseFetchOptions & { rawUrl: string }
  const url = options.rawUrl || options.url

  try {
    const result = await baseFetch(options)
    worker.postMessage({ url, result })
  }
  catch (error) {
    consoleWarn(error)
    worker.postMessage({ url })
  }
}
