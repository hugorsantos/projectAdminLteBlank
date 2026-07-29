import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  imports: [],
  templateUrl: './placeholder.html',
  styleUrl: './placeholder.scss',
})
export class Placeholder implements OnInit {
  private route = inject(ActivatedRoute);
  pageTitle = signal<string>('Página');

  ngOnInit(): void {
    // Captura dinamicamente o título injetado nas rotas
    this.pageTitle.set(this.route.snapshot.data['title'] || 'Página');
  }
}
