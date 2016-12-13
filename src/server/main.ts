import 'angular2-universal-polyfills';

import * as express from 'express';
import * as fs from 'fs';
import {compileModule} from './aot';
import {makeHandler} from './universal';
import {hnApi} from './api';
import {HNServerApp} from '../app/env/server';

const indexHtml = fs.readFileSync('src/index.html').toString();
const start = Date.now();
compileModule(HNServerApp).then(factory => {
  const time = Date.now() - start;
  console.log(`compiled app in ${time} ms`);
  const app = express();
  app.get('/', makeHandler(factory, indexHtml));
  app.get('/best', makeHandler(factory, indexHtml));
  app.get('/new', makeHandler(factory, indexHtml));
  app.get('/top', makeHandler(factory, indexHtml));
  app.get('/item/:id', makeHandler(factory, indexHtml));
  app.use('/api', hnApi);
  app.use(express.static('release'));
  app.listen(8080);
  console.log('serving on http://localhost:8080');
});
