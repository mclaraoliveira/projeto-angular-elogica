import { Component, OnInit } from '@angular/core';
import { PensamentoService, Pensamento } from '../../shared/services/pensamentos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-mural',
  templateUrl: './pagina-mural.component.html',
  styleUrls: ['./pagina-mural.component.css']
})
export class PaginaMuralComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];

  constructor(
    private service: PensamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarPensamentos();
  }

  carregarPensamentos() {
    this.service.listar().subscribe((pensamentos) => {
      this.listaPensamentos = pensamentos;
    });
  }

  navegarParaFormulario() {
    this.router.navigate(['/formulario']);
  }

  // Mudança de cor da card dependendo do modelo escolhido

  buscarClasseCard(modelo: number): string {
    switch(modelo) {
      case 1: return 'card-azul-escuro';
      case 2: return 'card-azul-claro';
      case 3: return 'card-verde';
      default: return 'card-azul-escuro';
    }
  }

// Mudança de cor das aspas dependendo do modelo escolhido
  buscarClasseAspas(modelo: number): string {
    switch(modelo) {
      case 1: return 'aspas-azul-escuro';
      case 2: return 'aspas-azul-claro';
      case 3: return 'aspas-verde';
      default: return 'aspas-azul-escuro';
    }
  }

  // Modal do Sweet Alert

  confirmarDeletar(pensamento: Pensamento) {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletarPensamento(pensamento);
      }
    });
  }

  deletarPensamento(pensamento: Pensamento): void {
    if (pensamento.id !== undefined) {
      this.service.deletar(pensamento.id).subscribe({
        next: () => {
          Swal.fire(
            'Deletado!',
            'O pensamento foi deletado com sucesso.',
            'success'
          );
          this.carregarPensamentos();
        },
        error: (erro) => {
          console.error('Erro ao deletar pensamento:', erro);
          Swal.fire(
            'Erro!',
            'Ocorreu um erro ao tentar deletar o pensamento.',
            'error'
          );
        }
      });
    } else {
      console.error('ID do pensamento é undefined.');
      Swal.fire(
        'Erro!',
        'O ID do pensamento é inválido.',
        'error'
      );
    }
  }

  editarPensamento(pensamento: Pensamento) {
    // Navega para o formulário passando o pensamento como estado
    this.router.navigate(['/formulario'], {
      state: { pensamento: pensamento }
    });
  }

}
