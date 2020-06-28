import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';

export default (
  head: any,
  extractor: any,
  htmlContent: string,
  initialState: object
) => {
  const html = `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!--[if IE]>
          <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <![endif]-->
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='apple-mobile-web-app-title' content={siteName} />
        <meta name='application-name' content={siteName} />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-TileImage' content='/mstile-144x144.png' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='description' content={siteDescription} data-react-helmet='true' />

        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        <!-- Insert bundled styles into <link> tag -->
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
      </head>
      <body>
        <!-- Insert the router, which passed from server-side -->
        <div id="react-view">${htmlContent}</div>

        <!-- Store the initial state into window -->
        <script>
          // Use serialize-javascript for mitigating XSS attacks. See the following security issues:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__INITIAL_STATE__=${serialize(initialState)};
        </script>

        <!-- Insert bundled scripts into <script> tag -->
        ${extractor.getScriptTags()}
        ${head.script.toString()}
      </body>
    </html>
  `;

  // html-minifier configuration, refer to "https://github.com/kangax/html-minifier" for more configuration
  const minifyConfig = {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  };

  // Minify html in production
  return __DEV__ ? html : minify(html, minifyConfig);
};
