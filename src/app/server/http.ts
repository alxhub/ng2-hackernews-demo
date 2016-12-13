import * as https from 'https';
import {Injectable, NgModule, NgZone} from '@angular/core';
import {Http} from '@angular/http';
import {PreloadHttp} from 'angular2-universal';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {HttpService, ReqResp} from '../util/http';

import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ServerHttpService implements HttpService {

  // Universal tracks http requests specially, via `PreloadHttp` which is provided as
  // `Http` at the platform level. `PreloadHttp._async` is incremented for every outgoing
  // request, and decremented when those requests complete.
  // TODO: create a service that [ab]uses `PreloadHttp` to do this.
  get async(): number {
    return (this.http as PreloadHttp)._async;
  }
  set async(val: number) {
    (this.http as PreloadHttp)._async = val;
  }

  constructor(public http: Http, public zone: NgZone) {}

  json(url: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.async++;
      let strBuffer = '';
      let cancel: boolean = false;
      let req = https.get(url, resp => {
        resp.on('data', data => strBuffer += data.toString());
        resp.on('end', () => this.zone.run(() => {
          this.async--;
          if (cancel) {
            return;
          }

          // TODO: proper error handling
          observer.next(JSON.parse(strBuffer));
          if (cancel) {
            return;
          }
          observer.complete();
        }));
      });
      return () => cancel = true;
    });
  }
}

@NgModule({
  providers: [
    ServerHttpService,
    {provide: HttpService, useExisting: ServerHttpService},
  ],
})
export class ServerHttpModule {}
