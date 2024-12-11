import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'jrrb-check-box',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './jrrb-check-box.component.html'
})
export class JrrbCheckBoxComponent {
  @Input() caption?: string;
  @Input() fieldControl?: any
  @Output() onChange = new EventEmitter();

  public ToClick(): void {
    this.onChange.emit();
  }

}
