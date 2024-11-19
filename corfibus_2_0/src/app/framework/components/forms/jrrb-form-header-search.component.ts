import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { JrrbButtonComponent } from '../jrrb-button/jrrb-button.component';
import { JrrbFormHeaderComponent } from './jrrb-form-header.component';

@Component({
  selector: 'jrrb-form-header-search',
  standalone: true,
  imports: [CommonModule, MatCardModule, JrrbButtonComponent, JrrbFormHeaderComponent],
  templateUrl: './jrrb-form-header-search.component.html'
})
export class JrrbFormHeaderSearchComponent {
  @Input() titleHeader?: string;
  @Input() isForModal!: boolean;
  @Input() titleSearch?: string;
  @Output() onSearch = new EventEmitter();
  @Output() onClose = new EventEmitter();

  protected pesquisar: boolean = false;

  protected ToSearch(): void {
    this.onSearch.emit();
    this.pesquisar = false;
  }

  protected ToClose(): void {
    this.onClose.emit();
  }

}
