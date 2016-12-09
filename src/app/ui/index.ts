import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {HnComment} from './hn-comment';
import {LiHnStory} from './li-hn-story';
import {LoadingSpinner} from './loading-spinner';
import {TimeAgo} from './timeAgo';

export const PUBLIC_DECLARATIONS = [
  HnComment,
  LiHnStory,
  LoadingSpinner,
  TimeAgo,
];

@NgModule({
  declarations: PUBLIC_DECLARATIONS,
  exports: [
    PUBLIC_DECLARATIONS,
    CommonModule,
    RouterModule,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class UiModule {}
