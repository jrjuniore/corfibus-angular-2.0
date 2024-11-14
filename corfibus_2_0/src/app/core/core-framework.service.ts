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

  public classRowDefault = signal(LibraryUtilsClass.GetClassRow());
  public classRow = signal(LibraryUtilsClass.GetClassRow('py-2'));
  public classRowCenter = signal(LibraryUtilsClass.GetClassRow('py-2 justify-content-center'));
  public classColSingle = signal(LibraryUtilsClass.GetClassColSingle());
  public classColSingleATop = signal(LibraryUtilsClass.GetClassColSingleAlignTop());
  public classCol1 = signal(LibraryUtilsClass.GetClassCol(1));
  public classCol1ATop = signal(LibraryUtilsClass.GetClassColAlignTop(1));
  public classCol2 = signal(LibraryUtilsClass.GetClassCol(2));
  public classCol2ATop = signal(LibraryUtilsClass.GetClassColAlignTop(2));
  public classCol3 = signal(LibraryUtilsClass.GetClassCol(3));
  public classCol3ATop = signal(LibraryUtilsClass.GetClassColAlignTop(3));
  public classCol4 = signal(LibraryUtilsClass.GetClassCol(4));
  public classCol4ATop = signal(LibraryUtilsClass.GetClassColAlignTop(4));
  public classCol5 = signal(LibraryUtilsClass.GetClassCol(5));
  public classCol5ATop = signal(LibraryUtilsClass.GetClassColAlignTop(5));
  public classCol6 = signal(LibraryUtilsClass.GetClassCol(6));
  public classCol6ATop = signal(LibraryUtilsClass.GetClassColAlignTop(6));
  public classCol7 = signal(LibraryUtilsClass.GetClassCol(7));
  public classCol7ATop = signal(LibraryUtilsClass.GetClassColAlignTop(7));
  public classCol8 = signal(LibraryUtilsClass.GetClassCol(8));
  public classCol8ATop = signal(LibraryUtilsClass.GetClassColAlignTop(8));
  public classCol9 = signal(LibraryUtilsClass.GetClassCol(9));
  public classCol9ATop = signal(LibraryUtilsClass.GetClassColAlignTop(9));
  public classCol10 = signal(LibraryUtilsClass.GetClassCol(10));
  public classCol10ATop = signal(LibraryUtilsClass.GetClassColAlignTop(10));
  public classCol11 = signal(LibraryUtilsClass.GetClassCol(11));
  public classCol11ATop = signal(LibraryUtilsClass.GetClassColAlignTop(11));
  public classCol12 = signal(LibraryUtilsClass.GetClassCol(12));
  public classCol12ATop = signal(LibraryUtilsClass.GetClassColAlignTop(12));

  public faBase = signal('fa fa-solid fa-');
  public faBaseBase = signal(' jrrb-color-snow me-2');
  public faTable = signal(this.faBase() + 'table' + this.faBaseBase());
  public faDatabase = signal(this.faBase() + 'database' + this.faBaseBase());
  public faFilePdf = signal(this.faBase() + 'file-pdf' + this.faBaseBase());
  public faCog = signal(this.faBase() + 'cog' + this.faBaseBase());
  public faAcessos = signal(this.faBase() + 'cog' + this.faBaseBase());
  public faUserFireWall = signal(this.faBase() + 'user-shield' + this.faBaseBase());
  public faGlasses = signal(this.faBase() + 'glasses' + this.faBaseBase());
  public marginResponsiva = signal('mb-md-0 mb-lg-0, mb-xl-0 mb-xxl-0 mb-');

  //para uso externo
  public emailFrom = signal("noreply@corfibus.com.br");
  public emailToAdminCorfiBus = signal("admin@corfibus.com.br");

  public listFieldsNames = signal(['nome', 'ativoStr', 'date_Create_Str', 'date_Alter_Str']);
  public listFieldsCaption = signal(['Tipo', 'Ativo', 'Data Inclusão', 'Data Alteração']);
  public listFields2Caption = signal(['Nome', 'Ativo', 'Data Inclusão', 'Data Alteração']);
  public listFieldsNamesEntidade = signal(["nome", "cpf_Cnpj", "ativoStr", "date_Create_Str", "date_Alter_Str"]);
  public listFieldsCaptionsEntidade = signal(["Nome", "CNPJ", "Ativo", "Data Inclusão", "Data Alteração"]);

  public logoReport = signal('LOGO_RELATORIO');
  public titleReportListagens = signal('Relatórios Disponíveis');
  public titleDetailScreen = signal('Detalhes Cadastro');
  public reportCaption = signal('Relatório');
  public reportPeriodo30DiasCaption = signal('Período de 30 dias');
  public reportPeriodo31DiasCaption = signal('Período de 31 dias');
  public reportCaptionRadioGroup = signal('Selecione um período');
  public fieldNameValue = signal('value');
  public fieldNameCaption = signal('caption');

  public width_sm = signal(ConstUtilsClass.width_sm());
  public width_md = signal(ConstUtilsClass.width_md());
  public width_md2 = signal(ConstUtilsClass.width_md2());
  public width_md3 = signal(ConstUtilsClass.width_md3());
  public width_lg = signal(ConstUtilsClass.width_lg());
  public width_lg2 = signal(ConstUtilsClass.width_lg2());
  public width_xl = signal(ConstUtilsClass.width_xl());
  public width_max = signal(ConstUtilsClass.width_max());

  public maskCpf = signal(ConstUtilsClass.mask_cpf());
  public maskPhone = signal(ConstUtilsClass.mask_phone());
  public maskCnpj = signal(ConstUtilsClass.mask_cnpj());
  public maskCep = signal(ConstUtilsClass.mask_cep());
  public maskAnoFab = signal(ConstUtilsClass.mask_ano_fabricacao());
  public maskAnoMod = signal(ConstUtilsClass.mask_ano_modelo());
  public maskRenavam = signal(ConstUtilsClass.mask_renavam());
  public maskNumberDoisDigitos = signal(ConstUtilsClass.mask_number_dois_digitos());
  public maskNumberSeteDigitos = signal(ConstUtilsClass.mask_sete_digitos());
  public maskNumberDoisDecimais = signal(ConstUtilsClass.mask_money2());
  public maskHoraMininuto = signal(ConstUtilsClass.mask_time_short());

  public maskTimeShort = signal(ConstUtilsClass.mask_time_short());
  public horaMinima = signal('08:00');
  public horaMaxima = signal('17:00');
  public diaSemaInicial = signal(1);
  public diaSemaFinal = signal(5);

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