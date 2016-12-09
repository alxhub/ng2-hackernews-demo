import {UniversalModule} from 'angular2-universal';

import {NgModule, ModuleWithProviders} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {AppShellModule} from '@angular/app-shell';
import {AppModule} from '../module'
import {App} from '../component';
import {ServerApiModule} from '../server/api';
import {ServerHttpModule} from '../server/http';

declare var Zone: any;
@NgModule({
  bootstrap: [
    App,
  ],
  imports: [
    AppModule,
    ServerApiModule,
    ServerHttpModule,
    UniversalModule,
    AppShellModule.prerender(),
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
})
export class HNServerApp {}
