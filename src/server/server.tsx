import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import https from 'https';

import React from 'react';
import { useStaticRendering } from 'mobx-react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { Helmet } from 'react-helmet';
import chalk from 'chalk';

import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient } from 'apollo-boost';
import fetch from 'node-fetch';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { addLocaleData, IntlProvider } from 'react-intl';
import acceptLanguage from 'accept-language';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import messages from '../client/translations';

import renderHtml from './utils/renderHtml';
import config from '../client/config';
import { AppContext, stores } from '../client/core/Store/context';
import Appn from '../client/decorators';
import { router } from './router';

dotenv.config();

const LOCALES = {
  en: en,
  ru: ru,
}

// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(true);

// Add all locales
const AVAILABLE_LOCALES = ['en', 'ru']

addLocaleData([...en, ...ru]);

AVAILABLE_LOCALES.forEach((locale) => {
  messages[
    locale
    // eslint-disable-next-line import/no-dynamic-require
  ] = require(`../client/translations/locales/${locale}.json`);
})

acceptLanguage.languages(AVAILABLE_LOCALES)

const app = express();

// register routes
router(app);

if (__DEV__) {
  // To make it trusted by Chrome browser you should copy the certificate into a file *.crt and then import it in Chrome
  // (Settings > Manage certificates > Authorities)
  const serverCrt = `
  -----BEGIN CERTIFICATE-----
  MIIDfDCCAmSgAwIBAgIJANyurTwMO0tcMA0GCSqGSIb3DQEBCwUAMEcxCzAJBgNV
  BAYTAkZJMREwDwYDVQQIDAhIZWxzaW5raTERMA8GA1UECgwIRmlubnBsYXkxEjAQ
  BgNVBAMMCWxvY2FsaG9zdDAgFw0xOTA1MjMxNTI2MjJaGA8yMTE5MDQyOTE1MjYy
  MlowRzELMAkGA1UEBhMCRkkxETAPBgNVBAgMCEhlbHNpbmtpMREwDwYDVQQKDAhG
  aW5ucGxheTESMBAGA1UEAwwJbG9jYWxob3N0MIIBIjANBgkqhkiG9w0BAQEFAAOC
  AQ8AMIIBCgKCAQEAvfKWDgdsLqe/8tM4TBtN8s/GZPjTc5If+dyxo4kvepwB8nTz
  vF5wDiHEzeV4CU00GxUUJsPFC6+FyItrqHMAt8RWGlOthmKyyG2DaDbfKdc0x7RR
  0a5/qPf/LTDShKIzRT9qZ8DlBkL4MIZtS98SVqg6twmxO3cLwdN4mXg51rheoSCG
  +EM8mIBDYjX+/W0vgTLFJkd19RfdLSvIJdUf3u3Z4SKuj0P5z1h9Gdu5gUoHy2Zj
  OOqeasr8dyVzh5eRK+H2MqQTubLGIKki3U6WsTi6RJRRSvOXZaXnxDS2ltxEBdQd
  146fplBfC2K3hM+xclNkR5TLS+9WNSjLW3hguQIDAQABo2kwZzAdBgNVHQ4EFgQU
  VcBGzZ5/Y0eASiZtlVf9E0GAWfIwHwYDVR0jBBgwFoAUVcBGzZ5/Y0eASiZtlVf9
  E0GAWfIwDwYDVR0TAQH/BAUwAwEB/zAUBgNVHREEDTALgglsb2NhbGhvc3QwDQYJ
  KoZIhvcNAQELBQADggEBAI+nWKil7BRmG3zyAE3vLVJeVYGNXvNo4fP5VEUmIy1v
  L0880aAjtXtX3YslQtgFBRR9IdFLeAHTV8snOWBa82nYE0blFySgvTRTakehRdOW
  X2Q5zYPAHWBdsBH7EbxGesG/RH7GPw6Fp2vfd91j4s6i9RmGhemCLh/YceB8gEAg
  Hz5rcOJ4enb021XrsJutrZP28cGNC1wfI9tMW1lI/mVk/71vZ1+RwYOpTlPojXm/
  nXyHjW3riH1s+VBnllSpYn1/f0U7ogZDUcybQhVMdQNe/xnuUSaxUZS0CpPDifMZ
  N3A6lQH5KCUVDjLuMNOg25QXxGluJdzg/z8lbY1irRs=
  -----END CERTIFICATE-----
  `;

  const serverKey = `
  -----BEGIN PRIVATE KEY-----
  MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC98pYOB2wup7/y
  0zhMG03yz8Zk+NNzkh/53LGjiS96nAHydPO8XnAOIcTN5XgJTTQbFRQmw8ULr4XI
  i2uocwC3xFYaU62GYrLIbYNoNt8p1zTHtFHRrn+o9/8tMNKEojNFP2pnwOUGQvgw
  hm1L3xJWqDq3CbE7dwvB03iZeDnWuF6hIIb4QzyYgENiNf79bS+BMsUmR3X1F90t
  K8gl1R/e7dnhIq6PQ/nPWH0Z27mBSgfLZmM46p5qyvx3JXOHl5Er4fYypBO5ssYg
  qSLdTpaxOLpElFFK85dlpefENLaW3EQF1B3Xjp+mUF8LYreEz7FyU2RHlMtL71Y1
  KMtbeGC5AgMBAAECggEBAJotLIUomzPnb1MfBOQpiYScB5HvslptckzySLHP6Vzh
  AmeVbD0qflPKLx9csakDJFcTLe8lGmyYxMN5/yGUbzG6SJVH9GJO/ITY9z+AwnUI
  vEuY3oyO0goJefNpXIbRzUHY7npWxM7nTuK8Sjy6TP1PwZDOajA1ObLS/mG7h17z
  k5FU4aO2KCTCeBPyd4+G5gAx0svSjvd6Le5g+s7KsfW1WmgN3utFT4RTKWVnIM2y
  0yWyoBoj7QfjQXsE25Ucz7kNgPAX9vwJIjt5iKCvQbwUi2qlDj+RrFSi8d3ria6X
  hD/+LPwWNbBY4aF8AiNojEBAAs28vL1PQeU2Ouj9B40CgYEA5FdYBWfSaln+n4WR
  sA53rnxDd7obd82hy4jDsfrsNgyVdINVJZ0Do3LjcQ/tyaUBV0nvPr8IfcZFq6LD
  uTNblSGMqNl8stav7XzNwaJUq+/rnmLAIQcFr+qnyvy7XfLMubrBLLYYmyX9xzgH
  fLUq10t5vc7YpcxmEk6F1fItJfMCgYEA1PSxCmPOUGYjmaNe5AFCN5v2AF8g2Ry/
  d4jCYd56+TDXeUw58iRELvy4H++JBx/2szBGbTt6zrh9vnJvvSivLA4emn/FB7sP
  5/IVwTWgFJQopawXJSZ7a6nUyQOG61u/VNG+lEcERVUUaT0wfLEmFVikyO9dZp2c
  AkVWAuKcraMCgYAyYYMuTiYDCTBBCjuG2OpXOVu5gvqkiF52hgqHrpGHq2ceegvD
  bM1stuCwBY+1ug59r/Z1pbi9541fvV3p8wb19J0QdEwrOWs/vxW275Y3CYy3OZqi
  ruX2VpQHGZRNulCpeic9MkBjmxJPbnFYdrCpKCIIWyc6DctHpsOo3PJROQKBgF52
  mF3ife8+D4akaIA9arEeNpZdnEWSsgAFIyyksun812gP/xhBLBmnssk/yQnnDNjZ
  jjQAEW7HecfUHWrMNEAXl02zZaQTP3AE+89zySm3uvwahT3Ofyr379KnBN88GHg4
  fhBqHCPhJKe2I977+ce4RYh4XXcabMy5Evk+qn9/AoGAfeITTLCDCQ6+hwYI/qVn
  1n2rC/tW3vL7QY1kpuK2dECjnNt+QqsYMyKy9fV7EYAhmrGgtxMfPNcC629/qkdo
  gzCGalYDpgAhGyN2SNA6ashQ+xzthXDsu7xPGl4FQWlsg0+zAUnqsuGxt5XFBlcW
  rpLlgdytPG1YDUGdwnZiSmI=
  -----END PRIVATE KEY-----
  `

  /* Run express as webpack dev server */
  const webpack = require('webpack');
  const webpackConfig = require('../../tools/webpack/config.babel');
  const compiler = webpack(webpackConfig);
  const instance = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: 'minimal',
    serverSideRender: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  });

  app.use(instance);

  if (process.env.HTTPS === 'true') {
    const options = {
      key: serverKey,
      cert: serverCrt,
    }

    instance.waitUntilValid(() => {
      const url = `http://${config.host}:${config.port}`;
      console.info(chalk.green(`==> 🌎  Listening at ${url}`));
    });
  } else {
    instance.waitUntilValid(() => {
      const url = `http://${config.host}:${config.port}`;
      console.info(chalk.green(`==> 🌎  Listening at ${url}`));
    });
  }

  app.use(require('webpack-hot-middleware')(compiler));
}

// Register server-side rendering middleware
app.get('*', (req, res) => {
  (async () => {
    try {
      const statsFile = path.resolve(
        process.cwd(),
        'public/loadable-stats.json'
      );
      const extractor = new ChunkExtractor({ statsFile });
      const { language } = detectLanguageParams(req, AVAILABLE_LOCALES);
      const messagesBylocale = messages[language];
      const initialNow = Date.now();

      const client = new ApolloClient({
        ssrMode: true,
        link: new HttpLink({ uri: '/graphql', fetch: fetch }),
        cache: new InMemoryCache(),
      });

      const staticContext: any = {};
      const App = (
        <ChunkExtractorManager extractor={extractor}>
          <ApolloProvider client={client}>
            <AppContext.Provider value={stores}>
              {/* Setup React-Router server-side rendering */}
              <IntlProvider
                initialNow={initialNow}
                locale={language}
                messages={messages[language]}
              >
                <StaticRouter location={req.url} context={staticContext}>
                  {/*
                  // @ts-ignore */}
                  <Appn />
                </StaticRouter>
              </IntlProvider>
            </AppContext.Provider>
          </ApolloProvider>
        </ChunkExtractorManager>
      );

      // eslint-disable-next-line no-inner-declarations
      function generateApplicationState() {
        const serverTime = Date.now();

        return {
          now: serverTime,
          locale: 'en',
          messages: messagesBylocale,
          localeData: 'en',
        };
      }

      function detectLanguageParams (req, languages) {
        const langFromUrl = (req.url.split(/[/?]/) || [])[1]

        if (isCorrectLang(langFromUrl)) {
          return {
            language: langFromUrl,
            source: 'url'
          }
        }

        const langFromLocale = detectLocale(req)
        if (isCorrectLang(langFromLocale)) {
          return {
            language: langFromLocale,
            source: 'locale'
          }
        }

        return {
          language: 'en'
        }

        function isCorrectLang (lang) {
          return !!(lang && ~languages.indexOf(lang))
        }
      }

      // Detects locale from cookie or from header AcceptLanguage
      function detectLocale (req) {
        const cookieLocale = req.cookies._lang
        return (
          cookieLocale || acceptLanguage.get(req.headers['accept-language']) || 'en'
        )
      }

      // First bytes (ASAP)
      res.setHeader('Content-Type', 'text/html')
      res.cookie('_lang', language, { maxAge: 900000 })

      const initialState = generateApplicationState();
      const htmlContent = renderToString(App);
      // head must be placed after "renderToString"
      // see: https://github.com/nfl/react-helmet#server-usage
      const head = Helmet.renderStatic();

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (staticContext.url) {
        res.status(301).setHeader('Location', staticContext.url);
        res.end();

        return;
      }

      // Check page status
      const status = staticContext.status === '404' ? 404 : 200;

      // Pass the route and initial state into html template
      res
        .status(status)
        .send(renderHtml(head, extractor, htmlContent, initialState));
    } catch (err) {
      res.status(404).send('Not Found :(');

      console.error(chalk.red(`==> 😭  Rendering routes error: ${err}`));
    }
  })();
});

// @ts-ignore
app.listen(config.port, config.host, (err) => {
  if (err) console.error(chalk.red(`==> 😭  OMG!!! ${err}`));
});
