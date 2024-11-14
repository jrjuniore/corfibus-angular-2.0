import { inject, Injectable } from '@angular/core';
import { ApiRouteType } from '../share/types/apiRoute.type';
import { catchError, Observable, of, throwError } from 'rxjs';
import { CoreBrowserService } from './core-browser.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HelperUtilsClass } from '../share/class-utils/helper-utils.class';
import { LibraryUtilsClass } from '../share/class-utils/library-utils.class';
import { MessageUtilsClass } from '../framework/components/jrrb-messages/class/message.class';
import { IResponseBackEnd, IResponseBackEndErrors } from '../share/interfaces/IResponseSuccess.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { IRecordExclude } from '../framework/components/jrrb-messages/class/IRecordExclude.interface';
import { MatDialog } from '@angular/material/dialog';
import { JrrbMessagesComponent } from '../framework/components/jrrb-messages/jrrb-messages.component';
import { DateFormatSaveType } from '../share/types/DateFormatSave.type';
import { DateUtils } from '../share/class-utils/date-utils.class';
import { CoreFrameworkService } from './core-framework.service';
import { environment } from '../../environments/environment';

type ForInsertTrace = {
  forInsert: boolean,
  traceSQL: string
}

@Injectable({
  providedIn: 'root'
})
export class CoreHttpService {

  private browser: CoreBrowserService = inject(CoreBrowserService);
  private http: HttpClient = inject(HttpClient);
  private dialogBase: MatDialog = inject(MatDialog);

  public PostApi(pApiRoute: ApiRouteType): Observable<any> {
    this.browser!.OnLoad();
    return this.http!.post(environment.apiErp + pApiRoute.route, pApiRoute.params);
  }

  public PostApiAuth(pApiRoute: ApiRouteType, startStatusLoad: boolean = true, fileNameLog?: string): Observable<any> {
    let _params: any = {};

    let hasToken: boolean =
      (!HelperUtilsClass.ObjectIsEmpty(environment.userErp.iInfoLogin)) &&
      (!HelperUtilsClass.StringIsEmpty(environment.userErp.iInfoLogin.token))

    let headers = { 'Authorization': `Bearer ${hasToken ? environment.userErp.iInfoLogin.token : ''}` };

    if (startStatusLoad)
      this.browser!.OnLoad();

    _params =
      LibraryUtilsClass.CopyObject(pApiRoute.params, _params);

    if (!_params)
      _params = {};

    if (fileNameLog) {
      _params.traceSQL = fileNameLog;
      _params.TraceSQL = fileNameLog;
    }

    pApiRoute.params = _params;

    //Se a rota não for de autenticação e não tem token, ir para a área de login
    if (!HelperUtilsClass.StringEqual(pApiRoute.route, 'autenticacao')
      && (!hasToken)) {
      this.RedirectToLogin();
      return of();
    }

    const routeApi: string = environment.apiErp;
    return this.http!.post(routeApi + pApiRoute.route, pApiRoute.params, { headers }).pipe(catchError(this.HandleError));
  }

  public HandleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageInfo('Faça login para obter um novo token')], 'Token inválido ou expirado', 700, () => window.location.reload());

      //TODO
      this.browser!.ToClick('web202209080832');
    }
    else if (error.status === 409) {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageError(error.error.mensagem)], 'Operation Server');
      this.browser!.LoadOk();
      return throwError(() => new Error(error.error.mensagem));

    }
    else if ((error.error as IResponseBackEnd).isError)
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageError((error.error as IResponseBackEnd).mensagem)], 'Operation Server');
    else
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);

    // Return an observable with a user-facing error message.
    this.browser!.LoadOk();
    //TODO
    this.browser!.ToClick('web202209080832');
    return throwError(() => new Error('Token inválido ou expirado'));
  }

  public ResetForm<T>(pFormGroup: FormGroup, pRecord?: T): void {
    if (!pRecord) {
      pFormGroup.reset();
      return;
    }

    Object.keys(pFormGroup.controls).forEach((key: string) => {
      pFormGroup.controls[key].reset((<any>pRecord)[key]);
    })
  }

  public DialogConfirmDelete(pRecordDelete: any, pTitleForm: string,
    pListNameColumns: string[], pListCaptionColumns: string[],
    pSubTitleDialog: string = 'Confirmação de Exclusão', pMensagemFooter?: string): Promise<number> {
    let _recordExclude: IRecordExclude = {} as IRecordExclude;

    _recordExclude.titleDialog = pTitleForm;
    _recordExclude.subTitleDialog = pSubTitleDialog;
    _recordExclude.mensagemFooter = pMensagemFooter;
    _recordExclude.listFieldsName = pListNameColumns;
    _recordExclude.listFieldsCaption = pListCaptionColumns;
    _recordExclude.recordExclude = pRecordDelete.recordFull;

    let dialogRef = this.dialogBase.open(JrrbMessagesComponent, {
      data: _recordExclude,
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result: number) => {
        resolve(result);
      });
    });
  }

  public CloseModal(pIdSelector: string): void {
    //TODO
    this.browser!.ToClick(pIdSelector);
  }

  public DialogOpen(pForm: any, pWidth: string, pController: any): void {
    this.dialogBase.open(pForm, {
      data: pController,
      width: pWidth
    });
  }

  public DialogOpenData(pForm: any, pWidth: string, pData: any): any {
    return this.dialogBase.open(pForm, {
      data: pData,
      width: pWidth
    });
  }

  public DialogOpenFullScreen(pForm: any): void {
    this.dialogBase.open(pForm, {
      data: true,
      width: '100vw',
      height: '100vh'
    });
  }

  public DialogOpenFullScreenData(pForm: any, pData: any): void {
    this.dialogBase.open(pForm, {
      data: pData,
      width: '100vw',
      height: '100vh'
    });
  }

  public DialogOpenFullScreenDataAfterClose(pForm: any, pData: any): Promise<any> {
    let dialogRef = this.dialogBase.open(pForm, {
      data: pData,
      width: '100vw',
      height: '100vh'
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result: number) => {
        resolve(result);
      });
    });
  }

  public DialogOpenDataAfterClose(pForm: any, pWidth: string, pData: any): Promise<any> {
    let dialogRef = this.dialogBase.open(pForm, {
      data: pData,
      width: pWidth
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result: number) => {
        resolve(result);
      });
    });
  }

  /*
    pListFieldsNamesNumberToSave => São colunas numéricas que serão tratadas para salvar no banco
  */
  public async ToSave<T>(pFormGroup: FormGroup, pApiRouteSave: ApiRouteType,
    pKeyFieldName: string, pKeyFieldNameValue: string, pTitleForm: string,
    pDadosComplementares?: any, pListDatesFormatToSave?: DateFormatSaveType[],
    pListFieldsNamesNumberToSave?: { casas_decimais: 2, list_string: string[] }): Promise<T> {
    let recordToReturn: T = {} as T;

    let _record: any = {} as T;
    let apiRouteSave: ApiRouteType = LibraryUtilsClass.Copy(pApiRouteSave);

    //Incluindo
    if (HelperUtilsClass.StringIsEmpty(pKeyFieldNameValue))
      _record = {} as T;
    else
      _record[pKeyFieldName] = pKeyFieldNameValue;

    _record = Object.assign(_record, pFormGroup.value);

    //Verificando se há dados complementares
    if (!HelperUtilsClass.ObjectIsEmpty(pDadosComplementares))
      Object.keys(pDadosComplementares).forEach((key: string) => {
        _record[key] = pDadosComplementares[key];
      });

    //Verificando datas para serem ajustadas para salvar no banco de dados
    if (!HelperUtilsClass.ListIsEmpty(pListDatesFormatToSave))
      pListDatesFormatToSave!.forEach((itemDate: DateFormatSaveType) => {
        _record[itemDate.fieldName] = DateUtils.FormatDateDB(_record[itemDate.fieldName], itemDate.format, itemDate.formatWithTime);
      });

    //Verificando Number para serem ajustadas para salvar no banco de dados
    if  ((!HelperUtilsClass.ObjectIsEmpty(pListFieldsNamesNumberToSave)) && (!HelperUtilsClass.ListIsEmpty(pListFieldsNamesNumberToSave!.list_string)))
      pListFieldsNamesNumberToSave!.list_string.forEach((numberStr: any) => {
        _record[numberStr] = LibraryUtilsClass.RoundNumber(_record[numberStr].toString(), pListFieldsNamesNumberToSave!.casas_decimais);
      });

    apiRouteSave.params = _record;

    await this.PostSave(apiRouteSave)
      .then((respBE: any) => {
        if ((<IResponseBackEndErrors>respBE).errors)
          MessageUtilsClass.NoMessagesFromBackEnd(respBE, pTitleForm);
        else
          if ((<IResponseBackEnd>respBE).isError)
            MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageError((<IResponseBackEnd>respBE).mensagem)], pTitleForm);
          else {
            _record[pKeyFieldName] = (<IResponseBackEnd>respBE).info;
            recordToReturn = LibraryUtilsClass.Copy(_record);
            if (_record[pKeyFieldName])
              MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageRecordSaveSuccess()], pTitleForm);
          }
      })
      .catch((data_err: any) => {
        console.log(data_err, JSON.stringify(apiRouteSave));
        MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageError(data_err)], pTitleForm);
      })
      .finally(() => {
        this.browser!.LoadOk();
      });

    return recordToReturn;
  }

  /**
 * 
 * @param pApiRouteSave Rota que será consumida no BackEnd já com os parâmetros passados
 * @param pTitleForm Titulo do form que está consumindo esta função
 * @param pMessageReturn Mensagem que será enviada do usuário após o consumo do BackEnd
 */
  public async ToSaveListMultSelect(pApiRouteSave: ApiRouteType,
    pTitleForm: string, pMessageReturn?: string): Promise<any> {

    let apiRouteSave: ApiRouteType = LibraryUtilsClass.Copy(pApiRouteSave);
    await this.PostSave(apiRouteSave)
      .then(() => {
        if (pMessageReturn)
          MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageSuccess(pMessageReturn)], pTitleForm);
      })
      .catch((data_err: any) => {
        console.log(data_err, JSON.stringify(apiRouteSave));
        MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageError(data_err)], pTitleForm);
      })
      .finally(() => {
        this.browser!.LoadOk();
      });
  }

  public FormsIsValid<F>(pFormGroup: F, pTitleForm: string, pRangeError: boolean = false): boolean {
    if (!(<FormGroup>(pFormGroup)).valid || pRangeError) {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageFormInvalid()], pTitleForm);
      return false;
    }

    return true;
  }

  public FieldIsValid<F>(pFormControl: F, pTitleForm: string): boolean {
    if (!(<FormControl>(pFormControl)).valid) {
      MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageFormInvalid()], pTitleForm);
      return false;
    }

    return true;
  }

  public FieldIsValidNoMessage<F>(pFormControl: F): boolean {
    if (!(<FormControl>(pFormControl)).valid) {
      return false;
    }

    return true;
  }

  public MsgRegistroDeletadoFail(pMessage: string, pTitleForm: string): void {
    MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageError(pMessage)], pTitleForm);
  }

  public MsgRegistroDeletadoSucesso(pTitleForm: string): void {
    MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageRecordDeleteSuccess()], pTitleForm);
  }

  private RedirectToLogin() {
    MessageUtilsClass.ShowAlerts([MessageUtilsClass.NewMessageInfo('Faça login para obter um novo token')], 'Token inválido ou expirado', 700, () => window.location.reload());

    //TODO
    this.browser!.ToClick('web202209080832');
  }

  private async PostSave(apiRoute: ApiRouteType, startStatusLoad: boolean = true) {
    let _params: any = {};
    let response: any = null;

    let hasToken: boolean =
      (!HelperUtilsClass.ObjectIsEmpty(environment.userErp.iInfoLogin)) &&
      (!HelperUtilsClass.StringIsEmpty(environment.userErp.iInfoLogin.token))

    let token: string = hasToken ? environment.userErp.iInfoLogin.token : '';

    if (startStatusLoad)
      this.browser!.OnLoad();

    _params =
      LibraryUtilsClass.CopyObject(apiRoute.params, _params);

    if (!_params)
      _params = {};

    //Se a rota não for de autenticação e não tem token, ir para a área de login
    if (!HelperUtilsClass.StringEqual(apiRoute.route, 'autenticacao')
      && (!hasToken)) {
      this.RedirectToLogin();
      return null;
    }

    response = await fetch(environment.userErp.apiErp + apiRoute.route, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(_params) // body data type must match "Content-Type" header
    }).
      catch((error: any) => {
        console.log(error);
        this.RedirectToLogin();
      });

    return response ? response.json() : []; // parses JSON response into native JavaScript objects
  }

  public CompleteForInsertTrace(forInsert: boolean, traceSQL: string): ForInsertTrace {
    return ({
      forInsert: forInsert,
      traceSQL: traceSQL
    });
  }

}