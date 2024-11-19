import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JrrbFormCadModalComponent } from './jrrb-form-cad-modal.component';
import { JrrbInputComponent } from '../jrrb-input/jrrb-input.component';
import { JrrbCheckBoxComponent } from '../jrrb-check-box/jrrb-check-box.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'jrrb-form-cad-generic',
  standalone: true,
  imports: [CommonModule, JrrbFormCadModalComponent, JrrbInputComponent, JrrbCheckBoxComponent],
  templateUrl: './jrrb-form-cad-generic.component.html'
})
export class JrrbFormCadGenericComponent {

  constructor(private dialogRef: MatDialogRef<JrrbFormCadGenericComponent>, @Inject(MAT_DIALOG_DATA) protected controller: any) { }

  protected ToExit(): void {
    this.dialogRef.close();
  }

  protected ToSave(): void {
    if (this.controller.Save())
      this.ToExit();
  }

}