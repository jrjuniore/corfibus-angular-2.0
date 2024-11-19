import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { JrrbButtonComponent } from '../jrrb-button/jrrb-button.component';

@Component({
  selector: 'jrrb-form-cad-modal',
  standalone: true,
  imports: [CommonModule, MatCardModule, JrrbButtonComponent],
  templateUrl: './jrrb-form-cad-modal.component.html'
})
export class JrrbFormCadModalComponent {
  @Input() idButtonCloseModal?: string;
  @Input() titleForm?: string;
  @Input() subTitleForm?: string;
  @Input() subTitleFormCompl?: string;
  @Input() formIsEnabled: boolean = true;
  @Input() withButtonAplic: boolean = false;
  @Input() captionBtnAplicCancel: string = 'Cancelar';
  @Input() captionBtnAplicSave: string = 'Aplicar';
  @Output() onSave = new EventEmitter();
  @Output() onExit = new EventEmitter();

  protected ToSave(): void {
    this.onSave.emit();
  }

  protected ToExit(): void {
    this.onExit.emit();
  }
}
