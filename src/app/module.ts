import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppShellModule} from '@angular/app-shell';

import {App} from './component';
import {RoutesModule} from './routes/module';
import {UiModule} from './ui';
import {HttpCacheModule} from './util/http';


@NgModule({
  declarations: [App],
  imports: [
    AppShellModule,
    HttpCacheModule,
    RouterModule.forRoot([]),
    RoutesModule,
  ],
})
export class AppModule {}
