import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperUtilsClass } from '../../../share/class-utils/helper-utils.class';

@Component({
  selector: 'jrrb-table-chave-valor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jrrb-table-chave-valor.component.html'
})

export class JrrbTableChaveValorComponent implements OnInit {
  @Input() separador: string[] = ["="];
  @Input() listRecord?: any[];
  @Input() infoComp?: string; //informação complementar

  protected _listRecord: any[] = [];

  public ngOnInit(): void {
    this._listRecord = this.ProcessListRecord(this.listRecord!, this.separador);
  }

  private ProcessListRecord(pListRecord: any[], pListSeparador: string[]): any[] {
    if (HelperUtilsClass.ListIsEmpty(pListRecord))
      return [];

    if (pListSeparador.length == 1)
      return this.SetListRecord(pListRecord, pListSeparador[0], true);

    let listReturn: any[] = [];
    for (let i = 0; i < pListSeparador.length; i++) {
      if (i == 0)
        listReturn = this.SetListRecord(pListRecord, pListSeparador[i]);
      else//se for a última intereção, então, criar a lista com objeto info01 e info02
        if (i == pListSeparador.length - 1)
          listReturn = this.SetListRecord(listReturn, pListSeparador[i], true);
        else
          listReturn = this.SetListRecord(listReturn, pListSeparador[i]);
    }

    return listReturn;
  }


  private SetListRecord(pListProcess: any[], separador: string, returnInfo?: boolean): any[] {
    if (HelperUtilsClass.ListIsEmpty(pListProcess))
      return [];

    let listReturn: any[] = [];
    pListProcess.forEach((item: any) => {

      //se returnInfo então, separar o resultado em duas colunas, info01 e info02
      if (returnInfo)
        listReturn.push({
          info01: item.split(separador)[0],
          info02: item.split(separador)[1]
        });
      else
        listReturn.push(...item.split(separador));
    });

    return listReturn;
  }

}
