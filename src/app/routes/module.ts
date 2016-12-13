import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FeedRoute} from './feed/route';
import {ItemRoute} from './item/route';
import {UiModule} from '../ui';

@NgModule({
  declarations: [
    FeedRoute,
    ItemRoute,
  ],
  imports: [
    UiModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'new', pathMatch: 'full'},
      {path: 'item/:id', component: ItemRoute},
      {path: ':section', component: FeedRoute},
    ]),
  ],
})
export class RoutesModule {}
