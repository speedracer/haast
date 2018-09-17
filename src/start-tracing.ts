import { PuppeteerClient } from './types'

const disabledByDefault = (category: string) => `disabled-by-default-${category}`

const categories = [
  '-*',
  'toplevel',
  'loading',
  'v8.execute',
  'devtools.timeline',
  'devtools.timeline.async',
  disabledByDefault('devtools.timeline.stack'),
  disabledByDefault('devtools.timeline'),
  disabledByDefault('devtools.timeline.frame'),
  'navigation',
  'blink.console',
  'blink.user_timing',
  disabledByDefault('v8.runtime_stats_sampling'),
  disabledByDefault('v8.cpu_profiler'),
  disabledByDefault('v8.cpu_profiler.hires')
]

const startTracing = async (client: PuppeteerClient) => {
  await client.send('Tracing.start', {
    transferMode: 'ReturnAsStream',
    categories: categories.join(','),
    options: 'sampling-frequency=1000',
    bufferUsageReportingInterval: 500
  })
}

export default startTracing
