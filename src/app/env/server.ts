import {NgModule, ModuleWithProviders} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
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
    ServerModule,
    AppModule,
    ServerApiModule,
    ServerHttpModule,
    AppShellModule.prerender(),
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
})
export class HNServerApp {}
