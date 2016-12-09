import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {HttpService, ReqResp, HttpCacheService} from '../util/http';

import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

let httpCache = {};

@Injectable()
export class ClientHttpService implements HttpService {
  requests: Observable<ReqResp>;

  constructor(public cache: HttpCacheService) {
    Object.keys(httpCache).forEach(url => cache.add(url, httpCache[url]));
    httpCache = null;
  }

  json<T>(url: string): Observable<T> {
    const cached = this.cache.lookupOnce(url);
    if (!!cached) {
      return Observable.of<T>(JSON.parse(cached));
    }
    return Observable
      .defer<Response>(() => Observable.fromPromise(fetch(url)))
      .switchMap(resp => resp.json())
  }
}

@NgModule({
  providers: [
    ClientHttpService,
    {provide: HttpService, useExisting: ClientHttpService},
  ],
})
export class ClientHttpModule {}

export function hydrateHttpCache(): void {
  let items = document.getElementsByTagName('http-cache-entry');
  for (let i = 0; i < items.length; i++) {
    const entry = items.item(i);
    const url = entry.getAttribute('url');
    const json = entry.getAttribute('json');
    httpCache[url] = json;
  }
}