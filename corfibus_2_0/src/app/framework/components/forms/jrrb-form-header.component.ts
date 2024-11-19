import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jrrb-form-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jrrb-form-header.component.html'
})
export class JrrbFormHeaderComponent {
  @Input() titleHeader!: string;
  @Input() subTitleHeader!: string;
  @Input() isForModal!: boolean;
  @Input() isForPanel!: boolean;
  @Input() isForPanelCaption!: string;
  @Output() onClose = new EventEmitter();

  protected ToClose(): void {
    this.onClose.emit();
  }
}
