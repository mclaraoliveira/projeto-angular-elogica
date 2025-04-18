import { Routes } from '@angular/router';
import { PaginaMuralComponent } from './pages/pagina-mural/pagina-mural.component';
import { PaginaFormularioComponent } from './pages/pagina-formulario/pagina-formulario.component';

export const routes: Routes = [
  { path: '', component: PaginaMuralComponent },
  { path: 'mural', component: PaginaMuralComponent },
  { path: 'formulario', component: PaginaFormularioComponent },
  { path: '**', redirectTo: '/mural' } // Redireciona para mural se a rota não existir
];
