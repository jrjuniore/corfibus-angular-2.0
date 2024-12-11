import { Component, inject } from '@angular/core';
import { ListagemController } from '../../controllers/listagem/listagem.controller';
import { ITiposDocumentosModel } from '../../models/ITiposDocumentos.model';
import { IApiContainer } from '../../../share/interfaces/IApiContainer.interface';
import { ApiRouteUtilsClass } from '../../../share/class-utils/api-route-utils.class';
import { tiposDocumentosPermitions } from './tipos-documentos.permitions';
import { FormBuilder, Validators } from '@angular/forms';
import { JrrbFormCadGeneric2Component } from '../../../framework/components/forms/jrrb-form-cad-generic2.component';
import { CoreFrameworkService } from '../../../core/core-framework.service';

@Component({
  selector: 'tipos-documentos',
  standalone: true,
  imports: [],
  templateUrl: './tipos-documentos.component.html'
})
export class TiposDocumentosComponent {

  protected coreFW: CoreFrameworkService = inject(CoreFrameworkService);
  protected controller: ListagemController<ITiposDocumentosModel>;
  
  constructor(private fb: FormBuilder) {
    this.controller = new ListagemController<ITiposDocumentosModel>(
      {} as ITiposDocumentosModel,
      { nome: '', ativo: true } as ITiposDocumentosModel,
      'Tipos de Documentos',
      'Tipo de Documento',
      {
        delete: (id?: string, traceSQL?: string) => ApiRouteUtilsClass.tabelas.gerais.tiposDocumentos.ToDelete(id, traceSQL),
        list: ApiRouteUtilsClass.tabelas.gerais.tiposDocumentos.ToList(),
        save: ApiRouteUtilsClass.tabelas.gerais.tiposDocumentos.ToSave()
      } as IApiContainer,
      tiposDocumentosPermitions(),
      this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        ativo: [true]
      }),
      JrrbFormCadGeneric2Component,
      this.coreFW.width_md,
      'id_Tipo_Documento',
      this.coreFW.listFieldsNames,
      this.coreFW.listFields2Caption
    );
  }

}
