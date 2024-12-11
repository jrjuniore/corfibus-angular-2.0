import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'autenticacao',
    loadComponent: () =>
      import('../app/erp/pages/autenticacao/autenticacao.component').then((m) => m.AutenticacaoComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../app/erp/pages/dash-board/dash-board.component').then((m) => m.DashBoardComponent)
  },
  {
    path: 'agenda',
    loadComponent: () =>
      import('../app/erp/pages/agenda/agenda.component').then((m) => m.AgendaComponent)
  },
  {
    path: 'confirmar-nova-conta',
    loadComponent: () =>
      import('../app/erp/pages/autenticacao/confirm-new-empresa.component').then((m) => m.ConfirmNewEmpresaComponent)
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('../app/erp/pages/licenca/licenca.component').then((m) => m.LicencaComponent),
  },
  {
    path: 'tabelas/gerais/tipos-documentos',
    loadComponent: () =>
      import('../app/erp/pages/tipos-documentos/tipos-documentos.component').then((m) => m.TiposDocumentosComponent),
  }
];
