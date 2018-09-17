import test, { ExecutionContext } from 'ava'

import haast from '../src'
import { Metrics } from '../src/types'

const checkValidMetrics = (t: ExecutionContext, metrics: Metrics) => {
  t.is(typeof metrics.timings.domContentLoaded, 'number')
  t.is(typeof metrics.timings.firstPaint, 'number')
  t.is(typeof metrics.timings.firstContentfulPaint, 'number')
  t.is(typeof metrics.timings.firstMeaningfulPaint, 'number')
  t.is(typeof metrics.timings.load, 'number')
}

test('collect metrics from a url', async t => {
  const metrics = await haast('https://google.com')
  checkValidMetrics(t, metrics)
})

test('accept a callback with the current page as parameter', async t => {
  const metrics = await haast(async page => {
    await page.goto('http://www.nooooooooooooooo.com', { waitUntil: 'networkidle0' })
    await page.click('#no-button')
  })
  checkValidMetrics(t, metrics)
})
