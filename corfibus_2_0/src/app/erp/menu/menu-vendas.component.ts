import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoreFrameworkService } from '../../core/core-framework.service';
import { MenuItemComponent } from "./menu-item.component";

@Component({
  selector: 'menu-vendas',
  standalone: true,
  imports: [MatExpansionModule, MenuItemComponent],
  templateUrl: './menu-vendas.component.html'
})
export class MenuVendasComponent {

  protected coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);

}
