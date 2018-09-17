import { PuppeteerClient, Trace } from './types'

const stopTracing = (client: PuppeteerClient): Promise<Trace> => {
  const readTrace = async (handle: any) => {
    const buffer = []
    let eof = false

    while (!eof) {
      const response = await client.send('IO.read', { handle })

      buffer.push(response.data)
      eof = response.eof
    }

    await client.send('IO.close', { handle })
    return JSON.parse(buffer.join(''))
  }

  return new Promise(resolve => {
    client.once('Tracing.tracingComplete', event => {
      readTrace(event.stream).then(resolve)
    })
    client.send('Tracing.end', {})
  })
}

export default stopTracing
