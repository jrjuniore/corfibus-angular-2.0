import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dash-board',
    loadComponent: () =>
      import('../app/erp/pages/dash-board/dash-board.component').then((m) => m.DashBoardComponent)
  },
];
