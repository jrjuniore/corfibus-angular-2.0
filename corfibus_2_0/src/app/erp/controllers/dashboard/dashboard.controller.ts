import { inject, signal } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { CoreHttpService } from "../../../core/core-http.service";
import { ApiRouteUtilsClass } from "../../../share/class-utils/api-route-utils.class";
import { CoreBrowserService } from "../../../core/core-browser.service";
import { CoreFrameworkService } from "../../../core/core-framework.service";

export class DashBoardController {
 
  public titleForm = signal<string>('DashBoard');
  public visaoVeiculos = signal<boolean>(false);
  public listResultDasboard = signal<any[]>([]);
  public listResultDasboardVE = signal<any>(null);

  public coreFramework: CoreFrameworkService = inject(CoreFrameworkService);

  private formBuilder = inject(NonNullableFormBuilder);
  private coreHttp: CoreHttpService = inject(CoreHttpService);
  private coreBrowser: CoreBrowserService = inject(CoreBrowserService);
  public formSearch: FormGroup = this.formBuilder.group({
    periodoDe: ['', Validators.required],
    periodoAte: ['', Validators.required]
  });

  public GetListEscala(pVisaoVeiculos: boolean): void {
    this.coreHttp.PostApiAuth(ApiRouteUtilsClass.dashboard.Escalas(pVisaoVeiculos))
      .subscribe((dataListJson: string) => {
        this.visaoVeiculos.set(pVisaoVeiculos);
        this.listResultDasboard = JSON.parse(dataListJson);
        this.coreBrowser.LoadOk();
      })
  }

  public GetListVendasEventuais(): void {
    this.coreHttp.PostApiAuth(ApiRouteUtilsClass.dashboard.VendasEventais())
      .subscribe((dataListJson: any) => {
        this.listResultDasboardVE.set(JSON.parse(dataListJson[0].data_Json));
        this.coreBrowser.LoadOk();
      })
  }

  public ToDateChange(pPeriodo: any): void {
    this.coreFramework.rangeError.set(pPeriodo.errorRange != undefined);
    this.formSearch.controls['periodoDe'].setErrors(pPeriodo.errorRange);
    this.formSearch.controls['periodoAte'].setErrors(pPeriodo.errorRange);
    this.formSearch.controls['periodoDe'].setValue(pPeriodo.fieldControlDataDe);
    this.formSearch.controls['periodoAte'].setValue(pPeriodo.fieldControlDataAte);
  }

}