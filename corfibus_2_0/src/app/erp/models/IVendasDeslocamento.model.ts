export interface IVendasDeslocamentoModel {
  id_Venda_Deslocamento: string,
  id_Venda: string,
  id_Veiculo: string,
  numero_Proposta: number, 
  hodometro_Inicial: number, 
  hodometro_Final: number, 
  nome_Veiculo: string,
  prefixo: string,
  user_Create: string,
  user_Alter: string,
  date_Create: string,
  date_Create_Str: string,
  date_Alter: string,
  date_Alter_Str: string,
  ativo: boolean,
  ativoStr: string
}