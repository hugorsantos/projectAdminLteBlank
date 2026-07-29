import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  icon: string;
  route?: string;
  submenu?: { title: string; route: string }[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  // Lista estruturada de itens para escalabilidade futura
  menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: 'home', route: '/dashboard' },
    {
      title: 'Usuários',
      icon: 'person',
      submenu: [
        { title: 'Lista de Usuários', route: '/usuarios/lista' },
        { title: 'Novo Usuário', route: '/usuarios/novo' }
      ]
    },
    {
      title: 'Projetos',
      icon: 'folder',
      submenu: [
        { title: 'Meus Projetos', route: '/projetos/meus-projetos' },
        { title: 'Novo Projeto', route: '/projetos/novo' }
      ]
    },
    { title: 'Relatórios', icon: 'bar_chart', route: '/relatorios' },
    { title: 'Configurações', icon: 'settings', route: '/configuracoes' },
    { title: 'Ajuda', icon: 'help_outline', route: '/ajuda' }
  ];

  // Signal para controlar quais submenus estão expandidos
  expandedSubmenus = signal<Set<string>>(new Set());

  toggleSubmenu(title: string): void {
    const current = new Set(this.expandedSubmenus());
    if (current.has(title)) {
      current.delete(title);
    } else {
      current.add(title);
    }
    this.expandedSubmenus.set(current);
  }

  isSubmenuExpanded(title: string): boolean {
    return this.expandedSubmenus().has(title);
  }
}
