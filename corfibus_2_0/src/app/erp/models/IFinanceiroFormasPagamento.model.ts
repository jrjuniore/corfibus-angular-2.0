export interface IFinanceiroFormasPagamentoModel {
  id_Forma_Pagamento: string,
  nome: string,
  pagto_Vista: boolean,
  pagto_Pri_Parc_Vista: boolean,
  qtd_Parcelas: number,
  parc_Todo_Dia: number,
  user_Create: string,
  user_Alter: string,
  date_Create: string,
  date_Alter: string,
  ativo: boolean,
  ativoStr: string,
  date_Create_Str: string,
  date_Alter_Str: string
}