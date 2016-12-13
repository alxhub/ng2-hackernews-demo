import {Component, Input} from '@angular/core';
import {Story, ExComment} from '../../util/api';

@Component({
  moduleId: module.id,
  selector: '[hn-story]',
  templateUrl: './template.html',
  styleUrls: ['./style.css'],
})
export class HnStory {
  @Input('story') story: Story;
}
