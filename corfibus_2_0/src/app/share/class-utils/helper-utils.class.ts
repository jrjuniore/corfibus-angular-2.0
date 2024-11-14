const expHifen = /-/g;

export class HelperUtilsClass {

  static ListIsEmpty(pList: any): boolean {
    return !(this.ObjectIsList(pList) && (pList.length > 0));
  }

  static ListLength(pList: any): number {
    return pList ? pList.length : 0
  }

  static ObjectIsEquals(pObj1: any, pObj2: any): boolean {
    return JSON.stringify(pObj1) == JSON.stringify(pObj2);
  }

  static ObjectIsList(pValue: any): boolean {
    return !this.ObjectIsEmpty(pValue) && !(pValue.forEach == null || pValue.forEach == undefined);
  }

  static ObjectIsEmpty(pObject: any): boolean {
    let result: boolean = ((pObject == null) || (pObject == undefined));

    //Verificando se tem atributos
    if (!result)
      result = Object.keys(pObject).length <= 0;

    return result;
  }

  static GuidIsEmpty(pValue: string): boolean {
    return this.StringIsEmpty(pValue) || this.StringEqual("00000000-0000-0000-0000-000000000000", pValue);
  }

  static StringIsGuid(pValue: string): boolean {
    let regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(pValue);
  }

  static StringToList(pValue: string, pSeparador?: string): string[] {
    if (this.StringIsEmpty(pValue))
      return [];

    return pValue.split(pSeparador ? pSeparador : ',');
  }

  static StringEqual(pValueString?: string, pValueCompare?: string): boolean {
    return (
      this.StringToLower(this.StringTrim(pValueString)) ===
      this.StringToLower(this.StringTrim(pValueCompare))
    );
  }

  static StringToLower(pValue: string): string {
    let result = '';

    if (this.StringIsEmpty(pValue))
      return result;

    result = pValue.toString().trim().toLowerCase();
    return result;
  }

  static StringToUpper(pValue: string): string {
    let result = '';

    if (this.StringIsEmpty(pValue))
      return result;

    result = pValue.toString().trim().toUpperCase();
    return result;
  }

  static StringCopy(pValue: string, pStart: number, pEnd: number) {
    let canCopy: boolean =
      !Number.isNaN(pStart) &&
      !Number.isNaN(pEnd) &&
      !this.StringIsEmpty(pValue);

    if (!canCopy)
      return pValue;

    return pValue.substring(pStart, pEnd);
  }

  static StringContain(pValue: string, pValueSearch: string): boolean {
    let result: boolean = false;

    if (!this.StringIsEmpty(pValue))
      result = pValue.indexOf(pValueSearch) >= 0

    return result;
  }

  static StringIsEmpty(pValue?: string): boolean {
    return this.StringLength(pValue) <= 0;
  }

  static StringTrim(pValue?: string): string {
    let result: string = "";

    if (!pValue)
      return result;

    if (!this.StringIsEmpty(pValue))
      result = pValue.toString().trim();

    return result;
  }

  static StringLength(pValue: any): number {
    let result: number = -1;

    if (!((pValue == null) || (pValue == undefined)))
      result = pValue.toString().trim().length

    return result;
  }

  static StringMaiorOuIgual(pValue: any, pMinLength: number): boolean {
    let result: boolean = false;

    if (!isNaN(pMinLength) && !this.StringIsEmpty(pValue))
      result = pValue.length >= pMinLength;

    return result;
  }

  static StringMenorOuIgual(pValue: any, pMaxLength: number): boolean {
    let result: boolean = false;

    if (!isNaN(pMaxLength) && !this.StringIsEmpty(pValue))
      result = pValue.length <= pMaxLength;

    return result;
  }

  static StringToDate(pValue: string): Date | null {
    return this.StringIsEmpty(pValue) ? null : new Date(pValue.replace(expHifen, ','));
  }

  static StringToInt(pValue: string): number {
    return this.StringIsEmpty(pValue) ? 0 : parseInt(pValue);
  }

  static StringToFloat(pValue: string): number {
    return this.StringIsEmpty(pValue) ? 0 : parseFloat(pValue);
  }

  static NumberMaiorOuIgual(pValue: any, pMinNumber: number): boolean {
    let result: boolean = false;

    if (!isNaN(pValue) && !isNaN(pMinNumber))
      result = pValue >= pMinNumber;

    return result;
  }

  static NumberIsEqual(pValue: any, pNumber: number): boolean {
    let result: boolean = false;

    if (!isNaN(pValue) && !isNaN(pNumber))
      result = pValue == pNumber;

    return result;
  }

  static NumberMenorOuIgual(pValue: any, pMaxNumber: number): boolean {
    let result: boolean = false;

    if (!isNaN(pValue) && !isNaN(pMaxNumber))
      result = pValue <= pMaxNumber;

    return result;
  }

  static FormatNumberInt(pValue: number, pMinimumIntegerDigits: number = 1): string {
    return pValue.toLocaleString('pt-br', { minimumIntegerDigits: pMinimumIntegerDigits < 1 ? 1 : pMinimumIntegerDigits });
  }

  static TimeIsOk(pTime: string): boolean {
    if (this.StringIsEmpty(pTime))
      return false;

    const hora: number = Number(pTime.split(":")[0]);
    const minuto: number = Number(pTime.split(":")[1]);

    const horasOk: boolean = (hora >= 0) && (hora <= 23);
    const minutosOk: boolean = (minuto >= 0) && (minuto <= 59);

    return horasOk && minutosOk;
  }

  static EmailIsValid(email: string): boolean {
    if (this.StringIsEmpty(email))
      return false;

    // Expressão regular básica para validação de e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return regex.test(email);
  }

}