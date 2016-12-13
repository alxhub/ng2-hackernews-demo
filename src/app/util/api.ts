import {Observable} from 'rxjs/Observable';

export interface Item {
  id: number;
  deleted: true;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by: string;
  time: number;
  text: string;
  dead: boolean;
  kids: number[];
  url: string;
  title: string;
}

export interface Story extends Item {
  type: "story";
  descendants: number;
  score: number;
}

export interface Comment extends Item {
  type: "comment";
  parent: number;
}

export interface Poll extends Item {
  type: "poll";
  parts: number[];
}

export interface PollOpt extends Item {
  type: "pollopt";
  score: number;
}

export interface Job extends Item {
  type: "job";
}

export interface ExStory extends Story {
  comments: ExComment[];
}

export interface ExComment extends Comment {
  children: ExComment[];
}

export abstract class Api {
 abstract getTopStoriesPage(page: number): Observable<Story[]>;
 abstract getNewStoriesPage(page: number): Observable<Story[]>;
 abstract getBestStoriesPage(page: number): Observable<Story[]>;
 abstract getStory(id: number): Observable<ExStory>;
 abstract getComment(id: number): Observable<ExComment>;
}