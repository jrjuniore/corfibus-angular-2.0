import { Component, EventEmitter, inject, Input, input, Output, signal } from '@angular/core';
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
  @Input() tiposDocumentosHaveAcess: boolean = false;
  @Input() tiposDocumentosRoute: string = "";
  @Output() onClickMenu = new EventEmitter();

  protected coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);

  protected ToClick(route: string) {
    this.onClickMenu.emit(route);
  }

}
