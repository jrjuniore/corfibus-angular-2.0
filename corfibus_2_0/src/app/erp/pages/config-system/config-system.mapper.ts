import { environment } from "../../../../environments/environment";

export class ConfigSystemMapperClass {
  static TIPO_ENTIDADE_USUARIO = 'F55920CC-CADB-4A14-91DF-C6442F297206';
  static TIPO_ENTIDADE_COMPANHIA = '55E4DC1B-8A03-44BE-9E2A-31555D1A0BFE';
  static VALIDACAO_CPF = 'DCF0D423-036F-4073-9B8D-0529FCCF17C8';
  static OCULTAR_MENU_TABELAS = '9CB606F1-141C-4D70-A977-95F4E0707FA0';
  static VALIDACAO_CNPJ = 'FB356206-9191-44DD-BA14-801A1188A55D';
  static LOGO_RELATORIO = 'D1FCA839-DD7C-4C82-8C1A-9F769181D6B9';
  static LOGO_SISTEMA = '3D77CD85-09C9-4490-BF8B-B9373FC3EA61';
  static CONTRACT_DESLOC_PROGR = '361061F9-B17D-4110-90B1-D12A244AD9DC';
  static CONTRACT_REPRESENTANTE = '3B0CBA83-EEE0-487F-978D-7E2C1BF29439';
  static CONTRACT_COMARCA = '0B0C113D-E2D6-44AA-B4C7-F88B3FCC6FE5';
  static CONTRACT_LOCAL = '4C2FC9BA-2585-414C-8787-96AD298EF318';
  static RAZAO_SOCIAL_FRET = 'YYYYY';
  static NOME_FANTASIA_FRET = 'YYYYY';
  static CNPJ_FRET = 'YYYYY';
  static IE_FRET = 'YYYYY';
  static CCM_FRET = 'YYYYY';
  static ENDERECO_FRET = 'YYYYY';
  static EMBRATUR_FRET = 'YYYYY';
  static EMTU_FRET = 'YYYYY';
  static SPTRANS_FRET = 'YYYYY';
  static ANTT_FRET = 'YYYYY';
  static ARTESP_FRET = 'YYYYY';
  static DISPLAY_EMAIL_ORC = '0488ADA5-6FCE-4897-BBC0-B93FE1B84578';
  static DISPLAY_EMAIL_CONTRACT = '6CEAB774-CF60-47EA-A577-6EA47AC09853';

  static GetValueMapper(pIdentificador: string): string {
    return environment.userErp.config[pIdentificador];
  }
}

/**
 * Sumary
 * ==============================
 * VALIDACAO_CPF e VALIDACAO_CNPJ
 * ==============================
 * Domínio  1 =>  Aceita CPF/CNPJ inválido mas, deve ser único no cadastro
 *          2 =>  Somente CPF/CNPJ válidos e únicos no cadastro
 *          3 =>  Somente CPF/CNPJ válidos e podem se repetir no cadastro
 *          4 =>  Aceita CPF/CNPJ inválido e podem se repetir no cadastro
 */