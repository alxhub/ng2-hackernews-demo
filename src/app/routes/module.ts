import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FeedRoute} from './feed/route';
import {UiModule} from '../ui';

@NgModule({
  declarations: [
    FeedRoute,
  ],
  imports: [
    UiModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'new', pathMatch: 'full'},
      {path: ':section', component: FeedRoute},
    ]),
  ],
})
export class RoutesModule {}
