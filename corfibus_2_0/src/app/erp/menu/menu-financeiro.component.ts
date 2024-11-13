import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { JrrbButtonComponent } from '../../framework/components/jrrb-button.component';

@Component({
  selector: 'menu-financeiro',
  standalone: true,
  imports: [MatMenuModule, JrrbButtonComponent],
  templateUrl: './menu-financeiro.component.html'
})
export class MenuFinanceiroComponent {

}
