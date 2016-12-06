import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';

import {AppModule} from '../module'
import {App} from '../component';

@NgModule({
  bootstrap: [
    App,
  ],
  imports: [
    BrowserModule,
    AppModule
  ],
})
export class HNClientApp {}
