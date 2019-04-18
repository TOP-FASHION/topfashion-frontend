import React from 'react'
import {useStaticRendering} from 'mobx-react'
import {renderToStaticMarkup} from 'react-dom/server'
import flushChunks from 'webpack-flush-chunks'
import Head from '../src/helpers/Head'
import Body from '../src/helpers/Body'

export default ({clientStats}) => {
  useStaticRendering(true)

  const {scripts, stylesheets, cssHashRaw} = flushChunks(clientStats)
  const extendedStylesheets = stylesheets.slice(0)
  const initiallyAwaitingPromises = []

  return async (req, res, next) => {
    try {
      await Promise.all(initiallyAwaitingPromises)
      return renderMiddleware(req, res, next)
    } catch (error) {
      next(error)
    }
  }

  // FUNCTIONS

  // The main application renderer
  async function renderMiddleware (req, res) {
    const headHtml = renderToStaticMarkup(
      <Head />
    )

    // First bytes (ASAP)
    res.setHeader('Content-Type', 'text/html')
    res.write(`<!doctype html>\n<html>${headHtml}`)

    // Wait information about the user balance
    const serverTime = Date.now()

    const data = {
      now: serverTime
    }

    const bodyHtml = renderToStaticMarkup(
      <Body
        scripts={scripts}
        stylesheets={extendedStylesheets}
        cssHash={cssHashRaw}
        state={data}
      />
    )

    // Last bytes
    res.write(`${bodyHtml}</html>`)
    res.end()
  }
}
