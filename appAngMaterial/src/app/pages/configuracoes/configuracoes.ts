import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-configuracoes',
  imports: [
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.scss',
})
export class Configuracoes {
  notificacoesEmail = signal<boolean>(true);
  notificacoesPush = signal<boolean>(false);
  temaEscuro = signal<boolean>(false);
  idioma = signal<string>('pt-BR');

  idiomas = [
    { valor: 'pt-BR', label: 'Português (Brasil)' },
    { valor: 'en-US', label: 'English (US)' },
    { valor: 'es-ES', label: 'Español' },
  ];

  salvar(): void {
    // Lógica de persistência das configurações
    console.log('Configurações salvas', {
      notificacoesEmail: this.notificacoesEmail(),
      notificacoesPush: this.notificacoesPush(),
      temaEscuro: this.temaEscuro(),
      idioma: this.idioma(),
    });
  }
}
