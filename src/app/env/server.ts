import {UniversalModule} from 'angular2-universal';

import {NgModule, ModuleWithProviders} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {AppModule} from '../module'
import {App} from '../component';

declare var Zone: any;
@NgModule({
  bootstrap: [
    App,
  ],
  imports: [
    AppModule,
    UniversalModule,
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
})
export class HNServerApp {}
