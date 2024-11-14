import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CoreErpService } from './core-erp.service';
import { CoreBrowserService } from './core-browser.service';
import { HelperUtilsClass } from '../share/class-utils/helper-utils.class';
import { ErpAccess } from '../share/class-utils/erp-access.class';
import { LibraryUtilsClass } from '../share/class-utils/library-utils.class';
import { environment } from '../../environments/environment';

@Injectable()
export class CoreRouterService {

  public menuAcionado = signal('');

  private router: Router = inject(Router);
  private coreErp: CoreErpService = inject(CoreErpService);
  private coreBrowser: CoreBrowserService = inject(CoreBrowserService);
  private nameMenuAcionadoStorage = signal('07112022071278');

  public ToMainPageLogin() {
    if (environment.userErp.userConnected)
      this.ToMainPageMenu();
    else {
      this.router.navigateByUrl('autenticacao');
    }
  }

  public ToMainPageMenu(pUrl?: string) {
    let abrirUrl: boolean =
      !(HelperUtilsClass.StringContain(pUrl!, '#/autenticacao') || HelperUtilsClass.StringContain(pUrl!, '#/dashboard')) &&
      !HelperUtilsClass.StringIsEmpty(pUrl!)

    if (!environment.userErp.userConnected)
      this.ToMainPageLogin();
    else {

      if (!abrirUrl) {
        if (ErpAccess.HaveAccess('ac483a6f-1667-4a79-9c59-648f16a5caf4'))
          this.router.navigateByUrl('dashboard');
        else
          this.router.navigateByUrl('');
      }
      else {
        let _window = this.coreBrowser.GetWindow();
        if (_window == null)
          return;

        _window.open(pUrl, '_self');
      }

      //Salvando a sessão
      this.coreErp.SaveSessionStorage();
    }
  }

  public ToNavigateTo(pLink: string, pUserIsConnected: boolean, pReplaceUrl: boolean = false) {
    if (pUserIsConnected)
      this.SetMenuAcionado(pLink);

    this.router.navigateByUrl(pLink, { replaceUrl: pReplaceUrl });
  }

  public ToNavigateToNewTab(pLink: string) {
    if (!environment.userErp.userConnected) this.ToMainPageLogin();
    else {
      let _window = this.coreBrowser.GetWindow();
      if (_window == null)
        return;

      this.SetMenuAcionado(pLink);
      _window.open(_window.location.origin + '/' + pLink, '_blank')

      //Setando o deslogarEm de nova sessão
      //TODO
      this.coreBrowser.ToClick('web202304291033');
      this.coreBrowser.LoadOk();
    }
  }

  public ToNavigateWithParams(pLink: string, pParams: any) {
    if (!environment.userErp.userConnected) this.ToMainPageLogin();
    else {
      let _window = this.coreBrowser.GetWindow();
      if (_window == null)
        return;

      let _linkToOpen: string = _window.location.origin + '/' + pLink + '/' + pParams.params;
      this.SetMenuAcionado(pLink);

      _window.open(_linkToOpen, '_blank')

      this.coreBrowser.LoadOk();
    }
  }

  public ClearSessionStorage() {
    this.menuAcionado.set("");
    this.coreBrowser.RemoveSessionItem(this.nameMenuAcionadoStorage())
  }

  public LoadSessionStorage() {
    let _session: any = this.coreBrowser.GetSessionItem(this.nameMenuAcionadoStorage());

    if (!HelperUtilsClass.ObjectIsEmpty(_session)) {
      _session = JSON.parse(LibraryUtilsClass.Decriptar(_session));

      this.menuAcionado.set(_session.menuAcionado);
    }
  }

  private SaveSessionStorage() {
    this.coreBrowser.SetSessionItem(this.nameMenuAcionadoStorage(), LibraryUtilsClass.Encriptar(JSON.stringify({
      menuAcionado: this.menuAcionado
    })));
  }

  private SetMenuAcionado(pLink: string) {
    if (!HelperUtilsClass.StringEqual(this.menuAcionado(), pLink)) {
      this.menuAcionado.set(pLink);
      this.SaveSessionStorage();
    }
  }

}
