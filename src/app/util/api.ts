import {Observable} from 'rxjs/Observable';

export interface HnStory {
  id: string;
  by: string;
  descendants: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export abstract class HnApi {
 abstract getTopStoriesPage(page: number): Observable<HnStory[]>;
 abstract getNewStoriesPage(page: number): Observable<HnStory[]>;
 abstract getBestStoriesPage(page: number): Observable<HnStory[]>;
 abstract getStory(id: number): Observable<HnStory>;
}