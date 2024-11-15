import { inject, signal } from "@angular/core";
import { LoadConfigSystem } from "../config/ConfigSystem.controller";
import { CoreRouterService } from "../../../core/core-router.service";
import { environment } from "../../../../environments/environment";
import { IConfigSystemModel } from "../../models/IConfigSystem.model";
import { LibraryUtilsClass } from "../../../share/class-utils/library-utils.class";
import { HelperUtilsClass } from "../../../share/class-utils/helper-utils.class";
import { ConfigSystemMapperClass } from "../../pages/config-system/config-system.mapper";
import { ErpAccessClass } from "../../../share/class-utils/erp-access.class";
import { Observable, take } from "rxjs";
import { CoreHttpService } from "../../../core/core-http.service";
import { ApiRouteUtilsClass } from "../../../share/class-utils/api-route-utils.class";
import { CoreFrameworkService } from "../../../core/core-framework.service";
import { CoreObservableService } from "../../../core/core-observable.service";

export class AppController {

  //Quando esse service for instanciado, outros injects podem também serem usados
  public coreRouter: CoreRouterService = inject(CoreRouterService);

  private loadConfig: LoadConfigSystem = new LoadConfigSystem();
  private idSetTimeOutDeslogAuto: any;
  private coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);
  private coreHttp: CoreHttpService = inject(CoreHttpService);
  private coreObservable: CoreObservableService = inject(CoreObservableService);

  public infoLicApelido = signal('');
  public infoLoginGrupo = signal('');
  public infoLoginUsuario = signal('');


  constructor() {
    this.StartDeslogarEm();
  }

  public ToLogin(): void {
    this.loadConfig.ToLoadConfigSystem()
      .subscribe((listResult: IConfigSystemModel[]) => {
        let listParams: any = LibraryUtilsClass.NewObject();
        listResult.forEach((config: IConfigSystemModel) => {

          //Configuração que será usada pelo sistema
          listParams[HelperUtilsClass.StringToUpper(config.identificacao)] = config.param_bigint ??
            config.param_date ??
            config.param_datetime ??
            config.param_float ??
            config.param_guid ??
            config.param_string ??
            config.param_time ??
            null;

          //Tratando a imagem
          if (HelperUtilsClass.StringEqual(config.identificacao, ConfigSystemMapperClass.LOGO_RELATORIO)) {
            listParams[HelperUtilsClass.StringToUpper('LOGO_RELATORIO')] = config.param_guid;
            listParams[HelperUtilsClass.StringToUpper(config.identificacao)] =
              HelperUtilsClass.StringLength(config.file_base_64) <= 0 ? "../assets/images/common/emptyPhoto.png" : config.file_base_64;
          }

          if (HelperUtilsClass.StringEqual(config.identificacao, ConfigSystemMapperClass.LOGO_SISTEMA)) {
            listParams[HelperUtilsClass.StringToUpper('LOGO_SISTEMA')] = config.param_guid;
            listParams[HelperUtilsClass.StringToUpper(config.identificacao)] =
              HelperUtilsClass.StringLength(config.file_base_64_logo_sistema) <= 0 ? "../assets/images/common/emptyPhoto.png" : config.file_base_64_logo_sistema;
          }
        });

        //Atualizando para uso do sistema;
        environment.userErp.config = listParams;
        this.coreRouter.coreErp.SaveSessionStorage();

        //avisando o observable
        this.coreObservable.SetClienteLogado(true);

        this.NavigateTo('agenda', true);
        LibraryUtilsClass.LoadOk();
      });;
  }

  public SetScreenAccessLogin(): void {
    ErpAccessClass.SetScreenAccess();
  }


  public SetImageLogin(): Observable<any> {
    let canGetImage: boolean =
      !HelperUtilsClass.ObjectIsEmpty(environment.userErp.iInfoLogin) &&
      !HelperUtilsClass.GuidIsEmpty(environment.userErp.iInfoLogin.img_logo);

    if (canGetImage)
      return this.coreHttp.PostApiAuth(ApiRouteUtilsClass.share.ToGetImage(environment.userErp.iInfoLogin.img_logo, environment.userErp.iInfoEmpresa.id_empresa));

    return new Observable<null>;
  }

  public ToLogOut(): void {
    this.coreRouter.ClearSessionStorage();
    this.coreRouter.coreErp.ClearSessionStorage();
    this.coreRouter.coreErp.InicializarVars();
    this.NavigateToAutenticacao(false);
  }

  public DeslogarAutomaticamente(): void {
    this.ToLogOut();
    this.coreFrameWork.messageFrameWork.MessageDeslogAuto();
  }

  public StartDeslogarEm(): void {
    if (HelperUtilsClass.ObjectIsEmpty(environment.userErp.iInfoLogin))
      return;

    this.coreHttp.PostApiAuth(ApiRouteUtilsClass.login_deslog_em(environment.userErp.iInfoLogin.id_usuario_acesso))
      .subscribe((resultAuto: number) => {
        if (resultAuto > 0) {
          this.ResetTimeOut();
          this.idSetTimeOutDeslogAuto = setTimeout(() => {
            //clicando no botão de deslogar.
            LibraryUtilsClass.ToClick('web202304290933');
          }, resultAuto);
        }
      });
  }

  public ResetTimeOut(): void {
    clearTimeout(this.idSetTimeOutDeslogAuto);
  }

  public NavigateToMenuAcionado(pUserConn: boolean): void {
    this.coreRouter.LoadSessionStorage();
    this.NavigateTo(this.coreRouter.menuAcionado(), pUserConn);
  }

  public NavigateToAutenticacao(pUserConn: boolean): void {
    this.NavigateTo('autenticacao', pUserConn, true);
  }

  private NavigateTo(rote: string, pUserConn: boolean, pReplaceUrl: boolean = false) {
    this.coreRouter.ToNavigateTo(rote, pUserConn, pReplaceUrl);
  }
}