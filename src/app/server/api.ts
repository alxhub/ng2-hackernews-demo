import {Inject, Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Subscriber} from 'rxjs/Subscriber';
import {Http} from '@angular/http';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {Api, Story, ExStory, ExComment} from '../util/api';
import {hn, HnFirebase} from '../../server/hn';
import {HttpCacheService} from '../util/http';

const PAGE_SIZE = 10;
declare var Zone;
declare class Task {
  invoke(): void;
  zone: any;
};

function macroTask<T>(obs: Observable<T>): Observable<T> {
  return new Observable<T>((observer: Subscriber<T>) => {
    let task: Task = null;
    let scheduled: boolean = false;
    let sub: Subscription = null;
    let savedResult: any = null;
    let savedError: any = null;

    const scheduleTask = (_task: Task) => {
      task = _task;
      scheduled = true;

      sub = obs.subscribe(
        res => savedResult = res,
        err => {
          if (!scheduled) {
            throw new Error('invoke twice');
          }
          savedError = err;
          scheduled = false;
          task.invoke();
        },
        () => {
          if (!scheduled) {
            throw new Error('invoke twice');
          }
          scheduled = false;
          task.invoke();
        },
      );
    };

    const cancelTask = (_task: Task) => {
      if (!scheduled) {
        return;
      }
      scheduled = false;
      if (sub) {
        sub.unsubscribe();
        sub = null;
      }
    };

    const onComplete = () => {
      if (savedError !== null) {
        observer.error(savedError);
      } else {
        observer.next(savedResult);
        observer.complete();
      }
    };

    // MockBackend is currently synchronous, which means that if scheduleTask is by
    // scheduleMacroTask, the request will hit MockBackend and the response will be
    // sent, causing task.invoke() to be called.
    const _task = Zone.current.scheduleMacroTask(
        'ServerApi.macroTask', onComplete, {}, () => null, cancelTask);
    scheduleTask(_task);

    return () => {
      if (scheduled && task) {
        task.zone.cancelTask(task);
        scheduled = false;
      }
      if (sub) {
        sub.unsubscribe();
        sub = null;
      }
    };
  });
}

@Injectable()
export class ServerApi implements Api {
  constructor(
    public hn: HnFirebase,
    public cache: HttpCacheService,
    public http: Http) {}

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
      .defer(() => Observable.fromPromise(this.hn.exStory(id, 2)))
      .do(story => this.cache.add(`/api/story/${id}`, JSON.stringify(story)))
      .let(macroTask);
  }

  getComment(id: number): Observable<ExComment> {
    return Observable
      .defer(() => Observable.fromPromise(this.hn.exComment(id, 1)))
      .do(comment => this.cache.add(`/api/comment/${id}`, JSON.stringify(comment)))
      .let(macroTask);
  }

  private getStoriesPage(path: string, page: number): Observable<Story[]> {
    return Observable
      .defer(() => Observable.fromPromise(this.hn.storyPage(path, page)))
      .do(stories => this.cache.add(`/api/aggregate/${path}/${page}`, JSON.stringify(stories)))
      .let(macroTask);
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
