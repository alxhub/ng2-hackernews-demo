/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from '../../../../app/feed-view/spinner.component';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/element';
import * as import4 from '@angular/core/src/linker/view_utils';
import * as import5 from '@angular/core/src/di/injector';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/change_detection';
import * as import8 from '@angular/core/src/metadata/view';
import * as import9 from '@angular/core/src/linker/component_factory';
export class Wrapper_Spinner {
  context:import0.Spinner;
  changed:boolean;
  constructor() {
    this.changed = false;
    this.context = new import0.Spinner();
  }
  detectChangesInternal(view:import1.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this.changed;
    this.changed = false;
    return changed;
  }
}
var renderType_Spinner_Host:import2.RenderComponentType = (null as any);
class _View_Spinner_Host0 extends import1.AppView<any> {
  _el_0:any;
  /*private*/ _appEl_0:import3.AppElement;
  _Spinner_0_4:Wrapper_Spinner;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement) {
    super(_View_Spinner_Host0,renderType_Spinner_Host,import6.ViewType.HOST,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import3.AppElement {
    this._el_0 = this.selectOrCreateHostElement('loading-spinner',rootSelector,(null as any));
    this._appEl_0 = new import3.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = viewFactory_Spinner0(this.viewUtils,this.injector(0),this._appEl_0);
    this._Spinner_0_4 = new Wrapper_Spinner();
    this._appEl_0.initComponent(this._Spinner_0_4.context,([] as any[]),compView_0);
    compView_0.create(this._Spinner_0_4.context,this.projectableNodes,(null as any));
    this.init(([] as any[]).concat([this._el_0]),[this._el_0],([] as any[]),([] as any[]));
    return this._appEl_0;
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.Spinner) && (0 === requestNodeIndex))) { return this._Spinner_0_4.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._Spinner_0_4.detectChangesInternal(this,this._el_0,throwOnChange);
    this.detectContentChildrenChanges(throwOnChange);
    this.detectViewChildrenChanges(throwOnChange);
  }
}
function viewFactory_Spinner_Host0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement):import1.AppView<any> {
  if ((renderType_Spinner_Host === (null as any))) { (renderType_Spinner_Host = viewUtils.createRenderComponentType('',0,import8.ViewEncapsulation.None,([] as any[]),{})); }
  return new _View_Spinner_Host0(viewUtils,parentInjector,declarationEl);
}
export const SpinnerNgFactory:import9.ComponentFactory<import0.Spinner> = new import9.ComponentFactory<import0.Spinner>('loading-spinner',viewFactory_Spinner_Host0,import0.Spinner);
const styles_Spinner:any[] = ['.spinner[_ngcontent-%COMP%] {\n	position: fixed;\n	z-index: 999;\n	right: 15px;\n	bottom: 15px;\n	opacity: 0;\n	transition: opacity 0.15s ease;\n	animation: rotator 1.4s linear infinite;\n	animation-play-state: paused;\n}\n\n.spinner.show[_ngcontent-%COMP%] {\n	opacity: 1;\n	animation-play-state: running;\n}\n\n.spinner[_ngcontent-%COMP%]   .path[_ngcontent-%COMP%] {\n	stroke: #f60;\n	stroke-dasharray: 126;\n	stroke-dashoffset: 0;\n	transform-origin: center;\n	animation: dash 1.4s ease-in-out infinite;\n}\n\n@-moz-keyframes rotator {\n	0% {\n		transform: scale(0.5) rotate(0deg);\n	}\n\n	100% {\n		transform: scale(0.5) rotate(270deg);\n	}\n}\n\n@-webkit-keyframes rotator {\n	0% {\n		transform: scale(0.5) rotate(0deg);\n	}\n\n	100% {\n		transform: scale(0.5) rotate(270deg);\n	}\n}\n\n@-o-keyframes rotator {\n	0% {\n		transform: scale(0.5) rotate(0deg);\n	}\n\n	100% {\n		transform: scale(0.5) rotate(270deg);\n	}\n}\n\n@keyframes rotator {\n	0% {\n		transform: scale(0.5) rotate(0deg);\n	}\n\n	100% {\n		transform: scale(0.5) rotate(270deg);\n	}\n}\n\n@-moz-keyframes dash {\n	0% {\n		stroke-dashoffset: 126;\n	}\n\n	50% {\n		stroke-dashoffset: 63;\n		transform: rotate(135deg);\n	}\n\n	100% {\n		stroke-dashoffset: 126;\n		transform: rotate(450deg);\n	}\n}\n\n@-webkit-keyframes dash {\n	0% {\n		stroke-dashoffset: 126;\n	}\n\n	50% {\n		stroke-dashoffset: 63;\n		transform: rotate(135deg);\n	}\n\n	100% {\n		stroke-dashoffset: 126;\n		transform: rotate(450deg);\n	}\n}\n\n@-o-keyframes dash {\n	0% {\n		stroke-dashoffset: 126;\n	}\n\n	50% {\n		stroke-dashoffset: 63;\n		transform: rotate(135deg);\n	}\n\n	100% {\n		stroke-dashoffset: 126;\n		transform: rotate(450deg);\n	}\n}\n\n@keyframes dash {\n	0% {\n		stroke-dashoffset: 126;\n	}\n\n	50% {\n		stroke-dashoffset: 63;\n		transform: rotate(135deg);\n	}\n\n	100% {\n		stroke-dashoffset: 126;\n		transform: rotate(450deg);\n	}\n}'];
var renderType_Spinner:import2.RenderComponentType = (null as any);
class _View_Spinner0 extends import1.AppView<import0.Spinner> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _text_5:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement) {
    super(_View_Spinner0,renderType_Spinner,import6.ViewType.COMPONENT,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import3.AppElement {
    const parentRenderNode:any = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n   ',(null as any));
    this._el_1 = this.renderer.createElement(parentRenderNode,':svg:svg',(null as any));
    this.renderer.setElementAttribute(this._el_1,'class','show');
    this.renderer.setElementAttribute(this._el_1,'height','44px');
    this.renderer.setElementAttribute(this._el_1,'viewBox','0 0 44 44');
    this.renderer.setElementAttribute(this._el_1,'width','44px');
    this._text_2 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._el_3 = this.renderer.createElement(this._el_1,':svg:circle',(null as any));
    this.renderer.setElementAttribute(this._el_3,'class','path');
    this.renderer.setElementAttribute(this._el_3,'cx','22');
    this.renderer.setElementAttribute(this._el_3,'cy','22');
    this.renderer.setElementAttribute(this._el_3,'fill','none');
    this.renderer.setElementAttribute(this._el_3,'r','20');
    this.renderer.setElementAttribute(this._el_3,'stroke-linecap','round');
    this.renderer.setElementAttribute(this._el_3,'stroke-width','4');
    this._text_4 = this.renderer.createText(this._el_1,'\n   ',(null as any));
    this._text_5 = this.renderer.createText(parentRenderNode,'\n\n  ',(null as any));
    this.init(([] as any[]),[
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._text_5
    ]
    ,([] as any[]),([] as any[]));
    return (null as any);
  }
}
export function viewFactory_Spinner0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import3.AppElement):import1.AppView<import0.Spinner> {
  if ((renderType_Spinner === (null as any))) { (renderType_Spinner = viewUtils.createRenderComponentType('',0,import8.ViewEncapsulation.Emulated,styles_Spinner,{})); }
  return new _View_Spinner0(viewUtils,parentInjector,declarationEl);
}