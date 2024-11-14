import { Component, inject, signal } from '@angular/core';
import { LibraryUtilsClass } from '../../../share/class-utils/library-utils.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreHttpService } from '../../../core/core-http.service';
import { ApiRouteUtilsClass } from '../../../share/class-utils/api-route-utils.class';
import { CoreFrameworkService } from '../../../core/core-framework.service';
import { catchError, of } from 'rxjs';
import { MessageUtilsClass } from '../../../framework/components/jrrb-messages/class/message.class';
import { CoreBrowserService } from '../../../core/core-browser.service';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { JrrbInputComponent } from '../../../framework/components/jrrb-input/jrrb-input.component';
import { JrrbButtonComponent } from '../../../framework/components/jrrb-button/jrrb-button.component';

class TesteCorfiBusController {
  private titleForm: string = "CorfiBus";
  public idButtonExit: string = LibraryUtilsClass.NewId();
  public coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);

  private coreHttp: CoreHttpService = inject(CoreHttpService);
  private browser: CoreBrowserService = inject(CoreBrowserService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  public form: FormGroup = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
    Cpf_Cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
    Razao_Social: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    Nome_Fantasia: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    WhatsApp: ['', Validators.maxLength(17)],
  });

  public EnviarEmail(pMessageMail: string): void {
    if (!this.coreHttp.FormsIsValid(this.form, this.titleForm))
      return;

    this.coreHttp.PostApi(ApiRouteUtilsClass.share.ToSendMail(this.coreFrameWork.emailFrom(),
      this.form.controls['Email'].value, "Email de confirmação - CorfiBus",
      pMessageMail, [], [], ''
    ))
      .subscribe((result: string) => {
        if (result != "1") {

          //Gravando a empresa na CorfiBus
          this.coreHttp.PostApi(ApiRouteUtilsClass.corfibus.ToNewEmpresa(
            this.form.controls['Razao_Social'].value,
            this.form.controls['Nome_Fantasia'].value,
            this.form.controls['WhatsApp'].value,
            this.form.controls['Cpf_Cnpj'].value,
            this.form.controls['Email'].value
          ))
            .pipe(
              catchError(() => {
                MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageInfo(`Enviamos um e-mail de confirmação para ${this.form.controls['Email'].value}.`)], this.titleForm, 7000);
                this.browser.LoadOk();
                LibraryUtilsClass.ToClick(this.idButtonExit);
                return of();
              })
            )
            .subscribe(() => {
              MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageInfo(`Enviamos um e-mail de confirmação para ${this.form.controls['Email'].value}.`)], this.titleForm, 7000);
              this.browser.LoadOk();
              LibraryUtilsClass.ToClick(this.idButtonExit);
            });
        }
        else {
          this.coreFrameWork.messageFrameWork.MessageError(result, this.titleForm);
          this.browser.LoadOk();
        }
      });
  }
}


@Component({
  selector: 'teste-gratuito',
  standalone: true,
  imports: [JrrbInputComponent, JrrbButtonComponent],
  templateUrl: './teste-gratuito.component.html'
})
export class TesteGratuitoComponent {

  protected casoDuvida = signal("Em caso de dúvidas, mande um e-mail para atendimento@corfibus.com.br.  Responderemos o mais breve possível.");
  protected controller: TesteCorfiBusController = new TesteCorfiBusController();

  constructor(private dialogRef: MatDialogRef<TesteGratuitoComponent>){}

  protected ToExit(): void {
    this.dialogRef.close();
  }

  protected EnviarEmail(): void {
    let dataEncrypt: string = LibraryUtilsClass.Encriptar(`${this.controller.form.controls['Razao_Social'].value}ý${this.controller.form.controls['Email'].value}`);
    let linkConfirm: string = `<div style="text-align: center; margin: 1rem"><a href="${environment.siteErp}confirmar-nova-conta?conta=${dataEncrypt}">
    <h3>Clique aqui para confirmar abertura da conta CorfiBus</h3>
    <\a></div>`;
    this.controller.EnviarEmail(this.CreateEmailHtml(linkConfirm));
  }

  private CreateEmailHtml(pLinkConfirmacao: string): string {
    return `
      <div style="margin: 1rem;">
        <p>Bem-vindo(a) ao CorfiBus!</p>
        <p>É com grande entusiasmo que te damos as boas-vindas à nossa plataforma!</p><br>
        <h3 style="margin: 0px; padding: 8px; background-color: gainsboro">Dados Informados</h3>
        <div style="padding: 1rem; border: solid 1px gainsboro">
          <div style="display: flex">
            <span style="display: grid; border: solid 1px aliceblue; padding: 7px; width: 50%">
              <label><b>E-mail</b></label>
              <label>${this.controller.form.controls['Email'].value}</label>
            </span>
            <span style="display: grid; border: solid 1px aliceblue; padding: 7px; width: 50%">
              <label><b>Razão Social</b></label>
              <label>${this.controller.form.controls['Razao_Social'].value}</label>
            </span>
          </div>

          <div style="display: flex">
            <span style="display: grid; border: solid 1px aliceblue; padding: 7px; width: 33.33%">
              <label><b>CPF/CNPJ</b></label>
              <label>${this.controller.form.controls['Cpf_Cnpj'].value}</label>
            </span>
            <span style="display: grid; border: solid 1px aliceblue; padding: 7px; width: 33.33%">
              <label><b>Nome Fantasia</b></label>
              <label>${this.controller.form.controls['Nome_Fantasia'].value}</label>
            </span>
            <span style="display: grid; border: solid 1px aliceblue; padding: 7px; width: 33.33%">
              <label><b>WhatsApp</b></label>
              <label>${this.controller.form.controls['WhatsApp'].value}</label>
            </span>
          </div>
          ${pLinkConfirmacao}
        </div>
        <br><br><br><br>
        <b><h3>Equipe CorfiBus</h3></b>
      </div>
    `;
  }

}
