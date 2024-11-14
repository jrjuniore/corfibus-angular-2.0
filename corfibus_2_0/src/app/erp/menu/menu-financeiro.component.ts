import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { JrrbButtonComponent } from '../../framework/components/jrrb-button/jrrb-button.component';
import { CoreFrameworkService } from '../../core/core-framework.service';

@Component({
  selector: 'menu-financeiro',
  standalone: true,
  imports: [MatMenuModule, JrrbButtonComponent],
  templateUrl: './menu-financeiro.component.html'
})
export class MenuFinanceiroComponent {

  protected coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);

}
