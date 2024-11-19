import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoreFrameworkService } from '../../core/core-framework.service';
import { MenuItemComponent } from "./menu-item.component";

@Component({
  selector: 'menu-financeiro',
  standalone: true,
  imports: [MatExpansionModule, MenuItemComponent],
  templateUrl: './menu-financeiro.component.html'
})
export class MenuFinanceiroComponent {

  protected coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);

}
