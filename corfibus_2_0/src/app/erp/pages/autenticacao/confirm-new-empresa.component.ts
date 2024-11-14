import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseController } from 'src/app/framework/main/base.controller';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiRouteUtilsClass } from '../../share/class-utils/api-route-utils.class';
import { LibraryUtilsClass } from 'src/app/framework/share/class-utils/library-utils.class';
import { HelperUtilsClass } from 'src/app/framework/share/class-utils/helper-utils.class';
import { BrowserStorageService } from 'src/app/framework/share/services/browser-storage.service';

class ConfirmNewEmpresaController extends BaseController { 

  //Enviando email à Corfidence avisando para que uma nova conta seja criada
  public ToSendWarningCorfiBus(pNome: string, pEmail: string): void {
    this.PostApi(ApiRouteUtilsClass.share.ToSendMail(
      this.emailFrom, this.emailToAdminCorfiBus, "Pedido de Nova Conta - " + pNome, 
      `<h3>Abertura de nova conta</h3>
       <div style="padding: 8px; border: solid 1px gainsboro; border-radius: 4px">
         <p><b>Cliente : </b>${pNome}</p>
         <p><b>Email : </b>${pEmail}</p>
       </div>`, [], [], 'Abrir Nova Conta - CorfiBus'
    ))
    .subscribe(() => {
      this.browserBase.LoadOk();
    });
  }

  public ConfirmNewAccount(pParamConfirm: string): Promise<boolean> {
    let params: string[] = LibraryUtilsClass.Decriptar(pParamConfirm).split("ý");

    return new Promise((resolve) => {
      this.PostApi(ApiRouteUtilsClass.corfibus.ToConfirmNewEmpresa(params[0], params[1]))
      .subscribe((result: any) => {

        //o resultado será, se a conta já foi validada
        resolve(!HelperUtilsClass.StringEqual(result.message, "1"));
        this.browserBase.LoadOk();
      });
    });
  }

}

@Component({
  selector: 'confirm-new-empresa',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './confirm-new-empresa.component.html'
})
export class ConfirmNewEmpresaComponent {

  protected controller: ConfirmNewEmpresaController = new ConfirmNewEmpresaController(this.browser, this.http);
  protected contaJaFoiValidada?: boolean;

  constructor(private browser: BrowserStorageService, private http: HttpClient) {
    this.ConfirmNewAccount();
  }

  private ConfirmNewAccount(): void {
    this.controller.ConfirmNewAccount(window.location.href.split("?")[1].split("=")[1])
    .then((result: boolean) => {
      this.contaJaFoiValidada = result;

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
