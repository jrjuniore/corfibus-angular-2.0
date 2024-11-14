import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigSystemGerais } from '../../controllers/config-system.controller';
import { JrrbSaveCancelComponent } from 'src/app/framework/components/jrrb-save-cancel/jrrb-save-cancel.component';
import { JrrbImageComponent } from 'src/app/framework/components/jrrb-image/jrrb-image.component';
import { JrrbSelectComponent } from 'src/app/framework/components/jrrb-select/jrrb-select.component';

@Component({
  selector: 'config-system-gerais',
  standalone: true,
  imports: [CommonModule, JrrbSaveCancelComponent, JrrbImageComponent, JrrbSelectComponent],
  templateUrl: './config-system-gerais.component.html'
})
export class ConfigSystemGeraisComponent {
  @Input() controller!: ConfigSystemGerais

}
