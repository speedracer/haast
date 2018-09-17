import collectMetrics from 'speedmetrics'
import * as puppeteer from 'puppeteer'
import { Metrics } from 'speedmetrics/types'

import startTracing from './start-tracing'
import stopTracing from './stop-tracing'
import { PuppeteerClient } from './types'

type Callback = (page: puppeteer.Page) => void

const haast = async (urlOrCallback: string | Callback): Promise<Metrics> => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // @ts-ignore
  await startTracing(page._client as PuppeteerClient)

  if (typeof urlOrCallback === 'string') {
    await page.goto(urlOrCallback, { waitUntil: 'networkidle0' })
  } else {
    await urlOrCallback(page)
  }

  // @ts-ignore
  const trace = await stopTracing(page._client)

  const metrics = collectMetrics(trace.traceEvents)

  await browser.close()

  return metrics
}

export default haast
