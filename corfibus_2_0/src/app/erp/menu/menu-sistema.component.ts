import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoreFrameworkService } from '../../core/core-framework.service';
import { MenuItemComponent } from "./menu-item.component";

@Component({
  selector: 'menu-sistema',
  standalone: true,
  imports: [MatExpansionModule, MenuItemComponent],
  templateUrl: './menu-sistema.component.html'
})
export class MenuSistemaComponent {

  protected coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);

}
