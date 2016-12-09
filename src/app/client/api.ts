import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {HnApi, HnStory} from '../util/api';
import {HttpService} from '../util/http';

export class ClientHnApi implements HnApi {
  constructor(public http: HttpService) {}

 getTopStoriesPage(page: number): Observable<HnStory[]> {
   return this.http.json<HnStory[]>(`/api/aggregate/topstories/${page}`);
 }
 
 getNewStoriesPage(page: number): Observable<HnStory[]> {
   return this.http.json<HnStory[]>(`/api/aggregate/newstories/${page}`);
 }
 
 getBestStoriesPage(page: number): Observable<HnStory[]> {
   return this.http.json<HnStory[]>(`/api/aggregate/beststories/${page}`);
 }
 
 getStory(id: number): Observable<HnStory> {
   return this.http.json<HnStory>(`/api/story/${id}`);
 }
}

@NgModule({
  providers: [
    ClientHnApi,
    {provide: HnApi, useExisting: ClientHnApi},
  ],
})
export class ClientHnApiModule {}
