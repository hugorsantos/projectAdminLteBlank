import { Component, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/sidebar/sidebar';
import { Footer} from './components/footer/footer';
import { MenuService } from './core/services/menu.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    Navbar,
    Sidebar,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('appAngMaterial');

  // Injeção do Signal para sincronizar o gatilho da Navbar com a Sidebar
  menuService = inject(MenuService);
}
