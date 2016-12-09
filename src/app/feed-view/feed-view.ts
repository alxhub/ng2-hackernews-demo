import { NgModule, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, ActivatedRoute } from '@angular/router'
import { HackerNewsAPI } from '../services/api'
import { Spinner } from './spinner.component'
import { ListItem } from './list.component'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/combineLatest'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of'

@Component({
  moduleId: module.id,
  selector: 'feed-view',
  template: `

  `,
  styleUrls: ['./feed-view.css']
})
export class FeedView {
  stories: any;
  page: Observable<number>;
  section: Observable<string>;
  constructor(route:ActivatedRoute, api:HackerNewsAPI){
    console.log('init', api);
    this.page = route.queryParams.map((params:any) => params.id);
    this.section = route.params.map((params:any) => params.section);

    this.stories = this.section.combineLatest(this.page).flatMap(([section, page = 0]) => {
      switch (section) {
        case 'top':
          return api.getTopStories(page);
        case 'new':
          return api.getNewStories(page);
        case 'best':
          return api.getBestStories(page);
        default:
          return Observable.of([])
      }
    });
  }
  trackStory(idx, story){
    return story.id;
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':section', component: FeedView }
    ])
  ],
  declarations: [
    Spinner,
    FeedView,
    ListItem
  ],
})
export class FeedViewModule {}
