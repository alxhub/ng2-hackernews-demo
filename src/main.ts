import {HNClientAppNgFactory} from '../ngfactory/src/app/env/client.ngfactory';
import {platformBrowser} from '@angular/platform-browser'
import {enableProdMode} from '@angular/core'
enableProdMode();
platformBrowser().bootstrapModuleFactory(HNClientAppNgFactory)
