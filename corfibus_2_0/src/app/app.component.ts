import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './erp/menu/menu.component';
import { JrrbMessagesGenericComponent } from './framework/components/jrrb-messages/jrrb-messages-generic.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, JrrbMessagesGenericComponent],
  templateUrl: './app.component.html',
  styles: [`
    .sty_202411131335 {
      position: fixed;
      width: 100%;
      z-index: 999999999;
      cursor: wait;
      height: 100%;
      bottom: 0;
      background-color: var(--jrrbColorB3);
      left: 0;
      right: 0;      
    }
    `]
})
export class AppComponent {
}
