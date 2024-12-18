export interface IEntidadesModel {
  id_Entidade: string,
  nome: string,
  apelido: string,
  tipo_Pessoa: string,
  cpf_Cnpj: string,
  id_Uf_Naturalidade: string,
  id_Cidade_Naturalidade: string,
  nome_Cidade: string,
  rg: string,
  rg_Orgao_Expedidor: string,
  rg_Data_Expedicao: string,
  cnh: string,
  cnh_Data_Expedicao: string,
  sexo: string,
  data_Nascimento: string,
  id_Banco: string,
  agencia: string,
  conta_Corrente: string,
  observacoes: string,
  ie: string,
  data_Abertura: string,
  img_Logo: string,
  file_Base64: string,
  user_Create: string,
  user_Alter: string,
  date_Create: string,
  date_Alter: string,
  ativo: boolean,
  ativoStr: string,
  date_Create_Str: string,
  date_Alter_Str: string
}