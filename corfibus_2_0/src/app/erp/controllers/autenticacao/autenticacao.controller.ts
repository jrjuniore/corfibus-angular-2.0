import { inject, signal } from "@angular/core";
import { IMessage } from "../../../framework/components/jrrb-messages/class/message.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ILoginModel } from "../../models/ILogin.model";
import { Validation } from "../../../validators/validation";
import { CoreHttpService } from "../../../core/core-http.service";
import { catchError, of } from "rxjs";
import { HelperUtilsClass } from "../../../share/class-utils/helper-utils.class";
import { CoreBrowserService } from "../../../core/core-browser.service";
import { MessageUtilsClass } from "../../../framework/components/jrrb-messages/class/message.class";
import { ApiRouteType } from "../../../share/types/apiRoute.type";
import { ApiRouteUtilsClass } from "../../../share/class-utils/api-route-utils.class";
import { LibraryUtilsClass } from "../../../share/class-utils/library-utils.class";
import { CoreFrameworkService } from "../../../core/core-framework.service";
import { environment } from "../../../../environments/environment";
import { TesteGratuitoComponent } from "../../pages/autenticacao/teste-gratuito.component";
import { AutenticacaoTrocaSenhaComponent } from "../../pages/autenticacao/autenticacao-troca-senha.component";
import { ConstUtilsClass } from "../../../share/class-utils/const-utils.class";

export class AutenticacaoController {

  public titleForm = signal('Autenticação');
  public version = signal(environment.userErp.erpVersion);
  public titleFormTrocaSenha = signal('Troca de Senha');
  public coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);
  public browser: CoreBrowserService = inject(CoreBrowserService);

  private msgUsuarioAguardando: string = 'Usuário aguardando troca de senha';
  private formBuilder: FormBuilder = inject(FormBuilder);
  private lstMessage: IMessage[] = [];
  private coreHttp: CoreHttpService = inject(CoreHttpService);

  public form: FormGroup = this.formBuilder.group({
    empresa: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    senha: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
  });

  public Autenticar(pForm: FormGroup, pTrocarSenha?: boolean, pAbrirTelaTrocaSenha?: boolean): void {
    if (Validation.FormIsValidMessage(pForm, this.titleForm())) {
      let loginModel: ILoginModel = <ILoginModel>pForm.value;

      loginModel.trocarSenha = pTrocarSenha ?? false;
      loginModel.hours = 5;
      loginModel.minutes = 0;

      this.coreHttp.PostApi(this.GetApiRouteAutenticar(loginModel))
        .pipe(
          catchError((error: any) => {
            let _messageError: string = error.message ? error.message : "";
            let _servidorForaAr: boolean =
              !HelperUtilsClass.StringIsEmpty(_messageError) &&
              HelperUtilsClass.StringContain(HelperUtilsClass.StringToUpper(_messageError), HelperUtilsClass.StringToUpper('0 Undefined'));

            let _messageFinal: string =
              _servidorForaAr
                ? 'Servidor fora do ar.  Já estamos atuando no problema.  Por gentileza, tente novamente mais tarde'
                : error.error.errors.Autenticação[0];

            this.browser.LoadOk();
            MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageError(_messageFinal)], this.titleForm(), 7000);

            if (HelperUtilsClass.StringEqual(_messageFinal, this.msgUsuarioAguardando))
              this.TrocarSenha(loginModel.empresa, loginModel.usuario);

            return of();
          })
        )
        .subscribe((data_success: any) => {
          if ((data_success.errors) && (
            HelperUtilsClass.StringEqual(data_success.errors.Autenticação[0], this.msgUsuarioAguardando)))
            this.TrocarSenha(loginModel.empresa, loginModel.usuario);
          else
            if (MessageUtilsClass.NoMessagesFromBackEnd(data_success, this.titleForm()))
              if (this.EmpresaOk(data_success.empresa)) {
                if (pAbrirTelaTrocaSenha)
                  this.TrocarSenha(loginModel.empresa, loginModel.usuario);
                else {
                  let msgUsuAut: string = 'Usuário autenticado!';

                  environment.userErp.iInfoLogin = data_success.login;
                  environment.userErp.iInfoLogin.token = data_success.tokenJwt;
                  environment.userErp.iInfoLogin.empresa = loginModel.empresa;
                  environment.userErp.userConnected = true;

                  this.GetAccessUser(data_success.login.is_adm, data_success.login.id_usuario_acesso);

                  this.lstMessage.push(MessageUtilsClass.NewMessageSuccess(msgUsuAut));
                  MessageUtilsClass.ShowAlerts(this.lstMessage, this.titleForm());

                  //Exibindo algumas informações do usário na tela.  Exemplo: imagem
                  //TODO - criar observable
                  // LibraryUtilsClass.ToClick('web202311071636');
                }
              }
        });
    }
  }

  public TesteGratuito(): void {
    this.coreHttp.DialogOpen(TesteGratuitoComponent, this.coreFrameWork.width_md(), undefined);
  }

  private GetApiRouteAutenticar(pLoginModel: ILoginModel): ApiRouteType {
    let _resultApiRoute: ApiRouteType = ApiRouteUtilsClass.login_autenticar();

    _resultApiRoute.params = pLoginModel;
    _resultApiRoute.params.nomeBanco = pLoginModel.empresa;

    _resultApiRoute.params = LibraryUtilsClass.EncriptarDados(_resultApiRoute.params);

    //Não é encriptar
    _resultApiRoute.params.trocarSenha = pLoginModel.trocarSenha;
    _resultApiRoute.params.hours = pLoginModel.hours;
    _resultApiRoute.params.minutes = pLoginModel.minutes;

    return _resultApiRoute;
  }

  private GetAccessUser(pIsAdm: boolean, pIdUsuario: string): void {

    environment.userErp.userAccess = LibraryUtilsClass.NewList();

    //Não é administrador
    if (!pIsAdm)
      this.coreHttp.PostApiAuth(ApiRouteUtilsClass.sistema.acessos.usuarios.ToGetAccess(pIdUsuario))
        .subscribe((data_success: any) => {
          environment.userErp.userAccess = LibraryUtilsClass.ObjectToList(data_success, 'id_Permissao');

          //Dando ok dizendo que o login foi executado e assim, exibindo o menu   
          // TODO - Observable
          // LibraryUtilsClass.ToClick('web202209080831');
        });
    // // TODO - Observable
    // // LibraryUtilsClass.ToClick('web202209080831');
    // else
    //   LibraryUtilsClass.ToClick('web202209080831');
  }

  private TrocarSenha(pEmpresa: string, pUsuario: string): void {
    this.coreHttp.DialogOpenDataAfterClose(
      AutenticacaoTrocaSenhaComponent, ConstUtilsClass.width_sm(),
      { empresa: pEmpresa, usuario: pUsuario }
    ).then((recordSenha: any) => {
      if (!HelperUtilsClass.ObjectIsEmpty(recordSenha))
        this.Autenticar(recordSenha, true);
    });
  }

  private EmpresaOk(pData: any): boolean {
    let result: boolean = true;

    let strNaoCad: string = 'não cadastrada !';
    let straAtencao: string = 'Atenção!';
    let straSuspenso: string = 'suspenso !';

    this.lstMessage = LibraryUtilsClass.Copy([]);

    if (HelperUtilsClass.StringContain(pData.mensagem, strNaoCad)) {
      result = false;
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageError(pData.mensagem)], this.titleForm());
    }
    else
      if (HelperUtilsClass.StringContain(pData.mensagem, straSuspenso)) {
        result = false;
        MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageError(pData.mensagem)], this.titleForm());
      }
      else
        if (HelperUtilsClass.StringContain(pData.mensagem, straAtencao))
          this.lstMessage.push(MessageUtilsClass.NewMessageWarning(pData.mensagem));

    //Atualizando UserErp
    if (result)
      environment.userErp.iInfoEmpresa = pData;

    return result;
  }


}