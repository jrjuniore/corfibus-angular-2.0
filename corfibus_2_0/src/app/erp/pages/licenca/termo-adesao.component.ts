import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { JrrbFormHeaderComponent } from '../../../framework/components/forms/jrrb-form-header.component';
import { JrrbSaveCancelComponent } from '../../../framework/components/jrrb-save-cancel/jrrb-save-cancel.component';
import { JrrbButtonComponent } from '../../../framework/components/jrrb-button/jrrb-button.component';

@Component({
  selector: 'termo-adesao',
  standalone: true,
  imports: [CommonModule, JrrbFormHeaderComponent, JrrbSaveCancelComponent, JrrbButtonComponent],
  templateUrl: './termo-adesao.component.html'
})
export class TermoAdesaoComponent {

  protected classTextCenter: string = 'text-center jrrb-color-c2 mb-2 p-3';
  protected classNoMargin: string = 'm-0';
  protected classIdent: string = 'jrrb-text-ident-3rem mt-2';
  protected classNoMark: string = 'jrrb-no-mark-ul mt-4 ' + this.classIdent;
  protected classNoMark2: string = 'jrrb-no-mark-ul ' + this.classIdent;
  protected emailContato: string = 'atendimento@corfidence.com.br';
  protected termoAceito: boolean = environment.userErp.iInfoEmpresa.termo_aceito;

  constructor(private dialogRef: MatDialogRef<TermoAdesaoComponent>){}

  protected ToCancel(): void {
    this.dialogRef.close(false);
  }

  protected ToSave(): void {
    this.dialogRef.close(true);
  }

}
