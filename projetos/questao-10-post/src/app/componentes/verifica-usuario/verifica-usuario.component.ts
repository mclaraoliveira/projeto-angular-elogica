import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verifica-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verifica-usuario.component.html',
  styleUrls: ['./verifica-usuario.component.css']
})
export class VerificaUsuarioComponent {
  usuarioAtivo: boolean | null = null;

  constructor(private usuarioService: UsuarioService) {}

  verificarStatus(usuarioId: string): void {
    const id = Number(usuarioId);
    this.usuarioService.verificarUsuarioAtivo(id).subscribe({
      next: (response) => {
        this.usuarioAtivo = response.ativo;
      },
      error: (err) => {
        console.error('Erro ao verificar usuário:', err);
      }
    });
  }
}
