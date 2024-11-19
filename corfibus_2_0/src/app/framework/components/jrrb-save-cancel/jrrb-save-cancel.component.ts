import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JrrbButtonComponent } from '../jrrb-button/jrrb-button.component';

@Component({
  selector: 'jrrb-save-cancel',
  standalone: true,
  imports: [CommonModule, JrrbButtonComponent],
  templateUrl: './jrrb-save-cancel.component.html',
})
export class JrrbSaveCancelComponent {
  @Input() captionSave: string = 'Salvar';
  @Input() captionCancel: string = 'Cancelar';
  @Input() toolTipSave?: string;
  @Input() toolTipCancel?: string;
  @Input() classButtonSave?: string;
  @Input() classButtonCancel?: string;
  @Input() positionOnBotton?: boolean;
  @Input() isDisabled?: boolean;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  protected ToSave(): void {
    this.onSave.emit();
  }

  protected ToCancel(): void {
    this.onCancel.emit();
  }
}
