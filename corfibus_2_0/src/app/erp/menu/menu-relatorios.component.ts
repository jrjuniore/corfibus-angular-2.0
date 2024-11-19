import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoreFrameworkService } from '../../core/core-framework.service';
import { MenuItemComponent } from "./menu-item.component";

@Component({
  selector: 'menu-relatorios',
  standalone: true,
  imports: [MatExpansionModule, MenuItemComponent],
  templateUrl: './menu-relatorios.component.html'
})
export class MenuRelatoriosComponent {

  protected coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);

}
