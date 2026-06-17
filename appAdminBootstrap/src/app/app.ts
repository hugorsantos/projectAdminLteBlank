import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './componentes/header/header';
import { Menu } from './componentes/menu/menu';
import { Footer } from './componentes/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Menu, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('appAdminBootstrap');
}
