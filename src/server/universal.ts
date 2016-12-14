import {enableProdMode, NgModuleFactory} from '@angular/core';
import 'zone.js';
import * as express from 'express';
import {platformUniversalDynamic} from 'angular2-universal/node';

// Run angular in production mode.
enableProdMode();

export function makeHandler<T>(factory: NgModuleFactory<T>, html: string) {
  return (req: express.Request, resp: express.Response) => {
    Zone.current.fork({
      name: `req-${req.url}`,
      properties: {
        document: html,
        originUrl: 'http://localhost:8080$/',
        requestUrl: req.url,
      }
    }).run(() => {
      console.log('[universal]', req.url);
      (platformUniversalDynamic().serializeModuleFactory(factory, {preboot: false}) as Promise<string>).then(ssrHtml => {
        console.log('got html', ssrHtml);
        resp.write(ssrHtml);
        resp.end();
      });
    });
  };
}
