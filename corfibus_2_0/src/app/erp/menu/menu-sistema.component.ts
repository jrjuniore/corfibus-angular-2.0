import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { JrrbButtonComponent } from '../../framework/components/jrrb-button/jrrb-button.component';
import { CoreFrameworkService } from '../../core/core-framework.service';

@Component({
  selector: 'menu-sistema',
  standalone: true,
  imports: [MatMenuModule, JrrbButtonComponent],
  templateUrl: './menu-sistema.component.html'
})
export class MenuSistemaComponent {

  protected coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);

}
