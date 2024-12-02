import { Component, OnDestroy, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuAdministracaoComponent } from './menu-administracao.component';
import { MenuVeiculosComponent } from './menu-veiculos.component';
import { MenuVendasComponent } from './menu-vendas.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuFinanceiroComponent } from './menu-financeiro.component';
import { MenuRelatoriosComponent } from './menu-relatorios.component';
import { MenuSistemaComponent } from './menu-sistema.component';
import { CoreFrameworkService } from '../../core/core-framework.service';
import { MatMenuModule } from '@angular/material/menu';
import { JrrbButtonComponent } from '../../framework/components/jrrb-button/jrrb-button.component';
import { CoreObservableService } from '../../core/core-observable.service';
import { environment } from '../../../environments/environment';
import { HelperUtilsClass } from '../../share/class-utils/helper-utils.class';
import { Subscription } from 'rxjs';
import { ConfigSystemMapperClass } from '../pages/config-system/config-system.mapper';
import { MenuController } from './menu.controller';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [MatMenuModule, MatExpansionModule, MatSidenavModule, MatToolbarModule, MenuAdministracaoComponent, MenuVeiculosComponent, MenuVendasComponent,
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
      max-width: 106px;
      min-width: 106px;
      max-height: 154px;      
      min-height: 154px;      
    }

    .sty_202514111928 {
      max-width: 210px;
      min-width: 210px;
      max-height: 70px;      
      min-height: 70px;      
    }    
    `]
})
export class MenuComponent implements OnDestroy {

  protected menu_p2 = signal('pb-2');

  protected infoImageLic = signal('/assets/images/common/emptyPhoto.png');
  protected imageFileDefault = signal('/assets/images/common/emptyPhoto.png');
  protected infoLicApelido = signal(environment.userErp.iInfoEmpresa.apelido);
  protected infoLoginGrupo = signal(environment.userErp.iInfoLogin.nomeGrupo);
  protected infoLoginUsuario = signal(environment.userErp.iInfoLogin.usuario);

  protected controller: MenuController = new MenuController();

  private sub: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();

  constructor(private coreObservable: CoreObservableService, protected coreFramework: CoreFrameworkService) {
    this.sub =
      this.coreObservable.GetUsuarioLogadoImage()
        .subscribe((imageUser: string | undefined) => {
          if (!HelperUtilsClass.StringIsEmpty(imageUser)) {
            this.imageFileDefault.set(imageUser!);
          }
        });

    this.sub2 =
      this.coreObservable.GetClienteLogado()
        .subscribe((clienteLogado: boolean) => {
          if (clienteLogado) {
            this.infoImageLic.set(ConfigSystemMapperClass.GetValueMapper(ConfigSystemMapperClass.LOGO_SISTEMA));
          }
        });
  }

  protected ToLogOut(): void {
    environment.userErp.userConnected = false;
    this.coreObservable.SetUsuarioLogado(environment.userErp.userConnected);
    this.coreObservable.SetClienteLogado(environment.userErp.userConnected);
  }

  protected NavigateToLicenca(): void {
    this.controller.NavigateTo('registro', environment.userErp.userConnected);
  }

  protected NavigateToDashBoard(): void {
    this.controller.NavigateTo('dashboard', environment.userErp.userConnected);
  }

  protected NavigateToHome(): void {
    this.controller.NavigateTo('agenda', environment.userErp.userConnected);
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.controller.Finalize();
  }

}
