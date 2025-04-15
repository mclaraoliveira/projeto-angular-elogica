import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificaUsuarioComponent } from './componentes/verifica-usuario/verifica-usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VerificaUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'questao-10-post';
}
