import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currencySymbol: string = 'R$', locale: string = 'pt-BR'): string {
    if (value !== null && !isNaN(value)) {
      return currencySymbol + ' ' + new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    }
    return '';
  }
  
}
