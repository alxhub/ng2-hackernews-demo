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

  constructor(public http: Http, public zone: NgZone) {}

  json(url: string): Observable<any> {
    return null;
  }
}

@NgModule({
  providers: [
    ServerHttpService,
    {provide: HttpService, useExisting: ServerHttpService},
  ],
})
export class ServerHttpModule {}
