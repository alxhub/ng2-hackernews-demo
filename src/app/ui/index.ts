import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HnComment} from './hn-comment';
import {HnItem} from './hn-item';

export const PUBLIC_DECLARATIONS = [
  HnComment,
  HnItem,
];

@NgModule({
  declarations: PUBLIC_DECLARATIONS,
  exports: PUBLIC_DECLARATIONS,
  imports: [
    CommonModule,
  ],
})
export class UiModule {}
