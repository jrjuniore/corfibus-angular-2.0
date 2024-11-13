import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { JrrbButtonComponent } from '../../framework/components/jrrb-button.component';

@Component({
  selector: 'menu-veiculos',
  standalone: true,
  imports: [MatMenuModule, JrrbButtonComponent],
  templateUrl: './menu-veiculos.component.html'
})
export class MenuVeiculosComponent {

}
