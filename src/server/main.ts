import 'angular2-universal-polyfills';

import * as express from 'express';
import * as compression from 'compression';
import * as fs from 'fs';
import {compileModule} from './aot';
import {makeHandler} from './universal';
import {hnApi} from './api';
import {HNServerApp} from '../app/env/server';

function forceHttps(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.protocol === 'https' || req.hostname === 'localhost') {
    return next();
  }
  res.redirect('https://' + req.hostname + req.url);
};

const indexHtml = fs.readFileSync('release/index.html').toString();
const start = Date.now();
compileModule(HNServerApp).then(factory => {
  const time = Date.now() - start;
  console.log(`compiled app in ${time} ms`);
  const app = express();
  app.use(forceHttps, compression());
  app.get('/', makeHandler(factory, indexHtml));
  app.get('/best', makeHandler(factory, indexHtml));
  app.get('/new', makeHandler(factory, indexHtml));
  app.get('/top', makeHandler(factory, indexHtml));
  app.get('/item/:id', makeHandler(factory, indexHtml));
  app.use('/api', hnApi);
  app.use(express.static('release'));
  const port = process.env.PORT || 8080;
  app.listen(port);
  console.log(`serving on http://localhost:${port}`);
});
