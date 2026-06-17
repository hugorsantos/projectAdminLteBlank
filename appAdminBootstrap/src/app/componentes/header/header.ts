import { Component, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../../shared/sidebar-component/sidebar-component';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  private offcanvasService = inject(NgbOffcanvas);

  openSidebar() {
    this.offcanvasService.open(SidebarComponent);
  }
}
