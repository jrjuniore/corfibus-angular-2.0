import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'jrrb-button',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule],
  templateUrl: './jrrb-button.component.html',
  styleUrl: './jrrb-button.component.scss'
})
export class JrrbButtonComponent {
  @Input() jrrbIdButton?: string;
  @Input() caption?: string;
  @Input() classButton?: string;
  @Input() classCaption?: string;
  @Input() toolTip?: string;
  @Input() isBasic?: boolean;
  @Input() isRaised?: boolean;
  @Input() isStroked?: boolean;
  @Input() isFlat?: boolean;
  @Input() isFab?: boolean;
  @Input() isMiniFab?: boolean;
  @Input() isIcon?: boolean;
  @Input() isLink?: boolean;
  @Input() iconClassFa?: string;

  @Output() onClick = new EventEmitter();

  protected ToClick(): void {
    this.onClick.emit();
  }
}
