import {Component, Input} from '@angular/core';
import {Story} from '../../util/api';

@Component({
  moduleId: module.id,
  selector: 'li[hn-story]',
  templateUrl: './template.html',
  styleUrls: ['./style.css'],
})
export class LiHnStory {
  @Input('hn-story') story: Story;
}
