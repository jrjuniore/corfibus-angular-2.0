import { Component, inject, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { JrrbButtonComponent } from '../../framework/components/jrrb-button/jrrb-button.component';
import { CoreFrameworkService } from '../../core/core-framework.service';

@Component({
  selector: 'menu-administracao',
  standalone: true,
  imports: [MatMenuModule, JrrbButtonComponent],
  templateUrl: './menu-administracao.component.html'
})
export class MenuAdministracaoComponent {

  protected coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);
}
