import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import {Api, ExStory} from '../../util/api';
@Component({
  moduleId: module.id,
  selector: 'route-item',
  templateUrl: './template.html',
  styleUrls: ['./style.css'],
})
export class ItemRoute implements OnDestroy {
  story: ExStory;
  sub: Subscription;

  constructor(route: ActivatedRoute, api: Api) {
    console.log('loaded item route', route.snapshot.params);
    this.sub = route
      .params
      .switchMap(params => api.getStory(params['id']))
      .subscribe(story => this.story = story);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
