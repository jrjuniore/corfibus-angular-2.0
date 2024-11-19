import { inject } from "@angular/core";
import { CoreRouterService } from "../../core/core-router.service";

export class MenuController {

  public coreRouter: CoreRouterService = inject(CoreRouterService);

  public NavigateTo(rote: string, pUserConn: boolean, pReplaceUrl: boolean = false) {
    this.coreRouter.ToNavigateTo(rote, pUserConn, pReplaceUrl);
  }

}