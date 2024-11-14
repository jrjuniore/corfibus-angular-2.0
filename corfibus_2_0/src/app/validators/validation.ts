import { HelperUtilsClass } from './../share/class-utils/helper-utils.class';
import { DateUtils } from '../share/class-utils/date-utils.class';
import { FormGroup } from '@angular/forms';
import { ConstUtilsClass } from '../share/class-utils/const-utils.class';
import { MessageUtilsClass } from '../framework/components/jrrb-messages/class/message.class';

export class Validation {

  /**
   * 
   * @param pListGeneric Lista do tipo genérico
   * @returns True ou False
   */
  static FormIsValidNoMessage(pForm: FormGroup): boolean {
    let _formIsValid: boolean = true;

    if (HelperUtilsClass.ObjectIsEmpty(pForm.controls))
      _formIsValid = false;
    else {
      Object.keys(pForm.controls).forEach((key: string) => {
        if (_formIsValid)
          if (!pForm.controls[key].valid)
            _formIsValid = false;
      });
    }

    return _formIsValid;
  }

  /**
   * 
   * @param pErrors objeto errrors do FormControl.  Há mensagens para o usuário em LABEL
   * @returns String
   */
  static FormIsValidLabel(pErrors: any, pCaption?: string): string | null {
    if (pErrors) {
      if ((pErrors.required) || (pErrors.mask))
        return ConstUtilsClass.message_error_required(<string>pCaption);

      if (!pErrors.required && pErrors.message_personal_error)
        return pErrors.message_personal_error;

      if (pErrors.email)
        return ConstUtilsClass.message_error_invalid_email();

      if (pErrors.min)
        return ConstUtilsClass.message_error_min(pErrors.min.min);

      if (pErrors.minlength)
        return ConstUtilsClass.message_error_minlength(pErrors.minlength.requiredLength);

      if (pErrors.max)
        return ConstUtilsClass.message_error_max(pErrors.max.max);

      if (pErrors.maxlength)
        return ConstUtilsClass.message_error_maxlength(pErrors.maxlength.requiredLength);

      if (pErrors.cpfInvalid)
        return ConstUtilsClass.message_error_cpfValidator();

      if (pErrors.cnpjInvalid)
        return ConstUtilsClass.message_error_cnpjValidator();

      if (pErrors.matStartDateInvalid || pErrors.matEndDateInvalid)
        return ConstUtilsClass.message_error_invalid_range();

      if (pErrors.matDatepickerParse)
        return ConstUtilsClass.message_error_invalid_date();

    }

    return null;
  }


  /**
   * 
   * @param pListGeneric Lista do tipo genérico
   * @returns True ou False
   */
  static FormIsValidMessage(pForm: FormGroup, pTitleErrors: string): boolean {
    let _formIsValid: boolean = true;

    if (HelperUtilsClass.ObjectIsEmpty(pForm.controls))
      _formIsValid = false;
    else {
      Object.keys(pForm.controls).forEach((key: string) => {
        //Uma das validações não passou ( primeiro form)
        if (_formIsValid)
          _formIsValid = pForm.controls[key].valid;
      });

      //Há mensagens
      if (!_formIsValid)
        MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageError('Formulário com erro!  Verique as mensagens')], pTitleErrors);
    }

    return _formIsValid;
  }

  /**
   * 
   * @param pDataInicial Data inicial do range
   * @param pDateFinal Data final do range
   * @param pCalcRange Tipo de cálculo ( 0 => day; 1 => month; 2 => year )
   * @param pMaxRange Tamanho máximo do range em dias
   * @param pShowMessage Exibir ou não mensagem
   */
  static ValidRangeDate(pDataInicial: Date, pDateFinal: Date, pMaxRange: number, pTitleMessage: string,
    pCalcRange: number = 0, pShowMessage: boolean = true): boolean {
    let result: boolean = true;
    let msgComp!: string;

    switch (pCalcRange) {
      case 0: {
        msgComp = pMaxRange <= 1 ? 'dia' : 'dias';
        result = DateUtils.DaysInRangeDate(pDataInicial, pDateFinal) <= pMaxRange;
      }
    }

    //Exibindo a mensagem
    if (pShowMessage && !result) {
      let msgValid: string = `O range de ${pTitleMessage} não pode ser maior que ${pMaxRange} ${msgComp}`;

      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageWarning(msgValid)], pTitleMessage, 4000);
    }

    return result;
  }

}