import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jrrb-divisor-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jrrb-divisor-text.component.html'
})
export class JrrbDivisorTextComponent {
  @Input() caption?: string;
  @Input() information?: string;
}
