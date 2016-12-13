import * as https from 'https';
import * as express from 'express';

import {hn, HnFirebase} from './hn';

const PAGE_SIZE = 2;

export const hnApi = express.Router();

hnApi.get('/aggregate/:section/:page', (req: express.Request, resp: express.Response) => {
  hn
    .storyPage(req.params.section, parseInt(req.params.page))
    .then(page => JSON.stringify(page))
    .then(json => {
      resp.write(json);
      resp.end();
    });
});

hnApi.get('/story/:id', (req: express.Request, resp: express.Response) => {
  hn
    .exStory(parseInt(req.params.id), 3)
    .then(page => JSON.stringify(page))
    .then(json => {
      resp.write(json);
      resp.end();
    });
});

hnApi.get('/comment/:id', (req: express.Request, resp: express.Response) => {
  hn
    .exComment(parseInt(req.params.id), 1)
    .then(page => JSON.stringify(page))
    .then(json => {
      resp.write(json);
      resp.end();
    });
});

function pageFn(ids: number[], page: number): number[] {
  return ids.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
}