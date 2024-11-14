import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JrrbInputComponent } from 'src/app/framework/components/jrrb-input/jrrb-input.component';
import { ConfigSystemEmails } from '../../controllers/config-system.controller';
import { JrrbSaveCancelComponent } from 'src/app/framework/components/jrrb-save-cancel/jrrb-save-cancel.component';
import { JrrbContainerComponent } from 'src/app/framework/components/jrrb-container/jrrb-container.component';

@Component({
  selector: 'config-system-emails',
  standalone: true,
  imports: [CommonModule, JrrbInputComponent, JrrbSaveCancelComponent, JrrbContainerComponent],
  templateUrl: './config-system-emails.component.html'
})
export class ConfigSystemEmailsComponent {
  @Input() controller!: ConfigSystemEmails;

}
