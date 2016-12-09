import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core'

import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/share'

@Component({
  moduleId: module.id,
  selector: '[list-item]',
  template: `
    
  `,
  styleUrls: ['./list.item.css']

})
export class ListItem {
  _item:any;
  @Input()
  set item(v){
    this._item = v;
  }
  get item(){
    return this._item || {}
  }
}


