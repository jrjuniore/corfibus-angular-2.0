import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JrrbSaveCancelComponent } from '../jrrb-save-cancel/jrrb-save-cancel.component';

@Component({
  selector: 'jrrb-form-panel',
  standalone: true,
  imports: [CommonModule, JrrbSaveCancelComponent],
  templateUrl: './jrrb-form-panel.component.html',
  styleUrls: ['./jrrb-form-panel.component.scss']
})
export class JrrbFormPanelComponent {
  @Input() captionHeader?: string;
}
