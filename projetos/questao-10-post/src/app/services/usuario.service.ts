import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }
// Fiz um get pra simular que estou buscando o conteúdo de um post
  verificarUsuarioAtivo(usuarioId: number): Observable<{ ativo: boolean }> {
    return this.http.get<{ ativo: boolean }>(`${this.apiUrl}/${usuarioId}`);
  }
}
