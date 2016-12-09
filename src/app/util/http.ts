import {Injectable, Component, Directive, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

export interface ReqResp {
  url: string;
  json: string;
}

export abstract class HttpService {
  abstract get requests(): Observable<ReqResp>;
  abstract json<T>(url: string): Observable<T>;
}

@Injectable()
export class HttpCacheService {
  entries: ReqResp[] = [];
  entryMap: {[url: string]: string} = {};

  add(url: string, json: string): void {
    this.entries.push({url, json});
    this.entryMap[url] = json;
  }

  lookupOnce(url: string): string | null {
    const entry = this.entryMap[url];
    if (entry) {
      delete this.entryMap[url];
    }
    return entry || null;
  }
}

@Component({
  selector: 'http-cache',
  template: `
<http-cache-entry *ngFor="let entry of cache.entries" [attr.url]="entry.url" [attr.json]="entry.json"></http-cache-entry>
`,
  styles: [`:host { display: none; }`]
})
export class HttpCache {
  constructor(public cache: HttpCacheService) {}
}

@Directive({
  selector: 'http-cache-entry',
})
export class HttpCacheEntry {}

@NgModule({
  declarations: [HttpCache, HttpCacheEntry],
  exports: [HttpCache],
  imports: [CommonModule],
  providers: [HttpCacheService],
})
export class HttpCacheModule {}
