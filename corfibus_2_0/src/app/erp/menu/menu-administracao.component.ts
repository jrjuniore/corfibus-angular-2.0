import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { JrrbButtonComponent } from '../../framework/components/jrrb-button.component';

@Component({
  selector: 'menu-administracao',
  standalone: true,
  imports: [MatMenuModule, JrrbButtonComponent],
  templateUrl: './menu-administracao.component.html'
})
export class MenuAdministracaoComponent {

}
