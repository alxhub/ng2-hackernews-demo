import {NgModule, ApplicationRef, NgModuleFactoryLoader} from '@angular/core';
import {RouterModule, Router} from '@angular/router';

import {RoutesModule} from './routes/module';
import {UiModule} from './ui';

import {FeedViewModule} from './feed-view/feed-view'
import {ItemView} from './item-view/item-view'

import {App} from './component';
import {TimeAgoPipe} from './pipes/timeAgo';

@NgModule({
  imports: [
    RouterModule.forRoot([]),
    RoutesModule,
    UiModule,
  ],
  declarations: [
    App,
    ItemView,
    TimeAgoPipe
  ],
  entryComponents: [App],
})
export class AppModule {
  constructor(){

  }
}
