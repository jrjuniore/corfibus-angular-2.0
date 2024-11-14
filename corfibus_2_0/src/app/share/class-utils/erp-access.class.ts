import { environment } from "../../../environments/environment";
import { HelperUtilsClass } from "./helper-utils.class";
import { LibraryUtilsClass } from "./library-utils.class";

export const ErpAccess = {
  /**
  * @description É passado o item de acesso e será feito uma varredura na lista de
  * acessos dos que foi carregado durante o login resultando em um booleano
  * @param pIdArvoreAcesso Item de acesso do usuário
  * @returns True ou False se tem ou não acesso
  */
  HaveAccess(pIdArvoreAcesso: string): boolean {
    if (!environment.userErp.userConnected) {
      LibraryUtilsClass.ToClick('web202209080832');
      return false;
    }

    return (environment.userErp.iInfoLogin &&
      (environment.userErp.iInfoLogin.is_adm || environment.userErp.userAccess.indexOf(pIdArvoreAcesso) >= 0));
  },

};

export class ErpAccessClass {


  /**
   * @description Será obtido todos os components da página que possuem a classe "jrrb-control-access" e assim,
   * pelo data-access, verificar se o usuário tem acesso.  Em caso negativo, o component será removido do HTML
   */
  static SetScreenAccess(): void {
    if ((!HelperUtilsClass.ObjectIsEmpty(environment.userErp.iInfoLogin)) && (!environment.userErp.iInfoLogin.is_adm)) {
      let _listElement: any[] = Object.assign([], document.getElementsByClassName("jrrb-control-access"));

      _listElement.forEach((item: HTMLElement) => {
        if (!this.HaveAccess(item.getAttribute('data-access')!))
          item.remove();
      });
    }
  }

  /**
 * @description É passado o item de acesso e será feito uma varredura na lista de
 * acessos dos que foi carregado durante o login resultando em um booleano
 * @param pIdArvoreAcesso Item de acesso do usuário
 * @returns True ou False se tem ou não acesso
 */
  private static HaveAccess(pIdArvoreAcesso: string): boolean {
    return (environment.userErp.iInfoLogin.is_adm || environment.userErp.userAccess.indexOf(pIdArvoreAcesso) >= 0);
  }

}