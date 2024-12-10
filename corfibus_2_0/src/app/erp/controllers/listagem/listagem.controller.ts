import { FormGroup } from "@angular/forms";
import { JrrbTablePermissionsType } from "../../../share/types/jrrb-table-permissions.type";
import { inject } from "@angular/core";
import { CoreHttpService } from "../../../core/core-http.service";
import { IApiContainer } from "../../../share/interfaces/IApiContainer.interface";
import { IResponseBackEnd } from "../../../share/interfaces/IResponseSuccess.interface";
import { CoreBrowserService } from "../../../core/core-browser.service";
import { HelperUtilsClass } from "../../../share/class-utils/helper-utils.class";
import { DateUtils } from "../../../share/class-utils/date-utils.class";
import { LibraryUtilsClass } from "../../../share/class-utils/library-utils.class";

export class ListagemController<T> {

  public subTitleFormCad: string;
  public idButtonCloseModal: string;

  public recordCommit: T;
  public recordDeleted: T;
  public recordReceptor: any;

  public isVisualize: boolean;
  public isAlter: boolean;
  public tablePermissions: JrrbTablePermissionsType;

  private coreHttp: CoreHttpService = inject(CoreHttpService);
  private coreBrowser: CoreBrowserService = inject(CoreBrowserService);

  constructor(private model: T, private titleForm: string, private titleFormCad: string, private apiContainer: IApiContainer,
    private pTablePermissions: JrrbTablePermissionsType, private form: FormGroup, private formCad: any, private inicialModelValues: T,
    private fieldKeyName: string, private listFieldsNames: string[], private listFieldsCaption: string[]  ) {

    this.recordCommit = this.model;
    this.recordDeleted = this.model;
    this.isVisualize = false;
    this.isAlter = false;
    this.subTitleFormCad = 'Inserindo';
    this.idButtonCloseModal = LibraryUtilsClass.NewId();
    this.tablePermissions = this.pTablePermissions;
  }

  public NewRecord(): void {
    this.SetAlterVisualize(false, false);
    this.recordReceptor = {};
    this.subTitleFormCad = 'Inserindo';
    this.form.reset(this.inicialModelValues);
  }

  public VisualizeRecord(pRecord: any): void {
    this.SetAlterVisualize(false, true);
    this.recordReceptor = pRecord;
    this.form.reset(this.recordReceptor.recordFull);
    this.OpenDialog();
  }

  public DeleteRecord(pRecord: any): void {
    this.coreHttp.DialogConfirmDelete(pRecord, this.titleForm, this.listFieldsNames, this.listFieldsCaption)
      .then((resultConfirm: number) => {
        if (resultConfirm == 1)
          this.coreHttp.PostApiAuth(this.apiContainer.delete!(pRecord[this.fieldKeyName]))
            .subscribe((hasError: IResponseBackEnd) => {
              if (!hasError.isError) {
                this.recordDeleted = pRecord.recordFull;
                this.coreHttp.MsgRegistroDeletadoSucesso(this.titleForm);
              }
              else {
                this.coreHttp.MsgRegistroDeletadoFail(hasError.mensagem, this.titleForm);
                this.coreBrowser.LoadOk();
              }
            });
      });
  }

  public EditRecord(pRecord: any): void {
    this.SetAlterVisualize(true, false);
    this.recordReceptor = pRecord;
    this.form.reset(this.recordReceptor.recordFull);
    this.OpenDialog();
  }

  public Save(): void {
    if (this.coreHttp.FormsIsValid(this.form, this.titleForm))
      this.coreHttp.ToSave<T>(this.form, this.apiContainer.save!, this.fieldKeyName,
        (this.recordReceptor[this.fieldKeyName] ?? ''), this.titleFormCad, this.coreHttp.CompleteForInsertTrace(!this.isAlter!, ""))
        .then((resultSave: T) => {
          //Objeto não está vazio => Tratando o retorno
          if (!HelperUtilsClass.ObjectIsEmpty(resultSave)) {
            (resultSave as any)['ativoStr'] = (resultSave as any)['ativo'] ? 'Sim' : 'Não';
            (resultSave as any)['date_Alter_Str'] = <string>(this.isAlter ? DateUtils.getCurrentDateTimeLocale() : null);
            (resultSave as any)['date_Create_Str'] = !this.isAlter ? DateUtils.getCurrentDateTimeLocale() : this.recordReceptor.recordFull.date_Create_Str;

            this.recordCommit = resultSave;

            //Fechando o modal após salvar
            LibraryUtilsClass.ToClick(this.idButtonCloseModal);
          }
        });
  }

  private SetAlterVisualize(pIsAlter: boolean, pIsVisualize: boolean): void {
    this.isAlter = pIsAlter;
    this.isVisualize = pIsVisualize;

    if (this.isVisualize)
      this.form.disable();
    else
      this.form.enable();

    this.subTitleFormCad = pIsAlter ? 'Alterando' : pIsVisualize ? 'Visualizando' : 'Inserindo';
  }

  private OpenDialog(): void {}

}