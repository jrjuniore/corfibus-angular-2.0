import { inject, Injectable, signal } from '@angular/core';
import { CoreBrowserService } from './core-browser.service';
import * as LZString from 'lz-string';
import { LibraryUtilsClass } from '../share/class-utils/library-utils.class';
import { HelperUtilsClass } from '../share/class-utils/helper-utils.class';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CoreErpService {

  private browserSrv: CoreBrowserService = inject(CoreBrowserService);
  private nameItemSessStorage = signal('07112022071279');
  private idSetTimeOutDeslogAuto: any;

  public InicializarVars() {
    environment.userErp.userConnected = false;
    environment.userErp.iInfoEmpresa = null;
    environment.userErp.iInfoLogin = null;
    environment.userErp.config = null;
    environment.userErp.userAccess = [];
  }

  public SaveSessionStorage() {
    this.browserSrv.SetSessionItem(this.nameItemSessStorage(), LZString.compress(LibraryUtilsClass.Encriptar(JSON.stringify({
      userConnected: environment.userErp.userConnected,
      iInfoEmpresa: environment.userErp.iInfoEmpresa,
      iInfoLogin: environment.userErp.iInfoLogin,
      config: environment.userErp.config,
      userAccess: environment.userErp.userAccess
    }))));

    this.StartDeslogarEm(environment.userErp.iInfoLogin.deslog_auto_em);
  }

  public LoadSessionStorage() {
    let _session: any = LZString.decompress(this.browserSrv.GetSessionItem(this.nameItemSessStorage())!);

    if (!HelperUtilsClass.ObjectIsEmpty(_session)) {
      _session = JSON.parse(LibraryUtilsClass.Decriptar(_session));

      environment.userErp.userConnected = _session.userConnected;
      environment.userErp.iInfoEmpresa = _session.iInfoEmpresa;
      environment.userErp.iInfoLogin = _session.iInfoLogin;
      environment.userErp.config = _session.config;
      environment.userErp.userAccess = _session.userAccess;
    }
  }

  public ClearSessionStorage() {
    this.browserSrv.RemoveSessionItem(this.nameItemSessStorage());
  }

  public StartDeslogarEm(pValue: number): void {
    if (pValue <= 0)
      return;

    clearTimeout(this.idSetTimeOutDeslogAuto());
    this.idSetTimeOutDeslogAuto = setTimeout(() => {
      //clicando no botão de deslogar.

      //TODO
      this.browserSrv.ToClick('web202304290933');
    }, pValue);
  }

}
