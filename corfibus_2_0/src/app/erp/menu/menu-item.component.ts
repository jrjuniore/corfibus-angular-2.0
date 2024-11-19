import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
  @Input() titleItem?: string;
  @Input() iconFa?: string;

}
