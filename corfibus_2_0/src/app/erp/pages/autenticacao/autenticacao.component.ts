import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AutenticacaoController } from '../../controllers/autenticacao/autenticacao.controller';
import { JrrbInputComponent } from '../../../framework/components/jrrb-input/jrrb-input.component';
import { JrrbButtonComponent } from '../../../framework/components/jrrb-button/jrrb-button.component';

@Component({
  selector: 'autenticacao',
  standalone: true,
  imports: [MatCardModule, JrrbInputComponent, JrrbButtonComponent],
  templateUrl: './autenticacao.component.html'
})
export class AutenticacaoComponent {

  protected controller: AutenticacaoController = new AutenticacaoController();

  protected Autenticar(): void {
    this.controller.Autenticar(this.controller.form!);
  }

  protected AutenticarTrocar(): void {
    this.controller.Autenticar(this.controller.form!, false, true);
    this.controller.browser.LoadOk();
  }
}
