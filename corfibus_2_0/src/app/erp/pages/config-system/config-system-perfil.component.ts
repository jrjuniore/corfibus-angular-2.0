import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigSystemPerfil } from '../../controllers/config-system.controller';
import { JrrbInputComponent } from 'src/app/framework/components/jrrb-input/jrrb-input.component';
import { JrrbSaveCancelComponent } from 'src/app/framework/components/jrrb-save-cancel/jrrb-save-cancel.component';

@Component({
  selector: 'config-system-perfil',
  standalone: true,
  imports: [CommonModule, JrrbInputComponent, JrrbSaveCancelComponent],
  templateUrl: './config-system-perfil.component.html'
})
export class ConfigSystemPerfilComponent {
  @Input() controller?: ConfigSystemPerfil;

}
