import * as https from 'https';
import * as express from 'express';

const PAGE_SIZE = 2;

function get(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, resp => {
      let strBuffer = '';
      resp.on('data', data => strBuffer += data.toString());
      resp.on('end', () => resolve(strBuffer));
    });
  })
}

function hnGet(path: string): Promise<string> {
  return get(`https://hacker-news.firebaseio.com/v0/${path}.json`);
}

function hnStory(id: number): Promise<string> {
  return hnGet(`item/${id}`).then(json => JSON.parse(json));
}

export const hnApi = express.Router();

hnApi.get('/aggregate/:section/:page', (req: express.Request, resp: express.Response) => {
  hnGet(req.params.section)
    .then(json => JSON.parse(json))
    .then(ids => pageFn(ids, parseInt(req.params.page)))
    .then(ids => Promise.all(ids.map(id => hnStory(id))))
    .then(stories => JSON.stringify(stories))
    .then(json => {
      resp.write(json);
      resp.end();
    })
});

hnApi.get('/story/:id', (req: express.Request, resp: express.Response) => {
  hnGet(`item/${req.params['id']}`).then(data => {
    resp.write(data)
    resp.end()
  });
});

function pageFn(ids: number[], page: number): number[] {
  return ids.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
}