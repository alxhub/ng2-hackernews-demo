import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FeedRoute} from './feed/route';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    RouterModule.forChild([
      {path: '', redirectTo: 'new', pathMatch: 'full'},
      {path: ':section', component: FeedRoute},
    ]),
  ],
})
export class RoutesModule {}
