import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {AppShellModule} from '@angular/app-shell';

import {AppModule} from '../module'
import {App} from '../component';
import {ClientApiModule} from '../client/api';
import {ClientHttpModule} from '../client/http';

@NgModule({
  bootstrap: [
    App,
  ],
  imports: [
    BrowserModule,
    AppModule,
    ClientApiModule,
    ClientHttpModule,
    AppShellModule.runtime(),
  ],
})
export class HNClientApp {}
