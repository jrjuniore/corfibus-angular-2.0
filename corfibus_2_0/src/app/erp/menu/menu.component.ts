import { Component, input, OnDestroy, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuAdministracaoComponent } from './menu-administracao.component';
import { MenuVeiculosComponent } from './menu-veiculos.component';
import { MenuVendasComponent } from './menu-vendas.component';
import { MenuFinanceiroComponent } from './menu-financeiro.component';
import { MenuRelatoriosComponent } from './menu-relatorios.component';
import { MenuSistemaComponent } from './menu-sistema.component';
import { CoreFrameworkService } from '../../core/core-framework.service';
import { MatMenuModule } from '@angular/material/menu';
import { JrrbButtonComponent } from '../../framework/components/jrrb-button/jrrb-button.component';
import { CoreObservableService } from '../../core/core-observable.service';
import { environment } from '../../../environments/environment';
import { CoreErpService } from '../../core/core-erp.service';
import { HelperUtilsClass } from '../../share/class-utils/helper-utils.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [MatMenuModule, MatSidenavModule, MatToolbarModule, MenuAdministracaoComponent, MenuVeiculosComponent, MenuVendasComponent,
    MenuFinanceiroComponent, MenuRelatoriosComponent, MenuSistemaComponent, JrrbButtonComponent
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
      min-width: 106px;
      max-width: 106px;
      min-height: 154px;      
      max-height: 154px;      
    }
    `]
})
export class MenuComponent implements OnDestroy {

  protected menu_p2 = signal('p-2');

  protected imageFileDefault = signal('/assets/images/common/emptyPhoto.png');
  protected infoLicApelido = signal(environment.userErp.iInfoEmpresa.apelido);
  protected infoLoginGrupo = signal(environment.userErp.iInfoLogin.nomeGrupo);
  protected infoLoginUsuario = signal(environment.userErp.iInfoLogin.usuario);

  private sub: Subscription = new Subscription();


  constructor(private coreObservable: CoreObservableService, protected coreFramework: CoreFrameworkService) { 
    this.sub = 
      this.coreObservable.GetUsuarioLogadoImage()
        .subscribe((imageUser: string | undefined) => {
          if (!HelperUtilsClass.StringIsEmpty(imageUser))
            this.imageFileDefault.set(imageUser!);
        })
  }


  protected ToLogOut(): void {
    environment.userErp.userConnected = false;
    this.coreObservable.SetUsuarioLogado(environment.userErp.userConnected);
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
