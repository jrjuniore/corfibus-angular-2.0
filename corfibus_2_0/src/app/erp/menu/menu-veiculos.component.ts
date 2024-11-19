import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoreFrameworkService } from '../../core/core-framework.service';
import { MenuItemComponent } from "./menu-item.component";

@Component({
  selector: 'menu-veiculos',
  standalone: true,
  imports: [MatExpansionModule, MenuItemComponent],
  templateUrl: './menu-veiculos.component.html'
})
export class MenuVeiculosComponent {

  protected coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);

}
