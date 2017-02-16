import {enableProdMode, NgModuleFactory} from '@angular/core';
import {renderModuleFactory} from '@angular/platform-server';
import 'zone.js';
import * as express from 'express';

// Run angular in production mode.
enableProdMode();

export function makeHandler<T>(factory: NgModuleFactory<T>, html: string) {
  return (req: express.Request, resp: express.Response) => {
    console.log('[universal]', req.url);
    renderModuleFactory(factory, {document: html, url: req.url + '?#'})
      .then(ssrHtml => {
        resp.write(ssrHtml);
        resp.end();
      });
  };
}
