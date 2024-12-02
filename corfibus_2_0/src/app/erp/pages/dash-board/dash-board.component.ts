import { Component, OnInit, signal } from '@angular/core';
import { DashBoardController } from '../../controllers/dashboard/dashboard.controller';

@Component({
  selector: 'dash-board',
  standalone: true,
  imports: [],
  templateUrl: './dash-board.component.html'
})
export class DashBoardComponent implements OnInit {

  protected classTemplate = signal<string>('jrrb-bg-color-b jrrb-color-a3 py-1 px-2 border jrrb-font-w-500 jrrb-font-w-500 text-uppercase rounded');
  protected classCard = signal<string>('border rounded bg-white mat-elevation-z1 d-flex flex-column py-3');
  protected classCardLabel = signal<string>('jrrb-color-a2 text-center');
  protected classCardInfo = signal<string>('fs-3 jrrb-color-a2 fw-bold text-center');

  protected controller: DashBoardController = new DashBoardController();

  public ngOnInit(): void {
    this.controller.GetListVendasEventuais();
  }
}
