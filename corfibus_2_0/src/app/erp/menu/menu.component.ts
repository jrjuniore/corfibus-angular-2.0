import { Component, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuAdministracaoComponent } from './menu-administracao.component';
import { MenuVeiculosComponent } from './menu-veiculos.component';
import { MenuVendasComponent } from './menu-vendas.component';
import { MenuFinanceiroComponent } from './menu-financeiro.component';
import { MenuRelatoriosComponent } from './menu-relatorios.component';
import { MenuSistemaComponent } from './menu-sistema.component';
import { CoreFrameworkService } from '../../core/core-framework.service';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MenuAdministracaoComponent, MenuVeiculosComponent, MenuVendasComponent,
    MenuFinanceiroComponent, MenuRelatoriosComponent, MenuSistemaComponent
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

    .sty_202513111010 {
      min-width: 100px;
      min-height: 70px;      
      max-height: 70px;      
    }
    `]
})
export class MenuComponent {

  protected menu_p2 = signal('p-2');
  protected coreFramework: CoreFrameworkService = inject(CoreFrameworkService);

  constructor() { }

}
