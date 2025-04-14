import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponentQ9 implements OnInit {
  // Implementa a interface OnInit
  formulario!: FormGroup; // Usei ! aqui pra avisar que vai ser inicializado depois
  estados: string[] = ['Pernambuco', 'São Paulo'];
  cidades: string[] = [];

  constructor(private fb: FormBuilder) {}

  // Usei o ngOnInit para montar o formulário porque é o momento certo pra colocar a lógica de inicialização do componente. Fiz isso no ngOnInit em vez do construtor porque geralmente o construtor serve apenas para injetar as dependências, enquanto o ngOnInit é o lugar certo pra configurar o que o componente vai precisar quando ele for exibido.
  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      instituicao: [''],
    });
  }

  // Getter pra facilitar na hora de escrever o acesso aos controles do formulário no HTML
  get f() {
    return this.formulario.controls;
  }

  // Método chamado quando submete o formulário
  onSubmit() {
    if (this.formulario.valid) {
      console.log('Formulário enviado:', this.formulario.value);
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  // Método chamado quando o estado é mudado
  onEstadoChange() {
    const estado = this.formulario.get('estado')?.value;

    if (estado === 'São Paulo') {
      this.cidades = ['São Paulo', 'Campinas', 'Santos'];
    } else if (estado === 'Pernambuco') {
      this.cidades = ['Recife', 'Olinda', 'Paulista'];
    } else {
      this.cidades = [];
    }
    // Dá reset na cidade se o estado for mudado
    this.formulario.get('cidade')?.reset();
  }
}
