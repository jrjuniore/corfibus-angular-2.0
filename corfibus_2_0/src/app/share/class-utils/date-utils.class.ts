export type DiaSemanaType = {
  dia: number,
  strLong: string,
  strShort: string,
  strAbr: string
}

export type DiaMesType = {
  dia: number,
  diaImpr: string,
  semana: DiaSemanaType,
  mes: number,
  ano: number,
  qtdVendaEventual: number,
  full: Date,
  fullLocale: string,
}

export class DateUtils {

  static MonthCalendar(month: number, year: number): DiaMesType[][] {
    let listSemanaDias: DiaMesType[][] = [];
    let listDias: DiaMesType[] = [];

    //Obtendo a quantidade de dias do mês corrente
    let diasMes: number = this.DaysInMonth(month, year);

    //obtendo o dia da semana do primeiro dia do mês corrente
    let diaSemIni: number = new Date(year, month, 1).getDay();

    //montando o calendário
    for (let i = 1; i <= diasMes; i++) {

      listDias.push({
        dia: i,
        diaImpr: i.toString(),
        semana: this.GetDiaSemana(diaSemIni),
        mes: month,
        ano: year,
        qtdVendaEventual: 0,
        full: new Date(year, month, i),
        fullLocale: new Date(year, month, i).toLocaleDateString().substring(0, 10)
      });

      //Proximo dia da semana
      diaSemIni++;

      //Reiniciando a semana
      if (diaSemIni > 6) {
        diaSemIni = 0;

        listSemanaDias.push(listDias);
        listDias = JSON.parse(JSON.stringify([]));
      }
    }

    //Incluindo o restante
    if (listDias.length > 0)
      listSemanaDias.push(listDias);

    return listSemanaDias;
  }

  static ListMes(): string[] {
    return ([
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]);
  }

  static ListSemana(): DiaSemanaType[] {
    return ([
      this.GetDiaSemana(0),
      this.GetDiaSemana(1),
      this.GetDiaSemana(2),
      this.GetDiaSemana(3),
      this.GetDiaSemana(4),
      this.GetDiaSemana(5),
      this.GetDiaSemana(6),
    ]);
  }

  static GetDiaSemana(diaSemana: number): DiaSemanaType {
    switch (diaSemana) {
      case 0:
        return ({
          dia: diaSemana,
          strLong: 'Domingo',
          strShort: 'Domingo',
          strAbr: 'Dom'
        });

      case 1:
        return ({
          dia: diaSemana,
          strLong: 'Segunda-Feira',
          strShort: 'Segunda',
          strAbr: 'Seg'
        });

      case 2:
        return ({
          dia: diaSemana,
          strLong: 'Terça-Feira',
          strShort: 'Terça',
          strAbr: 'Ter'
        });

      case 3:
        return ({
          dia: diaSemana,
          strLong: 'Quarta-Feira',
          strShort: 'Quarta',
          strAbr: 'Qua'
        });

      case 4:
        return ({
          dia: diaSemana,
          strLong: 'Quinta-Feira',
          strShort: 'Quinta',
          strAbr: 'Qui'
        });

      case 5:
        return ({
          dia: diaSemana,
          strLong: 'Sexta-Feira',
          strShort: 'Sexta',
          strAbr: 'Sex'
        });

      case 6:
        return ({
          dia: diaSemana,
          strLong: 'Sábado',
          strShort: 'Sábado',
          strAbr: 'Sab'
        });

      default:
        return ({
          dia: -1,
          strLong: '',
          strShort: '',
          strAbr: ''
        });
    }
  }

  static StringToDate(pValue: string): Date | undefined {
    if (!pValue)
      return undefined;

    if (typeof (pValue) != 'string') {
      let _value: Date = pValue;
      return new Date(_value.toLocaleDateString("en-CA") + "T00:00:00")
    }

    pValue = pValue.trim();
    if (pValue.length <= 0)
      return undefined;

    if (pValue.length > 10)
      return new Date(pValue.substring(0, 10).trim() + 'T00:00:00');

    return new Date(pValue);
  }

  static StringToDateTime(pValue: string): Date | undefined {
    if (!pValue)
      return undefined;

    if (typeof (pValue) != 'string')
      return new Date(pValue);

    pValue = pValue.trim();
    if (pValue.length <= 0)
      return undefined;

    return new Date(pValue);
  }

  static DaysInMonth(month: number, year: number): number {
    let now: Date = new Date(year, month, 1);
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }

  static DaysInRangeDate(pDateStart: Date, pDateEnd: Date, pForcePositive: boolean = true): number {
    let countDays: number = pDateEnd.getTime() - pDateStart.getTime();
    let result: number = (countDays / (1000 * 3600 * 24));
    result = Number(result.toFixed(0));

    return Math.floor(pForcePositive ? Math.abs(result) : result);
  }

  static FormatDate(pDate: Date, pWithTime: boolean = true): string {
    let result: string;
    let _date: Date = new Date(pDate);
    let dia: number = _date.getDate();
    let mes: number = _date.getMonth() + 1;
    let ano = _date.getFullYear();

    let hora = _date.getHours();
    let minuto = _date.getMinutes();
    let segundo = _date.getSeconds();

    //Inserindo a data
    result =
      `${dia < 10 ? '0' + dia.toString() : dia.toString()}/${mes < 10 ? '0' + mes.toString() : mes.toString()}/${ano.toString()}`;

    //Inserindo a hora
    if (pWithTime)
      result += ` ${hora < 10 ? '0' + hora.toString() : hora.toString()}:${minuto < 10 ? '0' + minuto.toString() : minuto.toString()}:${segundo < 10 ? '0' + segundo.toString() : segundo.toString()}`;

    return result;
  }


  static getFirstDayOfCurrentMonth() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  }

  static getLastDayOfCurrentMonth() {
    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
  }

  static getLastDayOfMonth(pMount: number) {
    var date = new Date('2000-' + ("0" + (pMount + 1).toString()).slice(-2) + '-01');
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
  }

  static getCurrentDateJS(): Date {
    return new Date();
  }

  static getCurrentDateDB(): Date {
    let _date: Date = new Date();
    let _yyyy: number = _date.getFullYear();
    let _mm: number = _date.getMonth() + 1;
    let _dd: number = _date.getDate();

    return new Date(_yyyy.toString() + '-' + _mm.toString() + '-' + _dd.toString() + ' ' + _date.toLocaleTimeString());
  }

  static DateDbIsFormated(pDate: Date) {
    try {
      let dateDecomp: string[] = pDate.toString().split('-');
      let dateOk: boolean =
        (Number(dateDecomp[0]) > 1900) &&
        ((Number(dateDecomp[1]) >= 1) && (Number(dateDecomp[1]) <= 12)) &&
        ((Number(dateDecomp[1]) >= 1) && (Number(dateDecomp[1]) <= 31));

      return dateOk;
    } catch (error) {
      return false;
    }
  }

  static FormatDateDB(pDate: Date, pFormat?: string, pWithTime?: boolean): string | null {

    if ((pDate == null) || (pDate == undefined))
      return null;

    if (pDate.toString().trim().length <= 0)
      return null;

    //verificando se a data já está no formato do banco
    if (this.DateDbIsFormated(pDate))
      return pDate.toString();

    let _date: Date = new Date(pDate);
    let _yyyy: number = _date.getFullYear();
    let _mm: number = _date.getMonth() + 1;
    let _dd: number = _date.getDate();
    let _timeString: string = ' ' + _date.toLocaleTimeString();

    if (pFormat)
      return (_date.toLocaleDateString(pFormat));

    return (
      _yyyy.toString() + '-' +
      (_mm <= 9 ? "0" + _mm.toString() : _mm.toString()) + '-' +
      (_dd <= 9 ? "0" + _dd.toString() : _dd.toString()) +
      (pWithTime ? _timeString : '')
    );
  }

  static getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }

  static getCurrentDateLocale(): string {
    return new Date().toLocaleDateString().replace(",", "");
  }

  static getCurrentDateTimeLocale(): string {
    return new Date().toLocaleString().replace(",", "");
  }

  static AddMinutes(pDate: Date, pMinutes: number): Date {
    let data = pDate.setMinutes(pDate.getMinutes() + pMinutes);

    return new Date(data);
  }

  static AddMinutesCurrenteTime(pMinutes: number): Date {
    let data = this.getCurrentDateJS();
    data.setMinutes(data.getMinutes() + pMinutes);

    return new Date(data);
  }

  static AddDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  static AddYear(pDate: Date, pYears: number): Date {

    let d = new Date(pDate);
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();

    return new Date(year + pYears, month, day);
  }

  static YearOfDate(pDate: string) {
    try {
      return new Date(pDate).getFullYear();
    }
    catch {
      return 0;
    }
  }

  static ToSetPeriodo(pValuePeriodo: number, pFrente: boolean = false): any {
    let _result: any = {};
    let _firstDay: Date = this.getFirstDayOfCurrentMonth();
    let _lastDay: Date = this.getLastDayOfCurrentMonth();
    let _currentDay: Date = this.getCurrentDateJS();

    switch (pValuePeriodo) {

      //7 dias
      case 0: {
        _result.periodoDe = !pFrente ? this.AddDays(this.getCurrentDateJS(), -7) : this.getCurrentDateJS();
        _result.periodoAte = !pFrente ? this.getCurrentDateJS() : this.AddDays(this.getCurrentDateJS(), 7);
        break;
      }

      //15 dias
      case 1: {
        _result.periodoDe = !pFrente ? this.AddDays(this.getCurrentDateJS(), -15) : this.getCurrentDateJS();
        _result.periodoAte = !pFrente ? this.getCurrentDateJS() : this.AddDays(this.getCurrentDateJS(), 15);
        break;
      }

      //30 dias
      case 2: {
        _result.periodoDe = !pFrente ? this.AddDays(this.getCurrentDateJS(), -30) : this.getCurrentDateJS();
        _result.periodoAte = !pFrente ? this.getCurrentDateJS() : this.AddDays(this.getCurrentDateJS(), 30);
        break;
      }

      //45 dias
      case 3: {
        _result.periodoDe = !pFrente ? this.AddDays(this.getCurrentDateJS(), -45) : this.getCurrentDateJS();
        _result.periodoAte = !pFrente ? this.getCurrentDateJS() : this.AddDays(this.getCurrentDateJS(), 45);
        break;
      }

      //60 dias
      case 4: {
        _result.periodoDe = !pFrente ? this.AddDays(this.getCurrentDateJS(), -60) : this.getCurrentDateJS();
        _result.periodoAte = !pFrente ? this.getCurrentDateJS() : this.AddDays(this.getCurrentDateJS(), 60);
        break;
      }

      //75 dias
      case 5: {
        _result.periodoDe = !pFrente ? this.AddDays(this.getCurrentDateJS(), -75) : this.getCurrentDateJS();
        _result.periodoAte = !pFrente ? this.getCurrentDateJS() : this.AddDays(this.getCurrentDateJS(), 75);
        break;
      }

      //90 dias
      case 6: {
        _result.periodoDe = !pFrente ? this.AddDays(this.getCurrentDateJS(), -90) : this.getCurrentDateJS();
        _result.periodoAte = !pFrente ? this.getCurrentDateJS() : this.AddDays(this.getCurrentDateJS(), 90);
        break;
      }

      default: {
        _result.periodoDe = !pFrente ? _firstDay : _currentDay;
        _result.periodoAte = !pFrente ? this.getCurrentDateJS() : _lastDay;
        break;
      }
    }

    return _result;
  }

  static GetHourFromList(pIndex: number): string {
    switch (pIndex) {
      case 0: { return "00:00"; break; }
      case 1: { return "01:00"; break; }
      case 2: { return "02:00"; break; }
      case 3: { return "03:00"; break; }
      case 4: { return "04:00"; break; }
      case 5: { return "05:00"; break; }
      case 6: { return "06:00"; break; }
      case 7: { return "07:00"; break; }
      case 8: { return "08:00"; break; }
      case 9: { return "09:00"; break; }
      case 10: { return "10:00"; break; }
      case 11: { return "11:00"; break; }
      case 12: { return "12:00"; break; }
      case 13: { return "13:00"; break; }
      case 14: { return "14:00"; break; }
      case 15: { return "15:00"; break; }
      case 16: { return "16:00"; break; }
      case 17: { return "17:00"; break; }
      case 18: { return "18:00"; break; }
      case 19: { return "19:00"; break; }
      case 20: { return "20:00"; break; }
      case 21: { return "21:00"; break; }
      case 22: { return "22:00"; break; }
      case 23: { return "23:00"; break; }
      case 24: { return "00:30"; break; }
      case 25: { return "01:30"; break; }
      case 26: { return "02:30"; break; }
      case 27: { return "03:30"; break; }
      case 28: { return "04:30"; break; }
      case 29: { return "05:30"; break; }
      case 30: { return "06:30"; break; }
      case 31: { return "07:30"; break; }
      case 32: { return "08:30"; break; }
      case 33: { return "09:30"; break; }
      case 34: { return "10:30"; break; }
      case 35: { return "11:30"; break; }
      case 36: { return "12:30"; break; }
      case 37: { return "13:30"; break; }
      case 38: { return "14:30"; break; }
      case 39: { return "15:30"; break; }
      case 40: { return "16:30"; break; }
      case 41: { return "17:30"; break; }
      case 42: { return "18:30"; break; }
      case 43: { return "19:30"; break; }
      case 44: { return "20:30"; break; }
      case 45: { return "21:30"; break; }
      case 46: { return "22:30"; break; }
      case 47: { return "23:30"; break; }
      default:
        return ''
    }
  }

  static GetIndexHourFromList(pHour: string): number {
    switch (pHour) {
      case "01:00": { return 1; break; }
      case "02:00": { return 2; break; }
      case "03:00": { return 3; break; }
      case "04:00": { return 4; break; }
      case "05:00": { return 5; break; }
      case "06:00": { return 6; break; }
      case "07:00": { return 7; break; }
      case "08:00": { return 8; break; }
      case "09:00": { return 9; break; }
      case "10:00": { return 10; break; }
      case "11:00": { return 11; break; }
      case "12:00": { return 12; break; }
      case "13:00": { return 13; break; }
      case "14:00": { return 14; break; }
      case "15:00": { return 15; break; }
      case "16:00": { return 16; break; }
      case "17:00": { return 17; break; }
      case "18:00": { return 18; break; }
      case "19:00": { return 19; break; }
      case "20:00": { return 20; break; }
      case "21:00": { return 21; break; }
      case "22:00": { return 22; break; }
      case "23:00": { return 23; break; }
      case "00:30": { return 24; break; }
      case "01:30": { return 25; break; }
      case "02:30": { return 26; break; }
      case "03:30": { return 27; break; }
      case "04:30": { return 28; break; }
      case "05:30": { return 29; break; }
      case "06:30": { return 30; break; }
      case "07:30": { return 31; break; }
      case "08:30": { return 32; break; }
      case "09:30": { return 33; break; }
      case "10:30": { return 34; break; }
      case "11:30": { return 35; break; }
      case "12:30": { return 36; break; }
      case "13:30": { return 37; break; }
      case "14:30": { return 38; break; }
      case "15:30": { return 39; break; }
      case "16:30": { return 40; break; }
      case "17:30": { return 41; break; }
      case "18:30": { return 42; break; }
      case "19:30": { return 43; break; }
      case "20:30": { return 44; break; }
      case "21:30": { return 45; break; }
      case "22:30": { return 46; break; }
      case "23:30": { return 47; break; }
      default:
        return 0;
    }
  }

  static CalcularDiferencaEmMinutos(dataHoraInicial: Date, dataHoraFinal: Date): number {
    // Obter o tempo em milissegundos de cada data/hora
    let tempoInicial = dataHoraInicial.getTime();
    let tempoFinal = dataHoraFinal.getTime();

    // Calcular a diferença em milissegundos
    let diferencaEmMilissegundos = tempoFinal - tempoInicial;

    // Converter a diferença de milissegundos para minutos
    let diferencaEmMinutos = diferencaEmMilissegundos / (1000 * 60);

    return diferencaEmMinutos;
  }

  static DataMaiorQueHoje(pValue: string): boolean {
    try {
      return (new Date() > new Date(pValue));
    } catch {
      return false;
    }
  }

  static DataMaiorIgualQueHoje(pValue: string): boolean {
    try {
      return (new Date() >= new Date(pValue));
    } catch {
      return false;
    }
  }

  static DataMenorQueHoje(pValue: string): boolean {
    try {
      return (new Date() < new Date(pValue));
    } catch {
      return false;
    }
  }

  static DataMenorIgualQueHoje(pValue: string): boolean {
    try {
      return (new Date() <= new Date(pValue));
    } catch {
      return false;
    }
  }

}