import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'usuarios/lista',
    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder),
    data: { title: 'Lista de Usuários' }
  },
  {
    path: 'usuarios/novo',
    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder),
    data: { title: 'Novo Usuário' }
  },
  {
    path: 'projetos/meus-projetos',
    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder),
    data: { title: 'Meus Projetos' }
  },
  {
    path: 'projetos/novo',
    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder),
    data: { title: 'Novo Projeto' }
  },
  {
    path: 'relatorios',
    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder),
    data: { title: 'Relatórios' }
  },
  {
    path: 'configuracoes',
    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder),
    data: { title: 'Configurações' }
  },
  {
    path: 'ajuda',
    loadComponent: () => import('./pages/placeholder/placeholder').then(m => m.Placeholder),
    data: { title: 'Ajuda' }
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
