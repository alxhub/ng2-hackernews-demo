import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';

import {AppModule} from '../module'
import {App} from '../component';
import {ClientHnApiModule} from '../client/api';
import {ClientHttpModule} from '../client/http';

@NgModule({
  bootstrap: [
    App,
  ],
  imports: [
    BrowserModule,
    AppModule,
    ClientHnApiModule,
    ClientHttpModule,
  ],
})
export class HNClientApp {}
