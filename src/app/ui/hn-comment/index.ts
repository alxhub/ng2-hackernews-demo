import {Component} from '@angular/core';
import {Api, ExComment} from '../../util/api';

@Component({
  moduleId: module.id,
  selector: '[hn-comment]',
  templateUrl: './template.html',
  styleUrls: ['./style.css'],
  inputs: ['comment'],
})
export class HnComment {
  open: boolean = false;
  hasAsyncComments: boolean = false;
  _comment: ExComment;

  constructor(public api: Api) {}

  get comment(): ExComment {
    return this._comment;
  }

  set comment(val: ExComment) {
    this._comment = val;
    if (val && val.kids && val.kids.length > 0 && (!val.children || val.children.length === 0)) {
      this.open = false;
      this.hasAsyncComments = true;
    } else {
      this.open = true;
    }
  }

  toggle(): void {
    this.open = !this.open;
    if (this.hasAsyncComments) {
      this.hasAsyncComments = false;
      this.api.getComment(this.comment.id).subscribe(comment => {
        if (this._comment.id === comment.id) {
          this._comment = comment;
        }
      });
    }
  }
}
