export interface IVendasEventuaisModel {
  id_Venda_Eventual: string,
  numero: number,
  nome_Cliente?: string,
  destino_Completo?: string,
  id_Entidade?: string,
  id_Cidade_Destino?: string,
  data_Hora_Saida?: Date,
  data_hora_Chegada?: Date,
  km_Total: number,
  periodo_Horas_Total: number,
  valor_Total: number,
  valor_Total_Com_Desconto: number,
  desconto_Total: number,
  perc_Desconto_Total: number,
  aliquota: number,
  forma_Pagto_Desc?: string,
  mensagem_Destaque_1?: string,
  mensagem_Destaque_2?: string,
  mensagem_Destaque_3?: string,
  validade_Proposta: number,
  proposta_Aceita: boolean,
  data_Aceite?: Date,
  data_Cancelamento?: Date,
  valido_Ate?: Date,
  nome_Cidade: string,
  estado: string,
  data_Cancelamento_Str: string,
  data_Aceite_Str: string,
  user_Create: string,
  user_Alter: string,
  date_Create: string,
  date_Create_Str: string,
  date_Alter: string,
  date_Alter_Str: string
}
 