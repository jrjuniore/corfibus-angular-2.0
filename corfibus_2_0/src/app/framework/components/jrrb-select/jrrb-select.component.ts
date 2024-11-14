import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JrrbErrorsComponent } from '../jrrb-errors/jrrb-errors.component';
import { JrrbButtonComponent } from '../jrrb-button/jrrb-button.component';
import { BaseController } from '../../main/base.controller';
import { LibraryUtilsClass } from '../../share/class-utils/library-utils.class';
import { JrrbSelectTypeList } from './jrrb-select-list.type';
import { ApiRouteType } from '../../share/types/apiRoute.type';
import { HelperUtilsClass } from '../../share/class-utils/helper-utils.class';
import { BrowserStorageService } from '../../share/services/browser-storage.service';

interface IHasList {
  hasSelectList: boolean,
  hasApiRoute: boolean
}

class JrrbSelectController extends BaseController { }

@Component({
  selector: 'jrrb-select',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatProgressSpinnerModule,
    MatDialogModule, HttpClientModule, JrrbErrorsComponent, JrrbButtonComponent],
  templateUrl: './jrrb-select.component.html'
})
export class JrrbSelectComponent implements OnInit, OnChanges {
  @Input() idSelect: string = LibraryUtilsClass.NewId();
  @Input() idClickRefresh?: string;
  @Input() idClickClear?: string;
  @Input() idClickSetFirstValue?: string;
  @Input() caption?: string;
  @Input() fieldControl?: any
  @Input() hasAccessTable?: boolean;
  @Input() showBtnChecAll?: boolean;
  @Input() showBtnEraser?: boolean;
  @Input() selectList?: JrrbSelectTypeList[];//Lista estática
  @Input() selectApi?: ApiRouteType;
  @Input() fieldNameValue?: string;       //Nome do field será obtido para obter o valor
  @Input() fieldNameCaption?: string;     //Nome do field será obtido para exibir no combo
  @Input() fieldsNamesReturn?: string[];  //Lista dos fields serão usados como complemento para retorno
  @Input() noSetFirst?: boolean;          //Forçar a não selecionar o primeiro elemento da lista
  @Input() isMultiple?: boolean;          //Disponibilizar multipla escolha
  @Output() onChange = new EventEmitter();
  @Output() onChangeBeforeCheck = new EventEmitter();
  @Output() onClickTableAcess = new EventEmitter();
  @Output() onCheckAll = new EventEmitter();
  @Output() onUnCheckAll = new EventEmitter();

  protected idLabelCaption: string = LibraryUtilsClass.NewId();
  protected jrrbComboList: JrrbSelectTypeList[] = [];
  protected hasRecords?: boolean;
  protected captionMultiple?: string;
  protected fieldIsRequired?: boolean;
  private cntrl: JrrbSelectController = new JrrbSelectController(this.browser, this.pHttp, this.dialog);

  constructor(private browser: BrowserStorageService, private pHttp: HttpClient, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.fieldIsRequired = this.fieldControl.errors && this.fieldControl.errors.required;
  }

  public ngOnChanges(pChanges: any): void {
    let iHasList: IHasList = {} as IHasList;

    iHasList.hasSelectList =
      ((!HelperUtilsClass.ObjectIsEmpty(pChanges.selectList)) &&
        (!HelperUtilsClass.ObjectIsEmpty(pChanges.selectList.currentValue)));

    iHasList.hasApiRoute =
      ((!HelperUtilsClass.ObjectIsEmpty(pChanges.selectApi)) &&
        (!HelperUtilsClass.ObjectIsEmpty(pChanges.selectApi.currentValue)));

    //montando a lista
    this.MountList(iHasList);
  }

  protected ToChange(): void {
    if (HelperUtilsClass.StringEqual(LibraryUtilsClass.GuidEmpty(), this.fieldControl.value)) {
      this.ToSetClear();
      return;
    }

    this.onChange.emit(this.jrrbComboList.filter((item: any) => { return item['value'] == this.fieldControl.value }));
  }

  protected ToClickTableAcess(): void {
    this.onClickTableAcess.emit();
  }

  protected ToRefresh(): void {
    this.hasRecords = false;
    this.MountListApiRoute();
  }

  protected ToSetClear(): void {
    this.fieldControl.setValue(null);
    this.ToChange();
  }

  protected ToCheckUnCheckAll(pCheckAll: boolean): void {

    this.ToSetClear();

    if (pCheckAll)
      this.fieldControl.setValue(this.jrrbComboList);

    this.ToChangeMultiple();
  }

  protected ToChangeMultiple(): void {
    this.onChangeBeforeCheck.emit();
    let _captions: string[] = [];

    if (HelperUtilsClass.ObjectIsList(this.fieldControl.value) &&
      !HelperUtilsClass.ListIsEmpty(this.fieldControl.value)) {

      //Se form iguais, todos os itens foram selecionados
      if (HelperUtilsClass.NumberIsEqual(this.fieldControl.value.length, this.jrrbComboList.length))
        this.onCheckAll.emit();
      else
        this.onUnCheckAll.emit();

      this.fieldControl.value.forEach((item: any) => {
        if (_captions.length < 3)
          _captions.push(item.caption);
      });
    }
    else
      this.onUnCheckAll.emit();

    this.captionMultiple = _captions.join(", ");
    this.onChange.emit();
  }

  protected ToClearForce(): void {
    this.jrrbComboList = [];
  }

  protected ToSetFirstValue(): void {
    if (HelperUtilsClass.ListLength(this.jrrbComboList) > 0)
      this.fieldControl.setValue(this.jrrbComboList[0].value);
  }

  private MountList(pIhasList: IHasList): void {

    if (pIhasList.hasSelectList)
      this.MountSelectList();
    else
      if (pIhasList.hasApiRoute) {
        this.hasRecords = false;
        this.MountListApiRoute();
      } else {
        this.hasRecords = true;
        this.SetNoOptions();
      }
  }

  private MountSelectList(): void {
    this.hasRecords = true;
    this.BindListCaption(this.selectList!);
  }

  private MountListApiRoute(): void {
    this.cntrl.PostApiAuth(this.selectApi!, false)
      .subscribe((listResult: any[]) => {
        this.jrrbComboList = [];
        this.BindListCaption(LibraryUtilsClass.Copy(listResult));
        this.hasRecords = true;
      });
  }

  private BindListCaption(pListSelected: any[]): void {
    let _lineItem: any;
    let _listSelected: any[] = [];

    if (!HelperUtilsClass.ListIsEmpty(pListSelected)) {
      pListSelected.forEach((item: any) => {
        _lineItem = LibraryUtilsClass.NewObject();
        _lineItem.caption = item[<string>this.fieldNameCaption];
        _lineItem.value = item[<string>this.fieldNameValue];

        if (!HelperUtilsClass.ListIsEmpty(this.fieldsNamesReturn))
          this.fieldsNamesReturn?.forEach((field: string) => {
            _lineItem[field] = item[field];
          });

        this.jrrbComboList.push(_lineItem);

        if (this.isMultiple && item.selecionado)
          _listSelected.push(_lineItem);
      });

      if (this.isMultiple) {
        this.fieldControl.setValue(_listSelected);
        this.ToChangeMultiple();
      }
    }
    else
      this.SetNoOptions();
  }

  private SetNoOptions(): void {
    this.jrrbComboList.push({
      caption: 'NÃO HÁ OPÇÕES OU PERMISSÃO DE ACESSO',
      value: LibraryUtilsClass.GuidEmpty()
    });
  }

}
