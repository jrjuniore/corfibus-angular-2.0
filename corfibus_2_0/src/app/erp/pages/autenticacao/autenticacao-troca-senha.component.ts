import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { JrrbInputComponent } from '../../../framework/components/jrrb-input/jrrb-input.component';
import { JrrbButtonComponent } from '../../../framework/components/jrrb-button/jrrb-button.component';
import { AutenticacaoController } from '../../controllers/autenticacao/autenticacao.controller';
import { Validation } from '../../../validators/validation';
import { MessageUtilsClass } from '../../../framework/components/jrrb-messages/class/message.class';

@Component({
  selector: 'autenticacao-troca-senha',
  standalone: true,
  imports: [CommonModule, MatCardModule, JrrbInputComponent, JrrbButtonComponent],
  templateUrl: './autenticacao-troca-senha.component.html'
})
export class AutenticacaoTrocaSenhaComponent {

  protected form?: FormGroup;
  protected cntrl: AutenticacaoController = new AutenticacaoController();

  constructor(private dialogRef: MatDialogRef<AutenticacaoTrocaSenhaComponent>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private record: any) { }

  protected ngOnInit(): void {
    this.InitForm();
  }

  protected TrocarSenha(): void {
    if (Validation.FormIsValidMessage(this.form!, this.cntrl.titleFormTrocaSenha()))
      if (this.form?.controls['novaSenha'].value != this.form?.controls['confirmacaoSenha'].value) {
        MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageWarning("As senhas não são iguais, verifique!")], this.cntrl.titleFormTrocaSenha());
        return;
      }
      else
        this.dialogRef.close(this.form);
  }

  protected CancelarTrocaSenha(): void {
    this.dialogRef.close({});
  }

  private InitForm(): void {
    this.form = this.formBuilder.group({
      empresa: [this.record.empresa],
      usuario: [this.record.usuario],
      novaSenha: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      confirmacaoSenha: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }
}
