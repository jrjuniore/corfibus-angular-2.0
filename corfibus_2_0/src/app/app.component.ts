import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './erp/menu/menu.component';
import { JrrbMessagesGenericComponent } from './framework/components/jrrb-messages/jrrb-messages-generic.component';
import { AppController } from './erp/controllers/app/app.controller';
import { HelperUtilsClass } from './share/class-utils/helper-utils.class';
import { CoreObservableService } from './core/core-observable.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, JrrbMessagesGenericComponent],
  templateUrl: './app.component.html',
  styles: [`
    .sty_202411131335 {
      position: fixed;
      width: 100%;
      z-index: 999999999;
      cursor: wait;
      height: 100%;
      bottom: 0;
      background-color: var(--jrrbColorB3);
      left: 0;
      right: 0;      
    }
    `]
})

export class AppComponent implements OnInit {

  protected userConnected = signal(false);
  protected controller: AppController = new AppController();

  protected infoLicApelido?: string;
  protected infoLoginGrupo?: string;
  protected infoLoginUsuario?: string;

  constructor(private coreObservable: CoreObservableService) {
    this.controller.coreRouter.coreErp.LoadSessionStorage();

    this.coreObservable.GetUsuarioLogado()
      .subscribe((pUsuarioLogado: boolean) => {

        this.GetInfoUserLogged();

        //apenas o logout alterará o usuarioLogado para FALSE
        if (environment.userErp.userConnected && !pUsuarioLogado) {
          this.userConnected.set(environment.userErp.userConnected!);
          return;
        }

        //se os dois estiverem FALSE é logout
        if (!environment.userErp.userConnected && !pUsuarioLogado) {
          this.controller.ResetTimeOut();
          this.controller.ToLogOut();
        }

        if (pUsuarioLogado)
          this.controller.ToLogin();

        this.userConnected.set(environment.userErp.userConnected);
      });
  }

  public ngOnInit(): void {
    if (this.ConfirmarNovaConta())
      return;

    this.InitApp();
  }

  protected ToDeslogAuto(): void {
    this.controller.DeslogarAutomaticamente();
  }

  protected ToSetDeslogAuto(): void {
    this.controller.StartDeslogarEm();
  }

  private GetInfoUserLogged(): void {
    this.GetImageUser();
    this.GetInfoEmpresa();
  }

  private GetImageUser(): void {

    //Obtendo a imagem do login do usuário
    this.controller.SetImageLogin()
      .subscribe((dataSuccess: any) => {
        if (!HelperUtilsClass.StringIsEmpty(dataSuccess.response))
          this.coreObservable.SetUsuarioLogadoImage(dataSuccess.response)
        else
          this.coreObservable.SetUsuarioLogadoImage('/assets/images/common/emptyPhoto.png')

        this.controller.coreRouter.coreBrowser.LoadOk();
      });
  }

  private GetInfoEmpresa(): void {
    //Obtendo as informações da empresa "logada"
    let infoEmpresa: string[] = this.controller.GetInfoEmpresa();

    if (!HelperUtilsClass.ListIsEmpty(infoEmpresa)) {
      this.infoLicApelido = infoEmpresa[0];
      this.infoLoginGrupo = infoEmpresa[1];
      this.infoLoginUsuario = infoEmpresa[2];
    }
  }

  private ConfirmarNovaConta(): boolean {
    let _window = this.controller.coreRouter.coreBrowser.GetWindow();

    if (_window)
      return _window.location.href.indexOf("confirmar-nova-conta") >= 0;

    return false;
  }

  private InitApp(): void {
    if (!this.userConnected()) {
      this.controller.NavigateToAutenticacao(this.userConnected());
      return;
    }

    this.controller.NavigateToMenuAcionado(this.userConnected());
  }

}
