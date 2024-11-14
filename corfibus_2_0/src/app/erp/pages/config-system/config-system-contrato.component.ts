import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigSystemContrato } from '../../controllers/config-system.controller';
import { JrrbInputComponent } from 'src/app/framework/components/jrrb-input/jrrb-input.component';
import { JrrbSelectComponent } from 'src/app/framework/components/jrrb-select/jrrb-select.component';
import { JrrbSaveCancelComponent } from 'src/app/framework/components/jrrb-save-cancel/jrrb-save-cancel.component';

@Component({
  selector: 'config-system-contrato',
  standalone: true,
  imports: [CommonModule, JrrbInputComponent, JrrbSelectComponent, JrrbSaveCancelComponent],
  templateUrl: './config-system-contrato.component.html'
})
export class ConfigSystemContratoComponent {
  @Input() controller?: ConfigSystemContrato;

  protected classCard = "card mat-elevation-z1 mx-1 my-2";
  protected classTitle = "jrrb-bg-color-b4 jrrb-color-a2 p-2";
  protected classSubTitle = "jrrb-color-b mt-4 ms-3";

}
