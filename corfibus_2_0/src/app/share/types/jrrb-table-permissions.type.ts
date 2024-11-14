import { ApiRouteType } from "./apiRoute.type"

export type JrrbTablePermissionsType = {
  haveAcessIncludeRecord: boolean,
  haveAcessEditRecord: boolean,
  haveAcessDeleteRecord: boolean,
  haveAcessVisualizeRecord: boolean,
  haveAcessPrintRecord?: boolean,
  haveAcessLogRecord: boolean,
  haveAcessViewPermitions?: boolean,
  haveAcessResetSenha?: boolean
  haveAcessLink?: boolean
}

export type EntidadesAbasPermissionsType = {
  haveAccessIdentificacao?: boolean,
  haveAccessContatos?: boolean,
  haveAccessEnderecos?: boolean,
  haveAccessDiario?: boolean,
  haveAccessAso?: boolean,
  haveAccessVendaEventualCliente?: boolean,
  haveAccessVendaEventualMotorista?: boolean,
  haveAccessCompanhia?: boolean
}

export type VendasEventuaisOthersPermitionsType = {
  haveAccessTabEscalas?: boolean,
  haveAccessTabDeslocamento?: boolean,
  haveAccessTabPagamentos?: boolean,
  haveAccessTabOcorrencias?: boolean,
  haveAccessAceitarPropostas?: boolean,
  haveAccessEnviarPropostasContratos?: boolean,
  haveAccessCancelarPropostas?: boolean,
  haveAccessFinalizarViagem?: boolean,
}

export type VeiculosAbasPermitionsType = {
  haveAccessIdentificacao?: boolean,
  haveAccessValores?: boolean,
  haveAcessMultas?: boolean,
  haveAccessMotoristas?: boolean
}

export type AccessTablesPermissionsConfigType = {
  apiAccess?: ApiRouteType,
  haveAccess?: boolean,
  formToOpenAccess?: any
}

export type EntidadesAccessTablesPermissionsType = {
  tiposPessoas?: AccessTablesPermissionsConfigType
}

export type CidadesAccessTablesPermissionsType = {
  estados?: AccessTablesPermissionsConfigType
}
