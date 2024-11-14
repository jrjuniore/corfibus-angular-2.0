import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder } from '@angular/forms';
import { JrrbFormHeaderComponent } from 'src/app/framework/components/forms/jrrb-form-header.component';
import { ConfigSystemController } from '../../controllers/config-system.controller';
import { ConfigSystemGeraisComponent } from './config-system-gerais.component';
import { ConfigSystemValidacoesComponent } from './config-system-validacoes.component';
import { ConfigSystemPerfilComponent } from './config-system-perfil.component';
import { ConfigSystemContratoComponent } from './config-system-contrato.component';
import { ConfigSystemEmailsComponent } from './config-system-emails.component';
import { BrowserStorageService } from 'src/app/framework/share/services/browser-storage.service';

@Component({
  selector: 'config-system',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatDialogModule, MatTabsModule, ConfigSystemGeraisComponent, 
    ConfigSystemValidacoesComponent, ConfigSystemPerfilComponent, ConfigSystemContratoComponent, ConfigSystemEmailsComponent,
    JrrbFormHeaderComponent],
  templateUrl: './config-system.component.html'
})
export class ConfigSystemComponent {

  protected controller: ConfigSystemController = new ConfigSystemController(this.browser, this.fb, this.http, this.dialog);

  constructor(private browser: BrowserStorageService, private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) protected tableForModal?: boolean){}

}
