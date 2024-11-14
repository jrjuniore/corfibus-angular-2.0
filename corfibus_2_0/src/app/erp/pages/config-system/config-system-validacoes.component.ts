import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigSystemValidacoes } from '../../controllers/config-system.controller';
import { JrrbSelectComponent } from 'src/app/framework/components/jrrb-select/jrrb-select.component';
import { JrrbSaveCancelComponent } from 'src/app/framework/components/jrrb-save-cancel/jrrb-save-cancel.component';

@Component({
  selector: 'config-system-validacoes',
  standalone: true,
  imports: [CommonModule, JrrbSelectComponent, JrrbSaveCancelComponent],
  templateUrl: './config-system-validacoes.component.html'
})
export class ConfigSystemValidacoesComponent {
  @Input() controller?: ConfigSystemValidacoes

}
