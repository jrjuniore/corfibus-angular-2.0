import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreHttpService } from '../../../core/core-http.service';
import { ApiRouteUtilsClass } from '../../../share/class-utils/api-route-utils.class';
import { CoreFrameworkService } from '../../../core/core-framework.service';
import { LibraryUtilsClass } from '../../../share/class-utils/library-utils.class';
import { HelperUtilsClass } from '../../../share/class-utils/helper-utils.class';

class ConfirmNewEmpresaController { 

  public coreFrameWork: CoreFrameworkService = new CoreFrameworkService();
  
  private coreHttp: CoreHttpService = new CoreHttpService();

  //Enviando email à Corfidence avisando para que uma nova conta seja criada
  public ToSendWarningCorfiBus(pNome: string, pEmail: string): void {
    this.coreHttp.PostApi(ApiRouteUtilsClass.share.ToSendMail(
      this.coreFrameWork.emailFrom(), this.coreFrameWork.emailToAdminCorfiBus(), "Pedido de Nova Conta - " + pNome, 
      `<h3>Abertura de nova conta</h3>
       <div style="padding: 8px; border: solid 1px gainsboro; border-radius: 4px">
         <p><b>Cliente : </b>${pNome}</p>
         <p><b>Email : </b>${pEmail}</p>
       </div>`, [], [], 'Abrir Nova Conta - CorfiBus'
    ))
    .subscribe(() => {
      this.coreHttp.coreBrowser.LoadOk();
    });
  }

  public ConfirmNewAccount(pParamConfirm: string): Promise<boolean> {
    let params: string[] = LibraryUtilsClass.Decriptar(pParamConfirm).split("ý");

    return new Promise((resolve) => {
      this.coreHttp.PostApi(ApiRouteUtilsClass.corfibus.ToConfirmNewEmpresa(params[0], params[1]))
      .subscribe((result: any) => {

        //o resultado será, se a conta já foi validada
        resolve(!HelperUtilsClass.StringEqual(result.message, "1"));
        this.coreHttp.coreBrowser.LoadOk();
      });
    });
  }

}

@Component({
  selector: 'confirm-new-empresa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-new-empresa.component.html'
})
export class ConfirmNewEmpresaComponent {

  protected controller: ConfirmNewEmpresaController = new ConfirmNewEmpresaController();
  protected contaJaFoiValidada = signal(false);

  constructor() {
    this.ConfirmNewAccount();
  }

  private ConfirmNewAccount(): void {
    this.controller.ConfirmNewAccount(window.location.href.split("?")[1].split("=")[1])
    .then((result: boolean) => {
      this.contaJaFoiValidada.set(result);

      //Enviando email à Corfidence avisando para que uma nova conta seja criada
      if (!this.contaJaFoiValidada){
        let paramUrl: string = window.location.href.split("?")[1].split("=")[1];
        let params: string[] = LibraryUtilsClass.Decriptar(paramUrl).split("ý");
        let nome: string = params[0];
        let email: string = params[1];
        this.controller.ToSendWarningCorfiBus(nome, email);
      }
    })
  }



}
