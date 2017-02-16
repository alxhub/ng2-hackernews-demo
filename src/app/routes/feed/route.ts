import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import {Api, Story} from '../../util/api';

@Component({
  moduleId: module.id,
  selector: 'route-feed',
  templateUrl: './template.html',
  styleUrls: ['./style.css'],
})
export class FeedRoute {
  stories: Observable<Story[]>;

  constructor(route: ActivatedRoute, api: Api) {
    this.stories = route
      .params
      .switchMap(params => {
        switch (params['section']) {
          case 'new':
            return api.getNewStoriesPage(0);
          case 'top':
            return api.getTopStoriesPage(0);
          case 'best':
            return api.getBestStoriesPage(0);
          default:
            throw new Error(`Unknown section: ${params['section']}`);
        }
      });
  }

  trackStory(idx: number, story: Story): number {
    return story ? story.id : null;
  }
}
