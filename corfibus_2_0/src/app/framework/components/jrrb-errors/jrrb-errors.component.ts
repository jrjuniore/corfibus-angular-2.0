import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Validation } from '../../../validators/validation';
import { HelperUtilsClass } from '../../../share/class-utils/helper-utils.class';

@Component({
  selector: 'jrrb-errors',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './jrrb-errors.component.html',
  styles: [`
    .jrrb-errors {
      border-left: solid 3px orangered;
      padding-left: 4px;
      height: 18px;
      margin-top: -1.3rem;
      margin-bottom: 0.35rem;
    }
  `]
})
export class JrrbErrorsComponent implements OnChanges {
  @Input() caption?: string;
  @Input() errors: any;
  @Input() errors2: any;

  protected tipoErro: number = -1;

  public ngOnChanges(): void {
    this.ProcessErrors();
  }

  protected MessagePersonalError(): string {
    return (<string>Validation.FormIsValidLabel(this.errors, this.caption));
  }

  protected IsRequired(): string {
    //Verificando as mensagens de "errors"
    let messageError: string = <string>Validation.FormIsValidLabel(this.errors, this.caption);

    //Verificando a mensagem de "errors2"
    if (HelperUtilsClass.StringIsEmpty(messageError))
      messageError = <string>Validation.FormIsValidLabel(this.errors2, this.caption);

    return messageError;
  }

  protected IsErrorGeneric(): string {
    //Verificando as mensagens de "errors"
    let messageError: string = <string>Validation.FormIsValidLabel(this.errors, this.caption);

    //Verificando a mensagem de "errors2"
    if (HelperUtilsClass.StringIsEmpty(messageError))
      messageError = <string>Validation.FormIsValidLabel(this.errors2, this.caption);

    return messageError;
  }

  private ProcessErrors(): void {
    let hasError: boolean = this.errors;
    let hasError2: boolean = this.errors2;

    let errorIsRequired: boolean = ((hasError && this.errors.required) || (hasError2 && this.errors2.required));
    let errorIsPersonal: boolean = (hasError && this.errors.message_personal_error) || (hasError2 && this.errors2.message_personal_error);
    let errorIsGenerid: boolean = ((hasError || hasError2) && !errorIsRequired && !errorIsPersonal);

    //inicializando
    this.tipoErro = -1;

    //isRequired
    if (errorIsRequired) {
      this.tipoErro = 0;

      return;
    }

    //isPersonal
    if (errorIsPersonal) {
      this.tipoErro = 1;

      return;
    }

    //isGeneric
    if (errorIsGenerid) {
      this.tipoErro = 2;

      return;
    }
  }

}
