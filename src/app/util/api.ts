import {Observable} from 'rxjs/Observable';

export interface Story {
  id: number;
  by: string;
  descendants: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export abstract class Api {
 abstract getTopStoriesPage(page: number): Observable<Story[]>;
 abstract getNewStoriesPage(page: number): Observable<Story[]>;
 abstract getBestStoriesPage(page: number): Observable<Story[]>;
 abstract getStory(id: number): Observable<Story>;
}