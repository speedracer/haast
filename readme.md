# ![Haast](https://raw.githubusercontent.com/ngryman/artworks/master/haast/heading/haast@2x.png)

[![travis][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]

[travis-image]: https://img.shields.io/travis/speedracer/haast.svg?style=flat
[travis-url]: https://travis-ci.org/speedracer/haast
[codecov-image]: https://img.shields.io/codecov/c/github/speedracer/haast.svg
[codecov-url]: https://codecov.io/github/speedracer/haast

Collect web pages meaningful performance metrics.

## Quickstart

### Installation

```sh
npm install haast
```

### Usage

```js
import haast from 'haast'

const metrics = await haast('https://google.com')
console.log(metrics)
```
```js
{
  timings: {
    navigationStart: 0,
    domContentLoaded: 200,
    firstPaint: 400,
    firstContentfulPaint: 400,
    firstMeaningfulPaint: 600,
    load: 1000
  }
  events: {
    /* ... */
  }
}
```

## API

### haast(url)

Loads the given URL and returns a promise resolving to collected metrics.

```js
const metrics = await haast('https://google.com')
```

### metrics(callback)

Accepts a callback that handles navigation and returns a promise when it's done.
The `page` argument is a [Puppeteer page](https://pptr.dev/#?product=Puppeteer&version=v1.8.0&show=api-class-page) instance.

```js
const metrics = await haast(page => {
  await page.goto('http://www.nooooooooooooooo.com')
  await page.click('#no-button')
})
```
