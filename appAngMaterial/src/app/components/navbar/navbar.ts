import { Component, inject } from '@angular/core';
import { MenuService } from '../../core/services/menu.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {


  private menuService = inject(MenuService);

  toggleMenu(): void  {
    this.menuService.toggleSidebar();
  }

}
