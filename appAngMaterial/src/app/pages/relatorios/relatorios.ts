import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

interface Relatorio {
  nome: string;
  tipo: string;
  dataGeracao: Date;
  status: 'concluido' | 'processando' | 'erro';
}

@Component({
  selector: 'app-relatorios',
  imports: [DatePipe, MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatChipsModule],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.scss',
})
export class Relatorios {
  colunas = ['nome', 'tipo', 'dataGeracao', 'status', 'acoes'];

  relatorios = signal<Relatorio[]>([
    { nome: 'Vendas Mensal', tipo: 'Vendas', dataGeracao: new Date(2026, 7, 10), status: 'concluido' },
    { nome: 'Usuários Ativos', tipo: 'Usuários', dataGeracao: new Date(2026, 7, 8), status: 'concluido' },
    { nome: 'Projetos Trimestral', tipo: 'Projetos', dataGeracao: new Date(2026, 7, 5), status: 'processando' },
    { nome: 'Financeiro Anual', tipo: 'Financeiro', dataGeracao: new Date(2026, 6, 30), status: 'erro' },
  ]);

  statusLabel: Record<Relatorio['status'], string> = {
    concluido: 'Concluído',
    processando: 'Processando',
    erro: 'Erro',
  };

  getStatusLabel(status: Relatorio['status']): string {
    return this.statusLabel[status];
  }

  baixar(relatorio: Relatorio): void {
    // Lógica de download do relatório
    console.log('Baixar relatório', relatorio.nome);
  }
}
