import { DateUtils } from './date-utils.class';
import { Md5 } from 'ts-md5';
import { EnumFieldType } from '../enums/enumFieldType.enum';

export class LibraryUtilsClass {

  static keyEncript: string = "818f1ad0-b96a-47d9-865e-6fcc34feda0a";

  static NewId(): string {
    return this.Copy(`web${Math.random().toString().substring(2, 50)}`);
  }

  static NewNumberRamdon(): number {
    return Number(this.Copy(Math.random().toString().substring(2, 9)));
  }

  static NewGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static SelectDistinct<T>(array: T[], key: keyof T): T[] {
    const seen = new Set();
    return array.filter(item => {
      const val = item[key];
      if (seen.has(val)) {
        return false;
      }
      seen.add(val);
      return true;
    });
  }

  static GuidEmpty(): string {
    return '00000000-0000-0000-0000-000000000000';
  }

  static NewString(): string {
    return this.Copy('');
  }

  static NewObject(): any {
    return this.Copy({});
  }

  static NewList(): [] {
    return this.Copy([]);
  }

  static RoundNumber(pNumber: number | string, pRound: number): number {
    let _result: string = pNumber.toString();

    let _temApenasUmPonto: boolean =
      (_result.indexOf(",") <= 0) &&
      _result.split(".").length == 2;

    if (_temApenasUmPonto)
      return (
        typeof (pNumber) == 'string' ? Number(Number(_result).toFixed(pRound)) :
          Number(pNumber.toFixed(pRound))
      );

    _result = _result.replaceAll(".", "").replace(",", ".");
    return Number(Number(_result).toFixed(pRound));
  }

  static Copy(pObjectCopy: any): any {
    return JSON.parse(JSON.stringify(pObjectCopy));
  }

  static InitTooltipScreen() {
    //TODO
    this.ToClick('web202209102300');
  }

  static CopyObject(pObjSource: any, pObjDest: any): any {
    let result: any = this.Copy(pObjDest);

    if (pObjSource)
      if (!result)
        result = pObjSource;
      else
        if (Object.keys(result).length <= 0)
          result = pObjSource;
        else
          Object.keys(result).forEach((key: string) => {
            if ((pObjSource[key] != undefined) || (pObjSource[key] != null))
              result[key] = pObjSource[key];
          });

    return JSON.parse(JSON.stringify(result));
  }

  static SetFocus(pSelector: string): void {
    (<HTMLInputElement>document.querySelector("#" + pSelector)!).focus();
    (<HTMLInputElement>document.querySelector("#" + pSelector)!).select();
  }


  static RemoveTagHtml(pSelector: string): void {
    document.querySelector("#" + pSelector)!.remove();
  }

  static ShowTreeView(pSelector: string, pIdTrigger: string): void {
    let _show: boolean = <boolean>document.querySelector("#" + pSelector)?.classList.contains('wtree-show');

    document.querySelector("#" + pSelector)?.classList.remove('wtree-show');
    document.querySelector("#" + pSelector)?.classList.remove('wtree-hide');
    document.querySelector("#" + pIdTrigger)?.classList.remove('fa-square-plus');
    document.querySelector("#" + pIdTrigger)?.classList.remove('fa-square-minus');

    if (_show) {
      document.querySelector("#" + pSelector)?.classList.add('wtree-hide');
      document.querySelector("#" + pIdTrigger)?.classList.add('fa-square-plus');
    }
    else {
      document.querySelector("#" + pSelector)?.classList.add('wtree-show');
      document.querySelector("#" + pIdTrigger)?.classList.add('fa-square-minus');
    }
  }

  static ShowElement(pSelector: string, pShow?: boolean): void {

    if (pShow)
      document.querySelector("#" + pSelector)?.classList.remove('visually-hidden');
    else
      document.querySelector("#" + pSelector)?.classList.add('visually-hidden');
  }

  static CollapseElement(pSelector: string): void {
    let _show: boolean = <boolean>document.querySelector("#" + pSelector)?.classList.contains('show');

    if (!_show)
      document.querySelector("#" + pSelector)?.classList.add('show');
    else
      document.querySelector("#" + pSelector)?.classList.remove('show');
  }

  static GetMd5(pValue: string): string {
    return Md5.hashStr(pValue).toUpperCase();
  }

  static LoadOk(): void {
    this.ShowElement('spinnerProcess');
  }

  static OnLoad(): void {
    this.ShowElement('spinnerProcess', true);
  }

  static ToClick(pSelector: string): void {
    if (pSelector)
      document.getElementById(pSelector)?.click();
  }

  static Encriptar(pValue: string): string {
    let keyNumber: number = this.StringToCodAtSum(this.keyEncript);
    let result: string = '';

    if (pValue)
      for (let index = 0; index < pValue.length; index++)
        if (!result)
          result = (pValue[index].charCodeAt(0) + keyNumber).toString();
        else
          result =
            result + "." + (pValue[index].charCodeAt(0) + keyNumber).toString();

    return result;
  };

  static Decriptar(pValue: string): string {
    let keyNumber: number = this.StringToCodAtSum(this.keyEncript);
    let result: string = '';

    if (pValue)
      pValue.split(".").forEach((element) => {
        if (!result) result = String.fromCharCode(Number(element) - keyNumber);
        else result = result + String.fromCharCode(Number(element) - keyNumber);
      });

    return result;
  };

  static EncriptarDados(pObjectData: any): any {
    let _result: any = {};
    if (!pObjectData)
      return _result;

    Object.keys(pObjectData).forEach((field: string) => {
      _result[field] = this.Encriptar(pObjectData[field]);
    });

    return _result;
  }

  static DecriptarDados(pObjectData: any): any {
    let _result: any = {};
    if (!pObjectData)
      return _result;

    Object.keys(pObjectData).forEach((field: string) => {
      _result[field] = this.Decriptar(pObjectData[field]);
    });

    return _result;
  }

  static StringToCodAtSum(pValue: string): number {
    var result = 0;

    if (pValue)
      for (let index = 0; index < pValue.length; index++)
        result = result + pValue[index].charCodeAt(0);

    return result;
  }

  static BindColumnTable(pValue: any, pTypeField: EnumFieldType) {
    let result: string = "";

    if (pValue == undefined)
      return result;

    //Aplicando a formatação
    result = pValue;
    switch (pTypeField) {
      case EnumFieldType.boolean: {
        result = ((result.toString().toUpperCase() == "TRUE") ||
          (result.toString().toUpperCase() == "SIM")) ? "Sim" : "Não";
        break;
      }

      case EnumFieldType.date: {
        result = DateUtils.FormatDate(new Date(result), false);
        break;
      }

      case EnumFieldType.dateTime: {
        result = DateUtils.FormatDate(new Date(result));
        break;
      }

      case EnumFieldType.money: {
        result = "R$ " + this.FormatMoney(Number(result));
        break;
      }

      default: {
        result = result;
        break;
      }
    }

    if (!result)
      result = "-";

    return result;
  }

  static ActiveMenu() {
    //TODO
    this.ToClick('202209081041');
  }

  static CloseMenu() {
    //TODO
    this.ToClick('202209081042');
  }

  static FormatMoney(value: number): string {
    let formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return formatter.format(value);
  }

  static FormatPercentage(value: number): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(value);
  }

  //pNotSearchList => os valores que estiverem nesta lista serão desconsiderados pela pesqusia
  static FilterListAllFields<T>(pList: T[] = [], pValueSearch: string, pNotSearchList: string[] = []): T[] {
    let result: any[] = [];
    let finded: boolean;

    pList.map((item: any) => {
      finded = false;
      Object.keys(item).forEach((key: string) => {
        if ((item[key] != null) &&
          ((pNotSearchList.indexOf(item[key].toString().toLowerCase()) < 0) || (pNotSearchList.length <= 0)) &&
          (item[key].toString().normalize('NFD').replace(/\p{Diacritic}/gu, "")
            .toLowerCase()
            .indexOf(pValueSearch.normalize('NFD').replace(/\p{Diacritic}/gu, "").toLowerCase()) >= 0))

          if (!finded) {
            finded = true;
            result.push(item);
          }
      });
    });

    return result;
  }

  static CloseOpenModal(pSelectorModal: string, pShow: boolean = true): void {
    let objModal = (<HTMLInputElement>document.querySelector('#' + (pShow ? 'web202209150934' : 'web009710274909038308')));
    objModal.value = pSelectorModal;
    objModal.click();
  }

  /**
   * 
   * @param pListRefresh implementa uma lista
   * @param pRecordValue registro a ser incluído/alterado/excluído da lista
   */
  static RefreshTable(pKeyFieldName: string, pListRefresh: any[], pRecordValue: any): void {

    //Lista está vazia
    if (pListRefresh.length <= 0)
      pListRefresh.push(pRecordValue);
    else
      //Registro encontrado, ALTERAR; senão, INCLUIR
      if (pListRefresh.filter((record: any) => {
        return (record[pKeyFieldName] === pRecordValue[pKeyFieldName])
      }).length > 0)
        pListRefresh.forEach((record: any, index: number) => {
          if (record[pKeyFieldName] === pRecordValue[pKeyFieldName]) {
            pListRefresh[index] = pRecordValue;
            return;
          }
        });
      else
        pListRefresh.push(pRecordValue);
  }


  static GetValueInput(pIdSelect: string): string {
    let _element: HTMLInputElement = <HTMLInputElement>document.querySelector("#" + pIdSelect);

    if (!_element)
      return '';

    return _element.value.toUpperCase();
  }

  static GetTextCombo(pIdSelect: string): string {
    let _element: HTMLSelectElement = <HTMLSelectElement>document.querySelector("#" + pIdSelect);

    if (!_element)
      return '';

    return (<string>_element.textContent).toUpperCase();
  }

  static SetValueCheckBox(pIdSelector: string, pChecked?: boolean): void {
    let _elCheck: HTMLInputElement = <HTMLInputElement>document.querySelector('#' + pIdSelector);

    if (_elCheck)
      _elCheck.checked = pChecked ?? true;
  }

  static SetValueInput(pIdSelector: string, pValue: any): void {
    let _elInput: HTMLInputElement = <HTMLInputElement>document.querySelector('#' + pIdSelector);

    _elInput.value = pValue;
  }

  static SetDivHtml(pIdSelector: string, pHtml: string): void {
    let _elSelect: HTMLDivElement = <HTMLDivElement>document.querySelector('#' + pIdSelector);

    if (_elSelect != null)
      _elSelect.innerHTML = pHtml;

  }

  static SetErrorControl(pMessageError: string): any {
    return { message_personal_error: pMessageError };
  }

  static SetElementHtml(pIdSelector: string, pHtml: string): void {
    let _elSelect: HTMLElement = <HTMLElement>document.querySelector('#' + pIdSelector);

    if (_elSelect != null)
      _elSelect.innerHTML = pHtml;

  }

  static EmptyElementHtml(pIdSelector: string): void {
    let _elSelect: HTMLElement = <HTMLElement>document.querySelector('#' + pIdSelector);

    _elSelect.innerHTML = "";

  }

  static SetValueSelect(pIdSelector: string, pValue: any): void {
    let _elSelect: HTMLSelectElement = <HTMLSelectElement>document.querySelector('#' + pIdSelector);

    _elSelect.value = pValue;
  }

  static GetClassCol(pCol: number = 1): string {
    return (
      `align-self-center jrrb-margin-bottom-response-1rem col-12 col-sm-12 col-md-12 col-lg-${pCol} col-xl-${pCol} col-xxl-${pCol}`
    )
  }

  static GetClassColAlignTop(pCol: number = 1): string {
    return (
      `jrrb-margin-bottom-response-1rem col-12 col-sm-12 col-md-12 col-lg-${pCol} col-xl-${pCol} col-xxl-${pCol}`
    )
  }

  static GetClassColSingle(): string {
    return (
      `align-self-center jrrb-margin-bottom-response-1rem col-12 col-sm-12 col-md-12 col-lg col-xl col-xxl`
    )
  }

  static GetClassColSingleAlignTop(pCol: number = 1): string {
    return (
      `jrrb-margin-bottom-response-1rem col-12 col-sm-12 col-md-12 col-lg col-xl col-xxl`
    )
  }


  static GetClassRow(pClassAdicional: string = ""): string {
    return 'row w-100 m-0 ' + pClassAdicional;
  }

  static SetAttributeDataSet(pIdSelector: string, pAttribute: string, pAttributeValue: any): void {
    let _element: HTMLElement = <HTMLElement>document.querySelector("#" + pIdSelector);

    if (_element)
      _element.dataset[pAttribute] = pAttributeValue;
  }

  static ToPrintReport(pResponse: string) {
    window.open(window.URL.createObjectURL(this.B64toBlob(pResponse, "application/pdf")));

  }

  static ObjectToList(pListObject: any[], pFieldItem: string): any[] {
    let _result: any[] = [];

    pListObject.forEach((item: any) => {
      _result.push(item[pFieldItem!]);
    })

    return _result;
  }

  private static B64toBlob(pB64Data: string, pContentType: string): any {
    pContentType = pContentType || '';
    let sliceSize = 512;

    var byteCharacters = atob(pB64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: pContentType });
    return blob;
  }


}