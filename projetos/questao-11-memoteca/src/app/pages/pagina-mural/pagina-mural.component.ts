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

  // Paginação
  paginaAtual: number = 1;
  itensPorPagina: number = 9;
  totalPensamentos: number = 0;

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
      this.totalPensamentos = pensamentos.length;
    });
  }

  // Getter pra calcular o total de páginas
  get totalPaginas(): number {
    return Math.ceil(this.totalPensamentos / this.itensPorPagina);
  }

  // Getter pra pegar pensamentos da página atual
  get pensamentosPaginaAtual(): Pensamento[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.listaPensamentos.slice(inicio, fim);
  }

  // Método pra mudar de página
  mudarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
      window.scrollTo(0, 0); // Rolagem
    }
  }

  navegarParaFormulario() {
    this.router.navigate(['/formulario']);
  }

  // Pra mudar a cor da sombra do card de acordo com o modelo
  buscarClasseCard(modelo: number): string {
    switch(modelo) {
      case 1: return 'card-azul-escuro';
      case 2: return 'card-azul-claro';
      case 3: return 'card-verde';
      default: return 'card-azul-escuro';
    }
  }

  // Pra mudar a cor das aspas de acordo com o modelo
  buscarClasseAspas(modelo: number): string {
    switch(modelo) {
      case 1: return 'aspas-azul-escuro';
      case 2: return 'aspas-azul-claro';
      case 3: return 'aspas-verde';
      default: return 'aspas-azul-escuro';
    }
  }

  // Modal com Sweet Alert
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
    }
  }

  editarPensamento(pensamento: Pensamento) {
    this.router.navigate(['/formulario'], {
      state: { pensamento: pensamento }
    });
  }
}
