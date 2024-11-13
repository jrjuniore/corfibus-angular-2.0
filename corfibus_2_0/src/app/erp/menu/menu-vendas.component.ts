import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { JrrbButtonComponent } from '../../framework/components/jrrb-button.component';

@Component({
  selector: 'menu-vendas',
  standalone: true,
  imports: [MatMenuModule, JrrbButtonComponent],
  templateUrl: './menu-vendas.component.html'
})
export class MenuVendasComponent {

}
