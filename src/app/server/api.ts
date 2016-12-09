import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {Api, Story} from '../util/api';
import {HttpService, HttpCacheService} from '../util/http';

const PAGE_SIZE = 2;

@Injectable()
export class ServerApi implements Api {
  constructor(public http: HttpService, public cache: HttpCacheService) {}

  getTopStoriesPage(page: number): Observable<Story[]> {
    return this.getStoriesPage('topstories', page);
  }

  getNewStoriesPage(page: number = 0): Observable<Story[]> {
    return this.getStoriesPage('newstories', page);
  }

  getBestStoriesPage(page: number = 0): Observable<Story[]> {
    return this.getStoriesPage('beststories', page);
  }

  getStory(id: number): Observable<Story> {
    return this
      .json<Story>(`item/${id}`)
      .do(story => this.cache.add(`/api/story/${id}`, JSON.stringify(story)));
  }

  private json<T>(path: string): Observable<T> {
    return this.http.json<T>(`https://hacker-news.firebaseio.com/v0/${path}.json`);
  }

  private getStoriesPage(path: string, page: number): Observable<Story[]> {
    return this
      .json<number[]>(path)
      .map(stories => pageFn(stories, page))
      .switchMap<Story[]>(ids => this.getStories(ids))
      .do(stories => this.cache.add(`/api/aggregate/${path}/${page}`, JSON.stringify(stories)))
  }

  private getStories(ids: number[]): Observable<Story[]> {
    return Observable
      .combineLatest(...ids.map(id => this.getStory(id)))
      .defaultIfEmpty([]);
  }
}

function pageFn(stories: number[], page: number): number[] {
  return stories.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
}

@NgModule({
  providers: [
    ServerApi,
    {provide: Api, useExisting: ServerApi},
  ],
})
export class ServerApiModule {}
