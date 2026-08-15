import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Faq {
  pergunta: string;
  resposta: string;
}

@Component({
  selector: 'app-ajuda',
  imports: [MatCardModule, MatExpansionModule, MatIconModule, MatButtonModule],
  templateUrl: './ajuda.html',
  styleUrl: './ajuda.scss',
})
export class Ajuda {
  faqs = signal<Faq[]>([
    {
      pergunta: 'Como criar um novo usuário?',
      resposta: 'Acesse o menu Usuários > Novo Usuário, preencha os dados obrigatórios e clique em salvar.',
    },
    {
      pergunta: 'Como gerar um relatório?',
      resposta: 'No menu Relatórios, selecione o tipo desejado e clique em gerar. O download fica disponível quando o status estiver como "Concluído".',
    },
    {
      pergunta: 'Como alterar o idioma do sistema?',
      resposta: 'Acesse o menu Configurações e, na seção Preferências, selecione o idioma desejado.',
    },
    {
      pergunta: 'Esqueci minha senha, o que fazer?',
      resposta: 'Na tela de login, clique em "Esqueci minha senha" e siga as instruções enviadas para o seu e-mail.',
    },
  ]);

  abrirSuporte(): void {
    // Lógica para abrir canal de suporte
    console.log('Abrindo canal de suporte');
  }
}
