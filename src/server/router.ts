import path from 'path';
import express from 'express';
import compression from 'compression';
import httpProxy from 'http-proxy';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import logger from 'morgan';

export default function router(app: express.Application) {
  const proxy = httpProxy.createProxyServer();

  app.disable('x-powered-by');

  app.use(helmet());
  app.use(compression());
  app.use(cors());

  app.use(logger('dev', { skip: (req, res) => res.statusCode < 400 }));
  // app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));
  app.use(express.static(path.resolve(process.cwd(), 'public')));

  app.use('/wp-json/', (req, res) => {
    proxy.web(
      req,
      res,
      { target: process.env.API_URL_WP, changeOrigin: true, secure: false },
      (proxyError) => {
        res.status(500).json({ error: 'ProxyException', details: proxyError });
      }
    );
  });

  app.use('/api/', (req, res) => {
    proxy.web(
      req,
      res,
      { target: process.env.API_URL_AUTH, changeOrigin: true, secure: false },
      (proxyError) => {
        res.status(500).json({ error: 'ProxyException', details: proxyError });
      }
    );
  });

  app.use('/graphql/', (req, res) => {
    proxy.web(
      req,
      res,
      { target: process.env.GRAPHQL_URL, changeOrigin: true, secure: false },
      (proxyError) => {
        res.status(500).json({ error: 'ProxyException', details: proxyError });
      }
    );
  });

  app.use(
    '/',
    express.static(path.resolve(__dirname, process.env.STATIC_PATH))
  );

  app.use(
    '/public',
    express.static(path.resolve(__dirname, process.env.PUBLIC_PATH))
  );

  app.use(cookieParser());
  app.use(bodyParser.json());

  // Assets
  app.use(
    '/assets',
    express.static(path.join(__dirname, '..', process.env.PUBLIC_PATH), {
      maxAge: '2m',
    })
  );

  // Static files
  app.use(
    express.static(path.join(__dirname, '..', process.env.STATIC_PATH), {
      maxAge: '2m',
    })
  );
}
