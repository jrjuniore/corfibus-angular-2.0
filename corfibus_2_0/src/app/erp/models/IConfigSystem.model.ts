export interface IConfigSystemModel {
  id_parametro: string,
  desc_param: string,
  nome_param: string,
  identificacao: string,
  param_guid: string,    //tipoParam = 1
  param_bigint: number,  //tipoParam = 2
  param_float: number,   //tipoParam = 3
  param_string: string,  //tipoParam = 4
  param_date: Date,      //tipoParam = 5
  param_time: string,    //tipoParam = 6
  param_datetime: Date,  //tipoParam = 7
  ativo: boolean,
  ativoStr: string,
  file_base_64: string,
  file_base_64_logo_sistema: string,
  date_create: Date,
  dataInclusaoStr: string,
  date_alter: Date,
  dataAlteracaoStr: string,
  user_create: string,
  user_alter: string,
  fileNameLog?: string
}


//paramGuid     - tipoParam = 1
//paramBigInt   - tipoParam = 2
//paramFloat    - tipoParam = 3
//paramString   - tipoParam = 4
//paramDate     - tipoParam = 5
//paramTime     - tipoParam = 6
//paramDateTime - tipoParam = 7
export type IConfigSystemType = {
  identificacao: string,
  nome: string,
  tipoParam: number,
  nameFieldControle?: string,
  configSystemModel?: IConfigSystemModel
}