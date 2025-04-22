import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PensamentoService } from '../../shared/services/pensamentos.service';
import { Pensamento } from '../../shared/services/pensamentos.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pagina-formulario.component.html',
  styleUrls: ['./pagina-formulario.component.css']
})
export class PaginaFormularioComponent {
  formulario: FormGroup;
  pensamentoParaEditar?: Pensamento;
  estaEditando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pensamentoService: PensamentoService
  ) {
    // Verifica se tem um pensamento no estado da rota pra editar
    const navegacaoAtual = this.router.getCurrentNavigation();
    this.pensamentoParaEditar = navegacaoAtual?.extras.state?.['pensamento'];
    this.estaEditando = !!this.pensamentoParaEditar;

    this.formulario = this.fb.group({
      pensamento: ['', [Validators.required, Validators.maxLength(300)]],
      autor: ['', [Validators.required, Validators.maxLength(50)]],
      modelo: ['1', Validators.required]
    });

    // Se estiver editando, preenche o formulário com os dados existentes
    if (this.estaEditando) {
      this.carregarDadosParaEdicao();
    }
  }

  // Carrega os dados do pensamento no formulário pra edição
  carregarDadosParaEdicao() {
    if (this.pensamentoParaEditar) {
      this.formulario.patchValue({
        pensamento: this.pensamentoParaEditar.pensamento,
        autor: this.pensamentoParaEditar.autor,
        modelo: this.pensamentoParaEditar.modelo.toString()
      });
    }
  }

  // Getter pra facilitar o acesso aos controles
  get f() {
    return this.formulario.controls;
  }

  // Limpa os campos do formulário
  limparCampos() {
    this.formulario.reset({
      modelo: '1'
    });
  }

  // Cancela a operação
  cancelar() {
    this.limparCampos();
    this.voltarParaMural();
  }

  // Volta pra a página do mural
  voltarParaMural() {
    this.router.navigate(['/mural']);
  }

  // Envia o formulário (criação ou edição)
  onSubmit() {
    if (this.formulario.valid) {
      const pensamento: Pensamento = {
        pensamento: this.formulario.value.pensamento,
        autor: this.formulario.value.autor,
        modelo: Number(this.formulario.value.modelo)
      };

      if (this.estaEditando && this.pensamentoParaEditar?.id) {
        // Se estiver editando, chama o método de atualização
        pensamento.id = this.pensamentoParaEditar.id;
        this.atualizarPensamento(pensamento);
      } else {
        // Se for novo, chama o método de criação
        this.criarPensamento(pensamento);
      }
    }
  }

  // Cria um novo pensamento
  criarPensamento(pensamento: Pensamento) {
    this.pensamentoService.criar(pensamento).subscribe({
      next: () => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Pensamento criado com sucesso!',
          icon: 'success'
        }).then(() => {
          this.limparCampos();
        });
      },
      error: (erro) => {
        console.error('Erro ao criar pensamento', erro);
        Swal.fire('Erro!', 'Não foi possível criar o pensamento', 'error');
      }
    });
  }

  // Atualiza um pensamento existente
  atualizarPensamento(pensamento: Pensamento) {
    if (!pensamento.id) return;

    this.pensamentoService.atualizar(pensamento).subscribe({
      next: () => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Pensamento atualizado com sucesso!',
          icon: 'success'
        }).then(() => {
          this.voltarParaMural();
        });
      },
      error: (erro) => {
        console.error('Erro ao atualizar pensamento', erro);
        Swal.fire('Erro!', 'Não foi possível atualizar o pensamento', 'error');
      }
    });
  }
}
