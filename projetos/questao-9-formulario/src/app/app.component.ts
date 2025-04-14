import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponentQ9 } from "./componentes/formulario/formulario.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormularioComponentQ9],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'questao-9-formulario';
}
