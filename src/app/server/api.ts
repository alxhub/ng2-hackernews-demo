import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {HnApi, HnStory} from '../util/api';
import {HttpService, HttpCacheService} from '../util/http';

export class ServerHnApi implements HnApi {
  constructor(public http: HttpService, public cache: HttpCacheService) {}

  getTopStoriesPage(page: number): Observable<HnStory[]> {
      return this.getStoriesPage('topstories', page);
  }

  getNewStoriesPage(page: number = 0): Observable<HnStory[]> {
    return this.getStoriesPage('newstories', page);
  }

  getBestStoriesPage(page: number = 0): Observable<HnStory[]> {
    return this.getStoriesPage('beststories', page);
  }

  getStory(id: number): Observable<HnStory> {
    return this
      .json<HnStory>(`item/${id}`)
      .do(story => this.cache.add(`/api/story/${id}`, JSON.stringify(story)));
  }
  
  private json<T>(path: string): Observable<T> {
    return this.http.json<T>(`https://hacker-news.firebaseio.com/v0/${path}.json`);
  }
  
  private getStoriesPage(path: string, page: number): Observable<HnStory[]> {
    return this
      .json<number[]>(path)
      .switchMap<HnStory[]>(ids => this.getStories(ids))
      .do(stories => this.cache.add(`/api/aggregate/${path}/${page}`, JSON.stringify(stories)));
  }

  private getStories(ids: number[]): Observable<HnStory[]> {
    return Observable
      .combineLatest(...ids.map(id => this.getStory(id)))
      .defaultIfEmpty([]);
  }
}

function pageFn(stories: number[], page: number): number[] {
  return stories.slice(page * 25, page + 1 * 25)
}

@NgModule({
  providers: [
    ServerHnApi,
    {provide: HnApi, useExisting: ServerHnApi},
  ],
})
export class ServerHnApiModule {}
