import {Inject, Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {PreloadHttp} from 'angular2-universal';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {Api, Story, ExStory, ExComment} from '../util/api';
import {hn, HnFirebase} from '../../server/hn';
import {HttpCacheService} from '../util/http';

const PAGE_SIZE = 2;

@Injectable()
export class ServerApi implements Api {
  constructor(
    public hn: HnFirebase,
    public cache: HttpCacheService,
    @Inject(Http) public http: PreloadHttp) {}

  getTopStoriesPage(page: number): Observable<Story[]> {
    return this.getStoriesPage('topstories', page);
  }

  getNewStoriesPage(page: number = 0): Observable<Story[]> {
    return this.getStoriesPage('newstories', page);
  }

  getBestStoriesPage(page: number = 0): Observable<Story[]> {
    return this.getStoriesPage('beststories', page);
  }

  getStory(id: number): Observable<ExStory> {
    console.log('getStory(id)', id);
    return Observable
      .defer(() => {
        this.http._async++;
        return Observable.fromPromise(this.hn.exStory(id, 3));
      })
      .do(story => this.cache.add(`/api/story/${id}`, JSON.stringify(story)))
      .finally(() => this.http._async--);
  }

  getComment(id: number): Observable<ExComment> {
    return Observable
      .defer(() => {
        this.http._async++;
        return Observable.fromPromise(this.hn.exComment(id, 1));
      })
      .do(comment => this.cache.add(`/api/comment/${id}`, JSON.stringify(comment)))
      .finally(() => this.http._async--);
  }

  private getStoriesPage(path: string, page: number): Observable<Story[]> {
    return Observable
      .defer(() => {
        this.http._async++;
        return Observable.fromPromise(this.hn.storyPage(path, page));
      })
      .do(stories => this.cache.add(`/api/aggregate/${path}/${page}`, JSON.stringify(stories)))
      .finally(() => this.http._async--);
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
    {provide: HnFirebase, useValue: hn},
  ],
})
export class ServerApiModule {}
