import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './componentes/formulario/formulario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormularioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'questao-8-formulario';
}

