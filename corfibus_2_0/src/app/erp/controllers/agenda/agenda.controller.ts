import { inject, signal } from "@angular/core";
import { DateUtils, DiaMesType } from "../../../share/class-utils/date-utils.class";
import { LibraryUtilsClass } from "../../../share/class-utils/library-utils.class";
import { HelperUtilsClass } from "../../../share/class-utils/helper-utils.class";
import { CoreHttpService } from "../../../core/core-http.service";
import { ApiRouteUtilsClass } from "../../../share/class-utils/api-route-utils.class";

export class AgendaController {
  public titleForm = signal('Agenda - Vendas Eventuais');

  public classFlexMin = signal('d-inline-flex ');
  public classButtonMin = signal('fs-2 jrrb-bg-color-a4 mat-elevation-z1 py-3 rounded-circle px-2 btn jrrb-color-a2 m-2 jrrb-cursor-pointer fa fa-solid fa-sm fa-');
  public classButtonNext = signal(this.classButtonMin + 'caret-right');
  public classButtonPrev = signal(this.classButtonMin + 'caret-left');
  public classMesDesc = signal('fs-5 mx-2 text-center');
  public classDivMesDesc = signal(this.classFlexMin + 'align-items-center');
  public classDivHeader = signal('jrrb-bg-color-b4');
  public classCardCalendar = signal('border m-1 p-2 rounded jrrb-border-color-a4 shadow-sm jrrb-bg-color-c3');
  public classDiaCalendar = signal('d-grid text-center');

  public currentYear: number = new Date().getFullYear();
  public calendario: DiaMesType[][] = [];
  public listVendasEventuais: any[] = [];
  public listVendasEventuaisFiltered: any[] = [];

  //para uso externo
  public _dataCalendar?: string;

  private currentMonth: number = new Date().getMonth();
  private listMes: string[] = DateUtils.ListMes();
  private coreHttp: CoreHttpService = inject(CoreHttpService);

  public NextMonth(): void {
    this.MoveMonth(1);
    this.MonthCalendar();
  }

  public PrevMonth(): void {
    this.MoveMonth(-1);
    this.MonthCalendar();
  }

  public GetCurrentMonth(): string {
    return this.listMes[this.currentMonth];
  }

  public MonthCalendar(): void {
    //Carregando os dados de vendas eventuais
    const pData: string =
      this.currentYear.toString() + '-' + (this.currentMonth + 1).toString() + '-01';

    this.GetVendasEventuaisAgenda(pData)
      .then((result: any) => {
        this.listVendasEventuais = result;
        this.calendario = DateUtils.MonthCalendar(this.currentMonth, this.currentYear);

        this.RefreshQuantidadeVendaEventual();

        this.listVendasEventuaisFiltered = LibraryUtilsClass.Copy(this.listVendasEventuais);

        //Listando o primeiro dia
        if (!HelperUtilsClass.ListIsEmpty(result))
          this.FilterDia(result[0].data_Hora_Saida_Str.substr(0, 2))
      });

      this._dataCalendar = pData;
  }

  public FilterDia(pDia: string): void {
    this.listVendasEventuaisFiltered =
      this.listVendasEventuais.filter((item: any) => {
        return HelperUtilsClass.NumberIsEqual(Number(item.data_Hora_Saida_Str.substr(0, 2)), Number(pDia));
      })
  }

  private RefreshQuantidadeVendaEventual(): void {
    if (HelperUtilsClass.ListIsEmpty(this.listVendasEventuais))
      return;

    this.calendario.map((listSemana: DiaMesType[]) => {
      listSemana.map((diaMes: DiaMesType) => {
        diaMes.qtdVendaEventual =
          this.listVendasEventuais.filter((venda: any) => {
            return HelperUtilsClass.NumberIsEqual(diaMes.dia, Number.parseInt(venda.data_Hora_Saida_Str.substr(0, 2)));
          }).length;
      });
    });
  }

  private MoveMonth(value: number): void {
    this.currentMonth += value;

    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }

    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
  }

  private GetVendasEventuaisAgenda(pData: string): Promise<any> {
    return new Promise((resolve) => {
      this.coreHttp.PostApiAuth(ApiRouteUtilsClass.vendas.cadastros.vendas_eventuais.ToSearch(2, pData))
        .subscribe((dataVendas: any[]) => {
          resolve(dataVendas);
          this.coreHttp.coreBrowser.LoadOk();
        });
    });
  }

}