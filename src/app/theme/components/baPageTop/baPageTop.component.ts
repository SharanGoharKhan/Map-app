import { Component, NgModule } from '@angular/core';
import { DefaultModal } from '././default-modal/default-modal.component';
import { GlobalState } from '../../../global.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
// @NgModule({
//   imports: [
//     NgbModalModule
//   ],
//   declarations: [
//    DefaultModal
//   ],
//   entryComponents: [
//     DefaultModal
//   ],
//   providers: [
//     DefaultModal
//   ]
// })
export class BaPageTop {

  isScrolled: boolean = false;
  isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState, private modalService: NgbModal) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
  lgModalShow() {
    const activeModal = this.modalService.open(DefaultModal, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'Please enter place';
  }
}
