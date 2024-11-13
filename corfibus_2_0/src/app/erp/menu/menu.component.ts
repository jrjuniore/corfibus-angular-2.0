import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuAdministracaoComponent } from './menu-administracao.component';
import { MenuVeiculosComponent } from './menu-veiculos.component';
import { MenuVendasComponent } from './menu-vendas.component';
import { MenuFinanceiroComponent } from './menu-financeiro.component';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MenuAdministracaoComponent, MenuVeiculosComponent, MenuVendasComponent,
    MenuFinanceiroComponent
  ],
  templateUrl: './menu.component.html',
  styles: [`
    .sty_2024111121628 {
      height: 100vh;
      overflow-y: auto;      
    }   
    
    .sty_202411122321 {
      min-height: 4rem
    }
    `]
})
export class MenuComponent {

  protected menu_p2 = signal('p-2');
  protected menuIsOpen: boolean = false;

  protected CloseOpenMenu(): void {
    this.menuIsOpen = !this.menuIsOpen;
  }

}
