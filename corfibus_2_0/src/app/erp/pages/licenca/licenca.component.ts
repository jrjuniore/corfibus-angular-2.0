import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigSystemMapperClass } from '../config-system/config-system.mapper';
import { TermoAdesaoComponent } from './termo-adesao.component';
import { LibraryUtilsClass } from '../../../share/class-utils/library-utils.class';
import { environment } from '../../../../environments/environment';
import { ApiRouteUtilsClass } from '../../../share/class-utils/api-route-utils.class';
import { CoreHttpService } from '../../../core/core-http.service';
import { CoreFrameworkService } from '../../../core/core-framework.service';
import { CoreObservableService } from '../../../core/core-observable.service';
import { JrrbFormHeaderComponent } from '../../../framework/components/forms/jrrb-form-header.component';
import { JrrbTableChaveValorComponent } from '../../../framework/components/jrrb-table-chave-valor/jrrb-table-chave-valor.component';
import { JrrbButtonComponent } from '../../../framework/components/jrrb-button/jrrb-button.component';

class LicencaController {
  public titleForm: string = 'Licença';
  public coreHttp: CoreHttpService = inject(CoreHttpService);
  public coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);
  public coreObservable: CoreObservableService = inject(CoreObservableService);

  public OpenDialogTermoAdesao(): void {
    this.coreHttp.DialogOpenFullScreenDataAfterClose(TermoAdesaoComponent, environment.userErp.iInfoEmpresa.termo_aceito)
      .then((resultTermo: boolean) => {
        if (resultTermo)
          this.coreHttp.PostApiAuth(ApiRouteUtilsClass.set_termo_aceito(environment.userErp.iInfoEmpresa.id_empresa))
            .subscribe(() => {
              this.coreFrameWork.messageFrameWork.MessageSuccess('Parabéns!  Termo aceito com sucesso!', this.titleForm);

              //é necessário relogar o sistema
              environment.userErp.userConnected = false;
              this.coreObservable.SetUsuarioLogado(environment.userErp.userConnected);
            });
      });
  }

}

@Component({
  selector: 'licenca',
  standalone: true,
  imports: [CommonModule, JrrbFormHeaderComponent, JrrbTableChaveValorComponent, JrrbButtonComponent],
  templateUrl: './licenca.component.html'
})
export class LicencaComponent {

  private infoLic: any = environment.userErp.iInfoEmpresa;
  private erpVersion: string = environment.userErp.erpVersion;
  protected listLicenca: any[] =
    [
      'Versão=' + this.erpVersion,
      'Nome=' + this.infoLic.nome,
      'CNPJ=' + (this.infoLic.cnpj ? this.infoLic.cnpj : 'Não informado'),
      'Apelido=' + this.infoLic.apelido,
      'E-mail=' + (this.infoLic.email_termo_aceito ? this.infoLic.email_termo_aceito : 'Não informado'),
      'Número de Usuários=' + this.infoLic.nro_usuarios,
      this.infoLic.caption_valor_usuario + '=' + (this.infoLic.termo_aceito
        ? this.infoLic.valor_usuario : ("GRATUITO ATÉ " + this.infoLic.termino_vigencia)),
      'Vigência=De: ' + this.infoLic.inicio_vigencia + ' Até: ' + this.infoLic.termino_vigencia,
      'Termo Aceito=' + (this.infoLic.termo_aceito ? "SIM" : "NÃO")
    ];

  protected classRow = LibraryUtilsClass.GetClassRow('justify-content-center');
  protected classCol7 = LibraryUtilsClass.GetClassCol(7);
  protected classCol2 = LibraryUtilsClass.GetClassCol(2) + ' text-center ';
  protected imageFile: string = environment.userErp.config[ConfigSystemMapperClass.LOGO_SISTEMA];
  protected mensagem: string = this.infoLic.mensagem;

  protected controller: LicencaController = new LicencaController();
}
