import { Injectable, signal } from '@angular/core';
import { LibraryUtilsClass } from '../share/class-utils/library-utils.class';
import { HelperUtilsClass } from '../share/class-utils/helper-utils.class';
import { JrrbSelectTypeList } from '../framework/components/jrrb-select/jrrb-select-list.type';
import { IChaveValor } from '../share/interfaces/IChaveValor.interface';
import { ConstUtilsClass } from '../share/class-utils/const-utils.class';
import { MessageUtilsClass } from '../framework/components/jrrb-messages/class/message.class';
import { DateFormatSaveType } from '../share/types/DateFormatSave.type';
import { ApiRouteType } from '../share/types/apiRoute.type';
import { AccessTablesPermissionsConfigType } from '../share/types/jrrb-table-permissions.type';

@Injectable({
  providedIn: 'root'
})
export class CoreFrameworkService {

  public classRowDefault = signal<string>(LibraryUtilsClass.GetClassRow());
  public classRow = signal<string>(LibraryUtilsClass.GetClassRow('py-2'));
  public classRowCenter = signal<string>(LibraryUtilsClass.GetClassRow('py-2 justify-content-center'));
  public classColSingle = signal<string>(LibraryUtilsClass.GetClassColSingle());
  public classColSingleATop = signal<string>(LibraryUtilsClass.GetClassColSingleAlignTop());
  public classCol1 = signal<string>(LibraryUtilsClass.GetClassCol(1));
  public classCol1ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(1));
  public classCol2 = signal<string>(LibraryUtilsClass.GetClassCol(2));
  public classCol2ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(2));
  public classCol3 = signal<string>(LibraryUtilsClass.GetClassCol(3));
  public classCol3ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(3));
  public classCol4 = signal<string>(LibraryUtilsClass.GetClassCol(4));
  public classCol4ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(4));
  public classCol5 = signal<string>(LibraryUtilsClass.GetClassCol(5));
  public classCol5ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(5));
  public classCol6 = signal<string>(LibraryUtilsClass.GetClassCol(6));
  public classCol6ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(6));
  public classCol7 = signal<string>(LibraryUtilsClass.GetClassCol(7));
  public classCol7ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(7));
  public classCol8 = signal<string>(LibraryUtilsClass.GetClassCol(8));
  public classCol8ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(8));
  public classCol9 = signal<string>(LibraryUtilsClass.GetClassCol(9));
  public classCol9ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(9));
  public classCol10 = signal<string>(LibraryUtilsClass.GetClassCol(10));
  public classCol10ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(10));
  public classCol11 = signal<string>(LibraryUtilsClass.GetClassCol(11));
  public classCol11ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(11));
  public classCol12 = signal<string>(LibraryUtilsClass.GetClassCol(12));
  public classCol12ATop = signal<string>(LibraryUtilsClass.GetClassColAlignTop(12));

  public itemMenu = signal<string>('jrrb-font-14px jrrb-color-b jrrb-cursor-pointer');
  public faBase = signal<string>('fa fa-solid fa-');
  public faBaseBase = signal<string>(' jrrb-color-a2 me-2');
  public faTable = signal<string>('table' + this.faBaseBase());
  public faDatabase = signal<string>('database' + this.faBaseBase());
  public faHome = signal<string>('home' + this.faBaseBase());
  public faBus = signal<string>('bus' + this.faBaseBase());
  public faFilePdf = signal<string>('file-pdf' + this.faBaseBase());
  public faCog = signal<string>('cog' + this.faBaseBase());
  public faAcessos = signal<string>('cog' + this.faBaseBase());
  public faUserFireWall = signal<string>('user-shield' + this.faBaseBase());
  public faGlasses = signal<string>('glasses' + this.faBaseBase());
  public marginResponsiva = signal<string>('mb-md-0 mb-lg-0, mb-xl-0 mb-xxl-0 mb-');

  //para uso externo
  public rangeError = signal<boolean>(false);
  public emailFrom = signal<string>("noreply@corfibus.com.br");
  public emailToAdminCorfiBus = signal<string>("admin@corfibus.com.br");

  public bgForm = signal<string>('p-3 border shadow-sm jrrb-bg-color-ghostwhite');

  public listFieldsNames: string[] = ['nome', 'ativoStr', 'date_Create_Str', 'date_Alter_Str'];
  public listFieldsCaption: string[] = ['Tipo', 'Ativo', 'Data Inclusão', 'Data Alteração'];
  public listFields2Caption: string[] = ['Nome', 'Ativo', 'Data Inclusão', 'Data Alteração'];

  public logoReport: string = 'LOGO_RELATORIO';
  public titleReportListagens: string = 'Relatórios Disponíveis';
  public titleDetailScreen: string = 'Detalhes Cadastro';
  public reportCaption: string = 'Relatório';
  public reportPeriodo30DiasCaption: string = 'Período de 30 dias';
  public reportPeriodo31DiasCaption: string = 'Período de 31 dias';
  public reportCaptionRadioGroup: string = 'Selecione um período';
  public fieldNameValue: string = 'value';
  public fieldNameCaption: string = 'caption';

  public width_sm: string = ConstUtilsClass.width_sm();
  public width_md: string = ConstUtilsClass.width_md();
  public width_md2: string = ConstUtilsClass.width_md2();
  public width_md3: string = ConstUtilsClass.width_md3();
  public width_lg: string = ConstUtilsClass.width_lg();
  public width_lg2: string = ConstUtilsClass.width_lg2();
  public width_xl: string = ConstUtilsClass.width_xl();
  public width_max: string = ConstUtilsClass.width_max();

  public maskCpf: string = ConstUtilsClass.mask_cpf();
  public maskPhone: string = ConstUtilsClass.mask_phone();
  public maskCnpj: string = ConstUtilsClass.mask_cnpj();
  public maskCep: string = ConstUtilsClass.mask_cep();
  public maskAnoFab: string = ConstUtilsClass.mask_ano_fabricacao();
  public maskAnoMod: string = ConstUtilsClass.mask_ano_modelo();
  public maskRenavam: string = ConstUtilsClass.mask_renavam();
  public maskNumberDoisDigitos: string = ConstUtilsClass.mask_number_dois_digitos();
  public maskNumberSeteDigitos: string = ConstUtilsClass.mask_sete_digitos();
  public maskNumberDoisDecimais: string = ConstUtilsClass.mask_money2();
  public maskHoraMininuto: string = ConstUtilsClass.mask_time_short();

  public maskTimeShort: string = ConstUtilsClass.mask_time_short();
  public horaMinima: string = '08:00';
  public horaMaxima: string = '17:00';
  public diaSemaInicial: number = 1;
  public diaSemaFinal: number = 5;

  public opcoesSimNaoList: JrrbSelectTypeList[] = ConstUtilsClass.opcao_SimNao();

  public AccessTablesPermissions = {
    NewAccessTablesPermissionsConfigType(pApiAccess: ApiRouteType,
      pHaveAccess?: boolean, pFormToOpenAccess?: any): AccessTablesPermissionsConfigType {
      return ({
        apiAccess: pApiAccess,
        haveAccess: pHaveAccess,
        formToOpenAccess: pFormToOpenAccess
      })
    }
  }

  public messageFrameWork = {

    RegistroNaoEncontrado(pTitle: string, pExibirMensagem: boolean): void {
      if (!pExibirMensagem)
        return;

      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageNenhumRegistroEncontrado()], pTitle);
    },

    FormInvalido(pTitle: string, pExibirMensagem: boolean): void {
      if (!pExibirMensagem)
        return;

      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageNenhumRegistroEncontrado()], pTitle);
    },

    RegistroNaoAtivado(pTitle: string): void {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageInfo('O registro não existe ou não está ativo na base de dados')], pTitle);
    },

    MessageWarning(pMessage: string, pTitle: string): void {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageWarning(pMessage)], pTitle);
    },

    MessageInfo(pMessage: string, pTitle: string): void {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageInfo(pMessage)], pTitle);
    },

    MessageSuccess(pMessage: string, pTitle: string): void {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageSuccess(pMessage)], pTitle);
    },

    MessageError(pMessage: string, pTitle: string): void {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageError(pMessage)], pTitle);
    },

    MessageEmDesenvolvimento(pMetodo: string): void {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageWarning('Em desenvolvimento')], pMetodo);
    },

    MessageDeslogAuto(): void {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageInfo('Devido as configurações de login, você foi desconectado automaticamente.')], "Login", 5000);
    },

    MessageEmTestes(pMetodo: string): void {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageWarning('Em Testes')], pMetodo);
    },

    NoRecordToPrint(pTitle: string): void {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageNoRecordToPrint()], pTitle);
    },

    MessageFormInvalid(pTitle: string): void {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageFormInvalid()], pTitle);
    }
  }

  public DateFormate = {
    FormatPtBR(): string {
      return 'pt-BR';
    },

    FormatEnCA(): string {
      return 'en-CA';
    },

    NewDateFormatSaveType(pFieldName: string, pFormat?: string, pFormatWithTime?: boolean): DateFormatSaveType {
      return ({
        fieldName: pFieldName,
        format: pFormat,
        formatWithTime: pFormatWithTime
      });
    }
  }

  public AutoComplete = {
    ToSelect(pSelected: any, pFieldControl: any): void {
      pFieldControl.setValue(null);
      if (!HelperUtilsClass.ObjectIsEmpty(pSelected))
        pFieldControl.setValue(pSelected.value);
    }
  }

  public Select = {
    NewItem(pValue: number | string, pCaption: string, pHaveAccessItem?: boolean): JrrbSelectTypeList {
      return ({
        value: pValue,
        caption: pCaption,
        haveAccessItem: pHaveAccessItem
      })
    },

    /**
     * 
     * @param plistSource Lista onde será feita a pesquisa dos itens contidos na lista pListString
     * @param pListString Lista de string
     * @description Obtém uma lista do tipo JrrbSelectTypeList (plistSource) a partir de uma lista de strings (pListString)
     */
    GetItens(plistSource: JrrbSelectTypeList[], pListString: string[]): JrrbSelectTypeList[] {
      let result: JrrbSelectTypeList[] = [];
      let listsOk: boolean = (!HelperUtilsClass.ListIsEmpty(plistSource) && !HelperUtilsClass.ListIsEmpty(pListString));

      if (listsOk)
        pListString.forEach((itemStr: string) => {
          result.push(
            plistSource.filter((itemList: JrrbSelectTypeList) => {
              return HelperUtilsClass.StringEqual(itemList.caption, itemStr)
            })[0]
          );
        });

      return result;
    },


    /**
     * 
     * @param plistSource Lista onde será processada para obter o "value"
     * @description Obtém, a partir de uma lista de JrrbSelectTypeList (plistSource), uma string separado por vírgulas (,) contendo o value do objeto do tipo JrrbSelectTypeList.  Todos o item marcados serão adicionados à string resultante.
     */
    GetValuesSelected(plistSource: JrrbSelectTypeList[]): string {
      let result: string = "";
      let listsOk: boolean = (!HelperUtilsClass.ListIsEmpty(plistSource));

      if (listsOk)
        plistSource.forEach((item: JrrbSelectTypeList) => {
          if (HelperUtilsClass.StringEqual(result, ""))
            result = item.value.toString();
          else
            result += ", " + item.value.toString();
        });

      return result;
    },

    /**
     * 
     * @param plistSource Lista de origem, ou seja, servirá como parâmetro para setar os selecionados
     * @param pListSelected Lista de selecionados, ou seja, o merge entre pListSource e pListSelect, resultará em uma lista de selecionados
     * @description Faz o merge entre pListSource e pListSelect, resultando em uma lista de selecionados ( selecionado == true )
     */
    GetValuesAsSelected(plistSource: JrrbSelectTypeList[], pListSelected: string[]): JrrbSelectTypeList[] {
      let result: JrrbSelectTypeList[] = [];

      if (HelperUtilsClass.ListIsEmpty(plistSource) || HelperUtilsClass.ListIsEmpty(pListSelected))
        return plistSource;

      plistSource.forEach((item: JrrbSelectTypeList) => {
        item.selecionado =
          !HelperUtilsClass.ListIsEmpty(
            pListSelected.filter((filtered: string) => {
              return HelperUtilsClass.StringEqual(item.value.toString(), filtered)
            }));

        result.push(item);
      });


      return result;
    },
    /**
     * 
     * @param plistSource Lista onde será processada para obter o "value"
     * @description Obtém, a partir de uma lista de JrrbSelectTypeList (plistSource), uma string separado por vírgulas (,) contendo o caption do objeto do tipo JrrbSelectTypeList.  Todos o item marcados serão adicionados à string resultante.
     */
    GetCaptionsSelected(plistSource: JrrbSelectTypeList[]): string {
      let result: string = "";
      let listsOk: boolean = (!HelperUtilsClass.ListIsEmpty(plistSource));

      if (listsOk)
        plistSource.forEach((item: JrrbSelectTypeList) => {
          if (HelperUtilsClass.StringEqual(result, ""))
            result = item.caption;
          else
            result += ", " + item.caption;
        });

      return result;
    },

    /**
     * 
     * @param plistSource Lista que será executada a pesquisa
     * @param pValue Parâmetro utilizado para filtar a lista e assim, resultar no value
     * @returns String - Caption
     */
    GetCaptionSelected(plistSource: JrrbSelectTypeList[], pValue: number | string): string {
      let listsOk: boolean = (!HelperUtilsClass.ListIsEmpty(plistSource));

      if (!listsOk)
        return "";

      let listFilter: JrrbSelectTypeList[] =
        plistSource.filter((item: JrrbSelectTypeList) => {
          return HelperUtilsClass.StringEqual(item.value.toString(), pValue.toString())
        });

      if (HelperUtilsClass.ListIsEmpty(listFilter))
        return "";

      return listFilter[0].caption;
    },

    SetName(pSelected: any, pFieldControl: any): void {

      //inicializando o valor do campo
      pFieldControl.setValue(null);

      if (!HelperUtilsClass.ListIsEmpty(pSelected))
        pFieldControl.setValue(pSelected[0].caption);
    },

    /**
 * 
 * @param pJrrbSelectType Parâmetro do tipo JrrbSelectType
 * @returns Valores selection em value.
 */
    GetSelectedOptionsMultSelect(pFieldControl: any): string {
      let _result: string[] = [];

      if (HelperUtilsClass.ListIsEmpty(pFieldControl.value))
        return LibraryUtilsClass.NewString();

      pFieldControl.value.forEach((select: any) => {
        _result.push(select.value);
      });

      return _result.join(",");
    },

    LoadDiasSemana(): JrrbSelectTypeList[] {
      return ConstUtilsClass.day_of_week();
    },


    LoadMesesDoAno(): JrrbSelectTypeList[] {
      return ConstUtilsClass.meses_do_ano();
    },

    TransformChaveValorToTypeList(listChaveValor: IChaveValor[]): JrrbSelectTypeList[] {
      if (HelperUtilsClass.ListIsEmpty(listChaveValor))
        return [];

      let result: JrrbSelectTypeList[] = [];
      listChaveValor.map((item: IChaveValor) => {
        result.push(this.NewItem(item.chave, item.valor));
      });
      return result;
    }

  }

}