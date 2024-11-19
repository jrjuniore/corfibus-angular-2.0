import { Component, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoreFrameworkService } from '../../core/core-framework.service';
import { MenuItemComponent } from "./menu-item.component";

@Component({
  selector: 'menu-administracao',
  standalone: true,
  imports: [MatExpansionModule, MenuItemComponent],
  templateUrl: './menu-administracao.component.html'
})
export class MenuAdministracaoComponent {

  protected coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);
}
