import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {HttpService, ReqResp} from '../util/http';

import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ServerHttpService implements HttpService {
  private reqObserver: Observer<ReqResp>;
  requests: Observable<ReqResp>;

  constructor() {
    // This is a horrible hack. It's done to avoid importing `Subject` which adds weight to the code.
    this.requests = new Observable<ReqResp>(observer => {
      this.reqObserver = observer;
      return () => this.reqObserver = null;
    });
  }

  json(url: string): Observable<any> {
    return Observable
      .defer<Response>(() => Observable.fromPromise(fetch(url)))
      .switchMap(resp => resp.json())
  }
}

@NgModule({
  providers: [
    ServerHttpService,
    {provide: HttpService, useExisting: ServerHttpService},
  ],
})
export class ServerHttpModule {}
