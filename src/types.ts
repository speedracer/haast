import { Metrics, TraceEvent } from 'speedmetrics/types'

interface PuppeteerClientEvent {
  stream: any
}

interface PuppeteerClientResponse {
  data: any
  eof: boolean
}

export interface PuppeteerClient {
  send(command: string, options: Object): PuppeteerClientResponse
  once(event: string, callback: (event: PuppeteerClientEvent) => void): void
}

export interface Trace {
  traceEvents: TraceEvent[]
}

export { Metrics }
