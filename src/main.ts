import {HNClientAppNgFactory} from '../ngfactory/src/app/env/client.ngfactory';
import {platformBrowser} from '@angular/platform-browser';
import {enableProdMode} from '@angular/core';
import {hydrateHttpCache} from './app/client/http';

enableProdMode();
hydrateHttpCache();
platformBrowser().bootstrapModuleFactory(HNClientAppNgFactory)
