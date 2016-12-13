import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Api, Story, ExComment} from '../util/api';
import {HttpService} from '../util/http';

@Injectable()
export class ClientApi implements Api {
  constructor(public http: HttpService) {}

  getTopStoriesPage(page: number): Observable<Story[]> {
    return this.http.json<Story[]>(`/api/aggregate/topstories/${page}`);
  }
  
  getNewStoriesPage(page: number): Observable<Story[]> {
    return this.http.json<Story[]>(`/api/aggregate/newstories/${page}`);
  }
  
  getBestStoriesPage(page: number): Observable<Story[]> {
    return this.http.json<Story[]>(`/api/aggregate/beststories/${page}`);
  }
  
  getStory(id: number): Observable<Story> {
    return this.http.json<Story>(`/api/story/${id}`);
  }

  getComment(id: number): Observable<ExComment> {
    return this.http.json<ExComment>(`/api/comment/${id}`);
  }
}

@NgModule({
  providers: [
    ClientApi,
    {provide: Api, useExisting: ClientApi},
  ],
})
export class ClientApiModule {}
