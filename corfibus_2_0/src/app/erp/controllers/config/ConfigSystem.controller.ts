import { inject, signal } from "@angular/core";
import { CoreFrameworkService } from "../../../core/core-framework.service";
import { IConfigSystemModel, IConfigSystemType } from "../../models/IConfigSystem.model";
import { HelperUtilsClass } from "../../../share/class-utils/helper-utils.class";
import { ConfigSystemMapperClass } from "../../pages/config-system/config-system.mapper";
import { Observable } from "rxjs";
import { CoreHttpService } from "../../../core/core-http.service";
import { ApiRouteUtilsClass } from "../../../share/class-utils/api-route-utils.class";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoreBrowserService } from "../../../core/core-browser.service";
import { LibraryUtilsClass } from "../../../share/class-utils/library-utils.class";
import { JrrbSelectTypeList } from "../../../framework/components/jrrb-select/jrrb-select-list.type";
import { ConstUtilsClass } from "../../../share/class-utils/const-utils.class";

class ConfigSystemUtils {
  public coreFrameWork: CoreFrameworkService = inject(CoreFrameworkService);
  public coreHttp: CoreHttpService = inject(CoreHttpService);
  public coreBrowser: CoreBrowserService = inject(CoreBrowserService);
  public formBuilder: FormBuilder = inject(FormBuilder);

  public toolTipSave = signal('É necessário relogar para que as alterações sejam aplicadas');
  public tabCaptionGerais = signal('Gerais');
  public tabCaptionEmail = signal('Email');
  public tabCaptionValidacoes = signal('Validações');
  public tabCaptionPerfil = signal('Perfil');
  public tabCaptionContrato = signal('Contrato');
  public titleForm = signal('Configurações');

  public captionHeaderGerais = signal('Gerais');

  public classFaGerais = signal(this.coreFrameWork.faBase() + 'gear');
  public classFaEmail = signal(this.coreFrameWork.faBase() + 'paper-plane');
  public classFaValidacoes = signal(this.coreFrameWork.faBase() + 'check-double');
  public classFaPerfil = signal(this.coreFrameWork.faBase() + 'clipboard-user');
  public classFaContrato = signal(this.coreFrameWork.faBase() + 'file-signature');

  public listParams: any = {};
  public listConfigSystemType?: IConfigSystemType[];

  public GetValueFromConfigSystem(pRecord: IConfigSystemModel, pTipoParam: number): string | number | Date | undefined {
    switch (pTipoParam) {
      //paramGuid
      case 1: return pRecord.param_guid;

      //paramBigInt
      case 2: return pRecord.param_bigint;

      //paramFloat
      case 3: return pRecord.param_float

      //paramString
      case 4: return pRecord.param_string;

      //paramDate
      case 5: return pRecord.param_date;

      //paramTime
      case 6: return pRecord.param_time;

      //paramDateTime
      case 7: return pRecord.param_datetime;

      default: return undefined;
    }
  }

  public GetValueFromListParams(pListConfigSystem: IConfigSystemModel[], pIdentificacao: string): IConfigSystemModel[] {
    if (HelperUtilsClass.ListIsEmpty(pListConfigSystem))
      return [];

    let _result: any = {};
    return (
      pListConfigSystem.filter((config: IConfigSystemModel) => {
        if (HelperUtilsClass.StringEqual(config.identificacao, pIdentificacao)) {
          _result[HelperUtilsClass.StringToUpper(config.identificacao)] = config.param_bigint ??
            config.param_date ??
            config.param_datetime ??
            config.param_float ??
            config.param_guid ??
            config.param_string ??
            config.param_time ??
            null;

          //Tratando a imagem
          if (HelperUtilsClass.StringEqual(config.identificacao, ConfigSystemMapperClass.LOGO_RELATORIO))
            _result[HelperUtilsClass.StringToUpper(config.identificacao)] = config.file_base_64;

          if (HelperUtilsClass.StringEqual(config.identificacao, ConfigSystemMapperClass.LOGO_SISTEMA))
            _result[HelperUtilsClass.StringToUpper(config.identificacao)] = config.file_base_64_logo_sistema;

          return _result;
        }
      }));
  }

  public GetListFromApi(): Observable<IConfigSystemModel[]> {
    return this.coreHttp.PostApiAuth(ApiRouteUtilsClass.sistema.config.ToList());
  }

  public ToSaveConfig(pForm: FormGroup, pListConfigSystemType: IConfigSystemType[], pListConfigTab: IConfigSystemModel[]): void {
    let listToSave: IConfigSystemModel[] = this.SetListToSave(pForm, pListConfigSystemType, pListConfigTab);

    //Lista não é vazia
    if (!HelperUtilsClass.ListIsEmpty(listToSave))
      this.coreHttp.PostApiAuth(ApiRouteUtilsClass.sistema.config.ToSaveLote(listToSave))
        .subscribe(() => this.coreBrowser.LoadOk());
  }

  public NewConfigSystemType(pIdentificacao: string, pNome: string, pTipoParam: number,
    pNameFieldControle?: string, pConfigSystemModel?: IConfigSystemModel): IConfigSystemType {
    return ({
      identificacao: pIdentificacao,
      nome: pNome,
      tipoParam: pTipoParam,
      nameFieldControle: pNameFieldControle,
      configSystemModel: pConfigSystemModel
    });
  }

  private SetListToSave(pForm: FormGroup, pListConfigSystemType: IConfigSystemType[], pListConfigTab: IConfigSystemModel[]): IConfigSystemModel[] {
    let _result: IConfigSystemModel[] = [];
    let _lineConfig: IConfigSystemModel;

    if (!this.coreHttp.FormsIsValid(pForm, this.titleForm()))
      return _result;

    pListConfigSystemType.forEach((config: IConfigSystemType) => {
      _lineConfig = LibraryUtilsClass.NewObject();

      //Copiando os dados iniciais
      _lineConfig = LibraryUtilsClass.CopyObject(
        pListConfigTab.filter((line: IConfigSystemModel) => {
          return HelperUtilsClass.StringEqual(line.identificacao, config.identificacao);
        })[0], _lineConfig);

      //Inicializando as imagens
      _lineConfig.file_base_64 = LibraryUtilsClass.NewString();
      _lineConfig.file_base_64_logo_sistema = LibraryUtilsClass.NewString();

      switch (config.tipoParam) {
        //paramGuid
        case 1: {
          _lineConfig.param_guid = pForm.controls[config.nameFieldControle!].value;

          //incluindo o FileBase64
          if (HelperUtilsClass.StringEqual(_lineConfig.identificacao, ConfigSystemMapperClass.LOGO_RELATORIO)) {
            if (HelperUtilsClass.StringIsEmpty(_lineConfig.param_guid))
              _lineConfig.param_guid = LibraryUtilsClass.NewGuid();
            _lineConfig.file_base_64 = pForm.controls[config.nameFieldControle! + 'Base64'].value;
          }
          if (HelperUtilsClass.StringEqual(_lineConfig.identificacao, ConfigSystemMapperClass.LOGO_SISTEMA)) {
            if (HelperUtilsClass.StringIsEmpty(_lineConfig.param_guid))
              _lineConfig.param_guid = LibraryUtilsClass.NewGuid();
            _lineConfig.file_base_64_logo_sistema = pForm.controls[config.nameFieldControle! + 'Base64'].value;
          }

          break;
        }

        //paramBigInt
        case 2: {
          _lineConfig.param_bigint = pForm.controls[config.nameFieldControle!].value;
          break;
        }

        //paramFloat
        case 3: {
          _lineConfig.param_float = pForm.controls[config.nameFieldControle!].value;
          break;
        }

        //paramString
        case 4: {
          _lineConfig.param_string = pForm.controls[config.nameFieldControle!].value;
          break;
        }

        //paramDate
        case 5: {
          _lineConfig.param_date = pForm.controls[config.nameFieldControle!].value;
          break;
        }

        //paramTime
        case 6: {
          _lineConfig.param_time = pForm.controls[config.nameFieldControle!].value;
          break;
        }

        //paramDateTime
        case 7: {
          _lineConfig.param_datetime = pForm.controls[config.nameFieldControle!].value;
          break;
        }
      }

      //Incluindo no resultado
      _result.push(_lineConfig);
    });

    return _result;
  }

}

export class ConfigSystemGerais {

  public configUtils: ConfigSystemUtils = new ConfigSystemUtils();

  //Documentação de como deve se comportar o ConfigSystem, bem como, os dados da tabela
  private formToRollback: any;
  private listConfigSystem: IConfigSystemModel[] = [];
  private configSystemType = {
    logo_relatorio:
      this.configUtils.NewConfigSystemType(
        'D1FCA839-DD7C-4C82-8C1A-9F769181D6B9', 'LOGO RELATÓRIO', 1, 'logoRelatorio'),

    logo_sistema:
      this.configUtils.NewConfigSystemType(
        '3D77CD85-09C9-4490-BF8B-B9373FC3EA61', 'LOGO SISTEMA', 1, 'logoSistema'),

    ocultar_menu_tabelas:
      this.configUtils.NewConfigSystemType(
        '9CB606F1-141C-4D70-A977-95F4E0707FA0', 'OCULTAR MENU TABELAS', 2, 'ocultarMenuTabelas'),
  }

  public captionLogoRelatorio: string = 'Logo Relatório';
  public idComponentLogoRelatorio: string = LibraryUtilsClass.NewId();
  public captionLogoSistema: string = 'Logo Sistema';
  public idComponentLogoSistema: string = LibraryUtilsClass.NewId();
  public captionOcultarMenuTabelas: string = 'Ocultar menu tabelas';

  public form: FormGroup = this.configUtils.formBuilder.group({
    logoRelatorio: [''],
    logoRelatorioBase64: [''],
    logoSistema: [''],
    logoSistemaBase64: [''],
    ocultarMenuTabelas: ['']
  });

  public ocultarMenuTabelasList: JrrbSelectTypeList[] = ConstUtilsClass.opcao_SimNao();
  public ocultarMenuTabelasCaption: string = 'Ocultar menu tabelas';

  public InitListConfigSystem(pListConfigSystem: IConfigSystemModel[]): void {
    this.listConfigSystem = pListConfigSystem;
    this.InitParams();
  }

  public ToSave(): void {
    this.configUtils.ToSaveConfig(this.form, [
      this.configSystemType.logo_relatorio,
      this.configSystemType.logo_sistema,
      this.configSystemType.ocultar_menu_tabelas
    ],
      [
        this.configSystemType.logo_relatorio.configSystemModel!,
        this.configSystemType.logo_sistema.configSystemModel!,
        this.configSystemType.ocultar_menu_tabelas.configSystemModel!
      ])
    this.SetFormRollBack();
  }

  public ToCancel(): void {
    this.RollBack();
  }

  private InitParams(): void {
    this.InitLogoRelatorio();
    this.InitLogoSistema();
    this.InitOcultarMenuTabelas();

    this.SetFormRollBack();
  }

  private InitLogoRelatorio(): void {
    this.configSystemType.logo_relatorio.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.logo_relatorio.identificacao)[0];

    this.form.controls[this.configSystemType.logo_relatorio.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.logo_relatorio.configSystemModel, this.configSystemType.logo_relatorio.tipoParam
    ));

    this.form.controls[this.configSystemType.logo_relatorio.nameFieldControle! + 'Base64'].setValue(this.configSystemType.logo_relatorio.configSystemModel.file_base_64);
  }

  private InitLogoSistema(): void {
    this.configSystemType.logo_sistema.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.logo_sistema.identificacao)[0];

    this.form.controls[this.configSystemType.logo_sistema.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.logo_sistema.configSystemModel, this.configSystemType.logo_sistema.tipoParam
    ));
    this.form.controls[this.configSystemType.logo_sistema.nameFieldControle! + 'Base64'].setValue(this.configSystemType.logo_sistema.configSystemModel.file_base_64_logo_sistema);
  }

  private InitOcultarMenuTabelas(): void {
    this.configSystemType.ocultar_menu_tabelas.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.ocultar_menu_tabelas.identificacao)[0];

    this.form.controls[this.configSystemType.ocultar_menu_tabelas.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.ocultar_menu_tabelas.configSystemModel, this.configSystemType.ocultar_menu_tabelas.tipoParam
    ));
  }

  private SetFormRollBack(): void {
    this.formToRollback = this.form.value;

    if (this.form.dirty)
      this.form.markAsPristine();
  }

  private RollBack(): void {
    this.configUtils.coreHttp.ResetForm(this.form, this.formToRollback);
    this.form.markAsPristine();
    LibraryUtilsClass.ToClick(this.idComponentLogoRelatorio);
    LibraryUtilsClass.ToClick(this.idComponentLogoSistema);
  }
}

export class ConfigSystemEmails {

  public configUtils: ConfigSystemUtils = new ConfigSystemUtils();

  //Documentação de como deve se comportar o ConfigSystem, bem como, os dados da tabela
  private formToRollback: any;
  private listConfigSystem: IConfigSystemModel[] = [];
  private configSystemType = {
    disp_email_orc:
      this.configUtils.NewConfigSystemType(
        '0488ADA5-6FCE-4897-BBC0-B93FE1B84578', 'Display do email no envio de Orçamento', 4, 'displayEmailOrc'),

    disp_email_contract:
      this.configUtils.NewConfigSystemType(
        '6CEAB774-CF60-47EA-A577-6EA47AC09853', 'LOGO SISTEMA', 4, 'displayEmailContract')
  }

  public captionEmailOrc: string = 'Display do email no envio de Orçamento';
  public captionEmailContract: string = 'Display do email no envio de Contrato';

  public form: FormGroup = this.configUtils.formBuilder.group({
    displayEmailOrc: [''],
    displayEmailContract: ['']
  });

  public InitListConfigSystem(pListConfigSystem: IConfigSystemModel[]): void {
    this.listConfigSystem = pListConfigSystem;
    this.InitParams();
  }

  public ToSave(): void {
    this.configUtils.ToSaveConfig(this.form, [
      this.configSystemType.disp_email_orc,
      this.configSystemType.disp_email_contract
    ],
      [
        this.configSystemType.disp_email_orc.configSystemModel!,
        this.configSystemType.disp_email_contract.configSystemModel!
      ])
    this.SetFormRollBack();
  }

  public ToCancel(): void {
    this.RollBack();
  }

  private InitParams(): void {
    this.InitDisplayEmailOrc();
    this.InitDisplayEmailContract();

    this.SetFormRollBack();
  }

  private InitDisplayEmailOrc(): void {
    this.configSystemType.disp_email_orc.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.disp_email_orc.identificacao)[0];

    this.form.controls[this.configSystemType.disp_email_orc.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.disp_email_orc.configSystemModel, this.configSystemType.disp_email_orc.tipoParam
    ));
  }

  private InitDisplayEmailContract(): void {
    this.configSystemType.disp_email_contract.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.disp_email_contract.identificacao)[0];

    this.form.controls[this.configSystemType.disp_email_contract.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.disp_email_contract.configSystemModel, this.configSystemType.disp_email_contract.tipoParam
    ));
  }

  private SetFormRollBack(): void {
    this.formToRollback = this.form.value;

    if (this.form.dirty)
      this.form.markAsPristine();
  }

  private RollBack(): void {
    this.configUtils.coreHttp.ResetForm(this.form, this.formToRollback);
    this.form.markAsPristine();
  }
}

export class ConfigSystemValidacoes {
  public configUtils: ConfigSystemUtils = new ConfigSystemUtils();

  public listValidacaoCpf: JrrbSelectTypeList[] = [
    { caption: 'Aceita CPF inválido mas, deve ser único no cadastro', value: 1 },
    { caption: 'Somente CPF válido e único no cadastro', value: 2 },
    { caption: 'Somente CPF válido e podem se repetir no cadastro', value: 3 },
    { caption: 'Aceita CPF inválido e podem se repetir no cadastro', value: 4 }
  ];

  public listValidacaoCnpj: JrrbSelectTypeList[] = [
    { caption: 'Aceita CNPJ inválido mas, deve ser único no cadastro', value: 1 },
    { caption: 'Somente CNPJ válido e único no cadastro', value: 2 },
    { caption: 'Somente CNPJ válido e podem se repetir no cadastro', value: 3 },
    { caption: 'Aceita CNPJ inválido e podem se repetir no cadastro', value: 4 }
  ];


  //Documentação de como deve se comportar o ConfigSystem, bem como, os dados da tabela
  private formToRollback: any;
  private listConfigSystem: IConfigSystemModel[] = [];
  private configSystemType = {
    validacaoCpf: this.configUtils.NewConfigSystemType(
      'DCF0D423-036F-4073-9B8D-0529FCCF17C8', 'VALIDAÇÃO CPF', 2, 'idValidacaoCpf'),

    validacaoCnpj: this.configUtils.NewConfigSystemType(
      'FB356206-9191-44DD-BA14-801A1188A55D', 'VALIDAÇÃO CNPJ', 2, 'idValidacaoCnpj')
  }
  public captionValidacaoCpf: string = 'Validação CPF';
  public captionValidacaoCnpj: string = 'Validação CNPJ';

  public form: FormGroup = this.configUtils.formBuilder.group({
    idValidacaoCpf: ['', Validators.required],
    idValidacaoCnpj: ['', Validators.required]
  });

  public InitListConfigSystem(pListConfigSystem: IConfigSystemModel[]): void {
    this.listConfigSystem = pListConfigSystem;
    this.InitParams();
  }

  public ToSave(): void {
    this.configUtils.ToSaveConfig(this.form, [
      this.configSystemType.validacaoCpf,
      this.configSystemType.validacaoCnpj
    ],
      [
        this.configSystemType.validacaoCpf.configSystemModel!,
        this.configSystemType.validacaoCnpj.configSystemModel!
      ]);

    this.SetFormRollBack();
  }

  public ToCancel(): void {
    this.RollBack();
  }

  private InitParams(): void {
    this.InitValidacaoCpf();
    this.InitValidacaoCnpj();

    this.SetFormRollBack();
  }

  private InitValidacaoCpf(): void {
    this.configSystemType.validacaoCpf.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.validacaoCpf.identificacao)[0];

    this.form.controls[this.configSystemType.validacaoCpf.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.validacaoCpf.configSystemModel, this.configSystemType.validacaoCpf.tipoParam
    ));
  }

  private InitValidacaoCnpj(): void {
    this.configSystemType.validacaoCnpj.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.validacaoCnpj.identificacao)[0];

    this.form.controls[this.configSystemType.validacaoCnpj.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.validacaoCnpj.configSystemModel, this.configSystemType.validacaoCnpj.tipoParam
    ));
  }

  private SetFormRollBack(): void {
    this.formToRollback = this.form.value;

    if (this.form.dirty)
      this.form.markAsPristine();
  }

  private RollBack(): void {
    this.configUtils.coreHttp.ResetForm(this.form, this.formToRollback);
    this.form.markAsPristine();
  }

}

export class ConfigSystemPerfil {
  public configUtils: ConfigSystemUtils = new ConfigSystemUtils();

  //Documentação de como deve se comportar o ConfigSystem, bem como, os dados da tabela
  private formToRollback: any;
  private listConfigSystem: IConfigSystemModel[] = [];
  private configSystemType = {
    razao_social:
      this.configUtils.NewConfigSystemType(
        '13221F4E-41B3-402C-A2B8-A29D9F9AC84E', 'RAZAO_SOCIAL_FRET', 4, 'razaoSocialFret'),
    nome_fantasia:
      this.configUtils.NewConfigSystemType(
        '418C80A5-D4D4-45B5-8CE0-2CD48A5BF62C', 'NOME_FANTASIA_FRET', 4, 'nomeFantasiaFret'),
    cnpj:
      this.configUtils.NewConfigSystemType(
        '267D4F11-DE0E-4D60-AAD7-C4BB5F442493', 'CNPJ_FRET', 4, 'cnpjFret'),
    ie:
      this.configUtils.NewConfigSystemType(
        'C163A1D0-DA6E-4EB8-98DF-641034672006', 'IE_FRET', 4, 'ieFret'),
    ccm:
      this.configUtils.NewConfigSystemType(
        'DD8F18DC-4209-4343-863A-A3B6B53EC40C', 'CCM_FRET', 4, 'ccmFret'),
    endereco:
      this.configUtils.NewConfigSystemType(
        '96816935-37F3-4EC5-A5CE-69E3F377A0F5', 'ENDERECO_FRET', 4, 'enderecoFret'),
    embratur:
      this.configUtils.NewConfigSystemType(
        '23CC85E0-5109-4B5B-861F-069A69FC55AA', 'EMBRATUR_FRET', 4, 'embraturFret'),
    emtu:
      this.configUtils.NewConfigSystemType(
        '1E24AB8B-1E62-4915-BA6B-C2CEAE25A543', 'EMTU_FRET', 4, 'emtuFret'),
    spTrans:
      this.configUtils.NewConfigSystemType(
        'D5015392-2D3D-45C8-B6C2-C8BC49F1162D', 'SPTRANS_FRET', 4, 'spTransFret'),
    antt:
      this.configUtils.NewConfigSystemType(
        '7F3F6648-1F72-4C23-B59D-0C00F7A67283', 'ANTT_FRET', 4, 'anttFret'),
    artesp:
      this.configUtils.NewConfigSystemType(
        '73118164-2E11-4183-B7AD-3C2DBCECC60E', 'ARTESP_FRET', 4, 'artespFret')
  }

  public captionIe: string = 'IE';
  public captionCcm: string = 'CCM';
  public captionEndereco: string = 'Endereço';
  public captionEmbratur: string = 'Embratur';
  public captionEmtu: string = 'EMTU';
  public captionSpTrans: string = 'SPTrans';
  public captionAntt: string = 'ANTT';
  public captionArtesp: string = 'ARTESP';

  public form: FormGroup = this.configUtils.formBuilder.group({
    razaoSocialFret: ['', Validators.maxLength(50)],
    nomeFantasiaFret: ['', Validators.maxLength(120)],
    cnpjFret: ['', Validators.maxLength(19)],
    ieFret: ['', Validators.maxLength(30)],
    ccmFret: ['', Validators.maxLength(30)],
    enderecoFret: ['', Validators.maxLength(150)],
    embraturFret: ['', Validators.maxLength(15)],
    emtuFret: ['', Validators.maxLength(15)],
    spTransFret: ['', Validators.maxLength(15)],
    anttFret: ['', Validators.maxLength(15)],
    artespFret: ['', Validators.maxLength(15)]
  });

  public InitListConfigSystem(pListConfigSystem: IConfigSystemModel[]): void {
    this.listConfigSystem = pListConfigSystem;
    this.InitParams();
  }

  public ToSave(): void {
    this.configUtils.ToSaveConfig(this.form, [
      this.configSystemType.razao_social,
      this.configSystemType.nome_fantasia,
      this.configSystemType.cnpj,
      this.configSystemType.ie,
      this.configSystemType.ccm,
      this.configSystemType.endereco,
      this.configSystemType.embratur,
      this.configSystemType.emtu,
      this.configSystemType.spTrans,
      this.configSystemType.antt,
      this.configSystemType.artesp
    ],
      [
        this.configSystemType.razao_social.configSystemModel!,
        this.configSystemType.nome_fantasia.configSystemModel!,
        this.configSystemType.cnpj.configSystemModel!,
        this.configSystemType.ie.configSystemModel!,
        this.configSystemType.ccm.configSystemModel!,
        this.configSystemType.endereco.configSystemModel!,
        this.configSystemType.embratur.configSystemModel!,
        this.configSystemType.emtu.configSystemModel!,
        this.configSystemType.spTrans.configSystemModel!,
        this.configSystemType.antt.configSystemModel!,
        this.configSystemType.artesp.configSystemModel!
      ])
    this.SetFormRollBack();
  }

  public ToCancel(): void {
    this.RollBack();
  }

  private InitParams(): void {
    this.InitRazaoSocial();
    this.InitNomeFantasia();
    this.InitCnpj();
    this.InitIe();
    this.InitCcm();
    this.InitEndereco();
    this.InitEmbratur();
    this.InitEmtu();
    this.InitSpTrans();
    this.InitAntt();
    this.InitArteSp();
    this.SetFormRollBack();
  }

  private InitRazaoSocial(): void {
    this.configSystemType.razao_social.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.razao_social.identificacao)[0];

    this.form.controls[this.configSystemType.razao_social.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.razao_social.configSystemModel, this.configSystemType.razao_social.tipoParam
    ));
  }
  private InitNomeFantasia(): void {
    this.configSystemType.nome_fantasia.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.nome_fantasia.identificacao)[0];

    this.form.controls[this.configSystemType.nome_fantasia.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.nome_fantasia.configSystemModel, this.configSystemType.nome_fantasia.tipoParam
    ));
  }
  private InitCnpj(): void {
    this.configSystemType.cnpj.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.cnpj.identificacao)[0];

    this.form.controls[this.configSystemType.cnpj.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.cnpj.configSystemModel, this.configSystemType.cnpj.tipoParam
    ));
  }
  private InitIe(): void {
    this.configSystemType.ie.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.ie.identificacao)[0];

    this.form.controls[this.configSystemType.ie.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.ie.configSystemModel, this.configSystemType.ie.tipoParam
    ));
  }
  private InitCcm(): void {
    this.configSystemType.ccm.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.ccm.identificacao)[0];

    this.form.controls[this.configSystemType.ccm.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.ccm.configSystemModel, this.configSystemType.ccm.tipoParam
    ));
  }
  private InitEndereco(): void {
    this.configSystemType.endereco.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.endereco.identificacao)[0];

    this.form.controls[this.configSystemType.endereco.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.endereco.configSystemModel, this.configSystemType.endereco.tipoParam
    ));
  }
  private InitEmbratur(): void {
    this.configSystemType.embratur.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.embratur.identificacao)[0];

    this.form.controls[this.configSystemType.embratur.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.embratur.configSystemModel, this.configSystemType.embratur.tipoParam
    ));
  }
  private InitEmtu(): void {
    this.configSystemType.emtu.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.emtu.identificacao)[0];

    this.form.controls[this.configSystemType.emtu.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.emtu.configSystemModel, this.configSystemType.emtu.tipoParam
    ));
  }

  private InitSpTrans(): void {
    this.configSystemType.spTrans.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.spTrans.identificacao)[0];

    this.form.controls[this.configSystemType.spTrans.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.spTrans.configSystemModel, this.configSystemType.spTrans.tipoParam
    ));
  }
  private InitAntt(): void {
    this.configSystemType.antt.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.antt.identificacao)[0];

    this.form.controls[this.configSystemType.antt.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.antt.configSystemModel, this.configSystemType.antt.tipoParam
    ));
  }
  private InitArteSp(): void {
    this.configSystemType.artesp.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.artesp.identificacao)[0];

    this.form.controls[this.configSystemType.artesp.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.artesp.configSystemModel, this.configSystemType.artesp.tipoParam
    ));
  }

  private SetFormRollBack(): void {
    this.formToRollback = this.form.value;

    if (this.form.dirty)
      this.form.markAsPristine();
  }

  private RollBack(): void {
    this.configUtils.coreHttp.ResetForm(this.form, this.formToRollback);
    this.form.markAsPristine();
  }
}

export class ConfigSystemContrato {
  public configUtils: ConfigSystemUtils = new ConfigSystemUtils();

  //Documentação de como deve se comportar o ConfigSystem, bem como, os dados da tabela
  private formToRollback: any;
  private listConfigSystem: IConfigSystemModel[] = [];
  private configSystemType = {
    desloc_progr_local:
      this.configUtils.NewConfigSystemType(
        '361061F9-B17D-4110-90B1-D12A244AD9DC', 'CONTRACT_DESLOC_PROGR_LOCAL', 2, 'deslocProgrLocalContr'),
    alter_itiner_pass:
      this.configUtils.NewConfigSystemType(
        'F9974DA3-F9D5-41B8-B3DA-DE2539646E30', 'CONTRACT_ALTER_ITINER_PASS', 2, 'alterItinerPassContr'),
    cancelamento:
      this.configUtils.NewConfigSystemType(
        '6B9A0FDC-0530-4C0B-BE7F-18CEBCCEB683', 'CONTRACT_CANCELAMENTO', 2, 'cancelamentoContr'),
    devol_cont_antec:
      this.configUtils.NewConfigSystemType(
        '9A4761CD-B96D-4401-95F4-EC42C37EC66F', 'CONTRACT_DEVOL_COM_ANTEC', 2, 'devolConAntecContr'),
    devol_sem_antec:
      this.configUtils.NewConfigSystemType(
        'D6AD6292-7182-4780-88D4-373A2B813578', 'CONTRACT_DEVOL_SEM_ANTEC', 2, 'devolSemAntecContr'),
    multa:
      this.configUtils.NewConfigSystemType(
        '9E663FAC-50BE-46FB-90D8-2D2382197117', 'CONTRACT_MULTA', 3, 'multaContr'),
    juros:
      this.configUtils.NewConfigSystemType(
        'F5BBA426-A4C4-4E99-B6FE-28DBDCAFCC46', 'CONTRACT_JUROS', 3, 'jurosContr'),
    local_comarca:
      this.configUtils.NewConfigSystemType(
        '0B0C113D-E2D6-44AA-B4C7-F88B3FCC6FE5', 'CONTRACT_LOCAL_COMARCA', 4, 'localComarcaContr'),
    local_assinatura:
      this.configUtils.NewConfigSystemType(
        '4C2FC9BA-2585-414C-8787-96AD298EF318', 'CONTRACT_LOCAL_ASSINATURA', 4, 'localAssinaturaContr'),
    representante:
      this.configUtils.NewConfigSystemType(
        '3B0CBA83-EEE0-487F-978D-7E2C1BF29439', 'CONTRACT_REPRESENTANTE', 4, 'representanteContr'),
  }

  public form: FormGroup = this.configUtils.formBuilder.group({
    deslocProgrLocalContr: [1, Validators.required],
    alterItinerPassContr: [10, Validators.required],
    cancelamentoContr: [10, Validators.required],
    devolConAntecContr: [10, Validators.required],
    devolSemAntecContr: [10, Validators.required],
    multaContr: [2, Validators.required],
    jurosContr: [2, Validators.required],
    localComarcaContr: ['', Validators.required],
    localAssinaturaContr: ['', Validators.required],
    representanteContr: ['', Validators.required],
  });

  public InitListConfigSystem(pListConfigSystem: IConfigSystemModel[]): void {
    this.listConfigSystem = pListConfigSystem;
    this.InitParams();
  }

  public ToSave(): void {
    this.configUtils.ToSaveConfig(this.form, [
      this.configSystemType.desloc_progr_local,
      this.configSystemType.alter_itiner_pass,
      this.configSystemType.cancelamento,
      this.configSystemType.devol_cont_antec,
      this.configSystemType.devol_sem_antec,
      this.configSystemType.multa,
      this.configSystemType.juros,
      this.configSystemType.local_comarca,
      this.configSystemType.local_assinatura,
      this.configSystemType.representante
    ],
      [
        this.configSystemType.desloc_progr_local.configSystemModel!,
        this.configSystemType.alter_itiner_pass.configSystemModel!,
        this.configSystemType.cancelamento.configSystemModel!,
        this.configSystemType.devol_cont_antec.configSystemModel!,
        this.configSystemType.devol_sem_antec.configSystemModel!,
        this.configSystemType.multa.configSystemModel!,
        this.configSystemType.juros.configSystemModel!,
        this.configSystemType.local_comarca.configSystemModel!,
        this.configSystemType.local_assinatura.configSystemModel!,
        this.configSystemType.representante.configSystemModel!,
      ])
    this.SetFormRollBack();
  }

  public ToCancel(): void {
    this.RollBack();
  }

  private InitParams(): void {
    this.InitDeslocProgrLocal();
    this.InitAlterItinerPass();
    this.InitCancelamento();
    this.InitDevolContAntec();
    this.InitDevolSemAntec();
    this.InitMulta();
    this.InitJuros();
    this.InitLocalComarca();
    this.InitLocalAssinatura();
    this.InitRepresentante();
    this.SetFormRollBack();
  }

  private InitDeslocProgrLocal(): void {
    this.configSystemType.desloc_progr_local.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.desloc_progr_local.identificacao)[0];

    this.form.controls[this.configSystemType.desloc_progr_local.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.desloc_progr_local.configSystemModel, this.configSystemType.desloc_progr_local.tipoParam));
  }
  private InitAlterItinerPass(): void {
    this.configSystemType.alter_itiner_pass.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.alter_itiner_pass.identificacao)[0];

    this.form.controls[this.configSystemType.alter_itiner_pass.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.alter_itiner_pass.configSystemModel, this.configSystemType.alter_itiner_pass.tipoParam));
  }
  private InitCancelamento(): void {
    this.configSystemType.cancelamento.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.cancelamento.identificacao)[0];

    this.form.controls[this.configSystemType.cancelamento.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.cancelamento.configSystemModel, this.configSystemType.cancelamento.tipoParam));
  }
  private InitDevolContAntec(): void {
    this.configSystemType.devol_cont_antec.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.devol_cont_antec.identificacao)[0];

    this.form.controls[this.configSystemType.devol_cont_antec.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.devol_cont_antec.configSystemModel, this.configSystemType.devol_cont_antec.tipoParam));
  }
  private InitDevolSemAntec(): void {
    this.configSystemType.devol_sem_antec.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.devol_sem_antec.identificacao)[0];

    this.form.controls[this.configSystemType.devol_sem_antec.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.devol_sem_antec.configSystemModel, this.configSystemType.devol_sem_antec.tipoParam));
  }
  private InitMulta(): void {
    this.configSystemType.multa.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.multa.identificacao)[0];

    this.form.controls[this.configSystemType.multa.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.multa.configSystemModel, this.configSystemType.multa.tipoParam));
  }
  private InitJuros(): void {
    this.configSystemType.juros.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.juros.identificacao)[0];

    this.form.controls[this.configSystemType.juros.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.juros.configSystemModel, this.configSystemType.juros.tipoParam));
  }
  private InitLocalComarca(): void {
    this.configSystemType.local_comarca.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.local_comarca.identificacao)[0];

    this.form.controls[this.configSystemType.local_comarca.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.local_comarca.configSystemModel, this.configSystemType.local_comarca.tipoParam));
  }
  private InitLocalAssinatura(): void {
    this.configSystemType.local_assinatura.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.local_assinatura.identificacao)[0];

    this.form.controls[this.configSystemType.local_assinatura.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.local_assinatura.configSystemModel, this.configSystemType.local_assinatura.tipoParam));
  }
  private InitRepresentante(): void {
    this.configSystemType.representante.configSystemModel =
      this.configUtils.GetValueFromListParams(this.listConfigSystem, this.configSystemType.representante.identificacao)[0];

    this.form.controls[this.configSystemType.representante.nameFieldControle!].setValue(this.configUtils.GetValueFromConfigSystem(
      this.configSystemType.representante.configSystemModel, this.configSystemType.representante.tipoParam));
  }


  private SetFormRollBack(): void {
    this.formToRollback = this.form.value;

    if (this.form.dirty)
      this.form.markAsPristine();
  }

  private RollBack(): void {
    this.configUtils.coreHttp.ResetForm(this.form, this.formToRollback);
    this.form.markAsPristine();
  }
}

export class ConfigSystemController {

  public configUtils: ConfigSystemUtils = new ConfigSystemUtils();
  public configSystemGerais: ConfigSystemGerais = new ConfigSystemGerais();
  public configSystemEmails: ConfigSystemEmails = new ConfigSystemEmails();
  public configSystemValidacoes: ConfigSystemValidacoes = new ConfigSystemValidacoes();
  public configSystemPerfil: ConfigSystemPerfil = new ConfigSystemPerfil();
  public configSystemContrato: ConfigSystemContrato = new ConfigSystemContrato();

  constructor() {
    this.configUtils.GetListFromApi()
      .subscribe((listResult: IConfigSystemModel[]) => {
        this.configSystemGerais.InitListConfigSystem(listResult);
        this.configSystemEmails.InitListConfigSystem(listResult);
        this.configSystemValidacoes.InitListConfigSystem(listResult);
        this.configSystemPerfil.InitListConfigSystem(listResult);
        this.configSystemContrato.InitListConfigSystem(listResult);
        this.configSystemContrato.configUtils.coreBrowser.LoadOk();
      });
  }

}

export class LoadConfigSystem {

  private configUtils: ConfigSystemUtils = new ConfigSystemUtils();

  public ToLoadConfigSystem(): Observable<IConfigSystemModel[]> {
    return this.configUtils.GetListFromApi();
  }

}