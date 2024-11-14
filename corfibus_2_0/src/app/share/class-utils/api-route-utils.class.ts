import { IConfigSystemModel } from "../../erp/models/IConfigSystem.model"
import { ApiRouteType } from "../types/apiRoute.type"

export const ApiRouteUtilsClass = {

  ApiEmpty(): ApiRouteType {
    return ({
      route: '',
      params: {} as ApiRouteType
    })
  },

  login_autenticar(): ApiRouteType {
    return ({
      route: 'autenticacao/login',
      params: { empresa: null, nomeBanco: null, usuario: null, senha: null, confirmacaoSenha: null, trocarSenha: false, hours: 5, minutes: 0 }
    } as ApiRouteType)
  },

  set_termo_aceito(pIdEmpresa: string): ApiRouteType {
    return ({
      route: 'autenticacao/termo-aceito',
      params: { value: pIdEmpresa }
    } as ApiRouteType)
  },

  login_deslog_em(pIdUsuario: string): ApiRouteType {
    return ({
      route: 'autenticacao/deslogar-em',
      params: { idLogin: pIdUsuario }
    } as ApiRouteType)
  },

  //Sistemas/Configurações
  sistema: {
    acessos: {
      grupos: {
        ToGet(pId_Grupo: string, pTraceSQL: string = "false"): ApiRouteType {
          return ({
            route: 'permissoes/search',
            params: { id_Usuario: null, id_Grupo: pId_Grupo, traceSQL: pTraceSQL }
          }) as ApiRouteType
        },
        ToSave(pIdGrupo: string, pListPermissoes: string, pTraceSQL: string = 'false'): ApiRouteType {
          return ({
            route: 'permissoes/save-permissoes-grupo',
            params: { id_Grupo: pIdGrupo, listPermissoes: pListPermissoes, traceSQL: pTraceSQL }
          }) as ApiRouteType
        }
      },
      usuarios: {
        ToGet(pIdUsuario: string, pTraceSQL: string = "false"): ApiRouteType {
          return ({
            route: 'permissoes/search',
            params: { id_Usuario: pIdUsuario, id_Grupo: null, traceSQL: pTraceSQL }
          }) as ApiRouteType
        },
        ToSave(pIdUsuario: string, pListPermissoes: string, pTraceSQL: string = 'false'): ApiRouteType {
          return ({
            route: 'permissoes/save-permissoes-usuario',
            params: { id_Usuario: pIdUsuario, listPermissoes: pListPermissoes, traceSQL: pTraceSQL }
          }) as ApiRouteType
        },
        ToGetAccess(pIdUsuario: string): ApiRouteType {
          return ({
            route: 'permissoes/get-permissoes-usuario',
            params: { id_Usuario: pIdUsuario }
          } as ApiRouteType)
        },
      }
    },
    gruposAcessos: {
      ToSave(): ApiRouteType {
        return ({
          route: 'grupos-acessos/save',
          params: {}
        } as ApiRouteType)
      },
      ToDelete(id?: string, traceSQL?: string): ApiRouteType {
        return ({
          route: 'grupos-acessos/delete',
          params: {
            id: id,
            traceSQL: traceSQL
          }
        } as ApiRouteType)
      },
      ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
        return ({
          route: 'grupos-acessos/list',
          params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
        } as ApiRouteType)
      }
    },
    usuariosAcessos: {
      ToAlterSenha(pIdUsuario: string, traceSQL?: string): ApiRouteType {
        return ({
          route: 'autenticacao/login-reset',
          params: {
            idLogin: pIdUsuario,
            traceSQL: traceSQL
          }
        } as ApiRouteType)
      },
      ToSave(): ApiRouteType {
        return ({
          route: 'usuarios-acessos/save',
          params: {}
        } as ApiRouteType)
      },
      ToDelete(id?: string, traceSQL?: string): ApiRouteType {
        return ({
          route: 'usuarios-acessos/delete',
          params: {
            id: id,
            traceSQL: traceSQL
          }
        } as ApiRouteType)
      },
      ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
        return ({
          route: 'usuarios-acessos/list',
          params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
        } as ApiRouteType)
      },
      GetUsuario(id: string, traceSQL?: string): ApiRouteType {
        return ({
          route: 'usuarios-acessos/get-usuario',
          params: { idUsuarioAcesso: id, traceSQL: traceSQL }
        } as ApiRouteType)
      },
      GetDadosUsuario(id: string, traceSQL?: string): ApiRouteType {
        return ({
          route: 'usuarios-acessos/get-dado-usuario',
          params: { idUsuarioAcesso: id, traceSQL: traceSQL }
        } as ApiRouteType)
      }
    },
    auditoria: {
      ToSearch(pDataDe: string, pDataAte: string, pIdUsuario: string, pComando: string, pTabela: string, pTraceSQL: string = "false"): ApiRouteType {
        return ({
          route: 'auditoria/search',
          params: { periodoDe: pDataDe, periodoAte: pDataAte, userCreate: pIdUsuario, comando: pComando, tabela: pTabela, traceSQL: pTraceSQL }
        }) as ApiRouteType
      },
      ToGetByLog(pIdTabela: any): ApiRouteType {
        return ({
          route: 'auditoria/search',
          params: { idTabela: pIdTabela }
        }) as ApiRouteType
      }
    },
    config: {
      ToSave(): ApiRouteType {
        return ({
          route: 'config-system/save',
          params: {
            idParametro: null, paramGuid: null, paramBigInt: null,
            paramFloat: null, paramString: null, paramDate: null,
            paramTime: null, paramDateTime: null, ativo: true
          }
        } as ApiRouteType)
      },
      ToSaveLote(pListToSave: IConfigSystemModel[]): ApiRouteType {
        return ({
          route: 'config-system/save',
          params: pListToSave
        } as ApiRouteType)
      },
      ToList(): ApiRouteType {
        return ({
          route: 'config-system/list', params: null
        } as ApiRouteType)
      }
    }
  },

  //CorfiBus
  corfibus: {
    ToNewEmpresa(pNome: string, pApelido: string, pWhatsApp: string, pCpfCnpj: string, pEmailEmpresa: string): ApiRouteType {
      return ({
        route: 'corfibus/nova-empresa',
        params: { nome: pNome, apelido: pApelido, whatsApp: pWhatsApp, cpfCnpj: pCpfCnpj, emailEmpresa: pEmailEmpresa }
      }) as ApiRouteType
    },
    ToConfirmNewEmpresa(pNome: string, pEmail: string): ApiRouteType {
      return ({
        route: 'corfibus/confirmar-nova-empresa',
        params: { nome: pNome, email: pEmail }
      }) as ApiRouteType
    }
  },

  //Share
  share: {
    ToGetImage(pImageGuid: string, pIdEmpresa: string): ApiRouteType {
      return ({
        route: 'share/image',
        params: { image: pImageGuid, idEmpresa: pIdEmpresa }
      }) as ApiRouteType
    },
    ToSendMail(pFromEmail: string, pToMail: string, pAssuntoEmail: string, pBodyMail: string, pListFileNames: string[], pFileBase64: string[], pDisplay: string): ApiRouteType {
      return ({
        route: 'share/email',
        params: {
          fromEmail: pFromEmail,
          toEmail: pToMail,
          assuntoEmail: pAssuntoEmail,
          bodyEmail: pBodyMail,
          listFileNames: pListFileNames,
          fileBase64: pFileBase64,
          display: pDisplay
        }
      }) as ApiRouteType
    },
    ToCreateClient(pCliente: string): ApiRouteType {
      return ({
        route: 'share/new-client',
        params: {
          value: pCliente
        }
      }) as ApiRouteType
    },
    PesquisarGlobal(pValorPesquisa: string, pTraceSQL: string = "false"): ApiRouteType {
      return ({
        route: 'pesquisa-global/search',
        params: { valueSearch: pValorPesquisa, traceSQL: pTraceSQL }
      }) as ApiRouteType
    },
    EmpresaContratos(pNomeBanco: string): ApiRouteType {
      return ({
        route: 'share/contratos',
        params: { nomeBanco: pNomeBanco }
      }) as ApiRouteType
    },
    SetContratos(pDadosContratacao: any): ApiRouteType {
      return ({
        route: 'share/setcontratos',
        params: pDadosContratacao
      }) as ApiRouteType
    }
  },

  //vendas
  vendas: {
    tabelas: {
      servicos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'vendas/tabelas/servicos/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas/tabelas/servicos/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas/tabelas/servicos/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
      motivosCancelamento: {
        ToSave(): ApiRouteType {
          return ({
            route: 'vendas/tabelas/motivos-cancelamento/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas/tabelas/motivos-cancelamento/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas/tabelas/motivos-cancelamento/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      }
    },
    cadastros: {
      valores: {
        ToSave(): ApiRouteType {
          return ({
            route: 'veiculos/cadastros/valores/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/cadastros/valores/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToSearch(pPesqPor: number, pOnlyAtivos: boolean, pValue?: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/cadastros/valores/search',
            params: { value: pValue, pesqPor: pPesqPor, onlyAtivos: pOnlyAtivos, traceSQL: pTraceSQL }
          }) as ApiRouteType
        },
        ToInitList(): ApiRouteType {
          return ({
            route: 'veiculos/cadastros/valores/init-list',
            params: {}
          }) as ApiRouteType
        }
      },
      servicos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'vendas/cadastros/servicos/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas/cadastros/servicos/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToSearch(pPesqPor: number, pOnlyAtivos: boolean, pValue?: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas/cadastros/servicos/search',
            params: { value: pValue, pesqPor: pPesqPor, onlyAtivos: pOnlyAtivos, traceSQL: pTraceSQL }
          }) as ApiRouteType
        },
        ToInitList(): ApiRouteType {
          return ({
            route: 'vendas/cadastros/servicos/init-list',
            params: {}
          }) as ApiRouteType
        }
      },
      periodos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'vendas/cadastros/periodos/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas/cadastros/periodos/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToSearch(pPesqPor: number, pOnlyAtivos: boolean, pValue?: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas/cadastros/periodos/search',
            params: { value: pValue, pesqPor: pPesqPor, onlyAtivos: pOnlyAtivos, traceSQL: pTraceSQL }
          }) as ApiRouteType
        },
        ToInit(): ApiRouteType {
          return ({
            route: 'vendas/cadastros/periodos/init-list',
            params: {}
          }) as ApiRouteType
        }
      },
      vendas_eventuais: {
        ToListCategoriasAtivas(): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/list-categorias-ativas',
            params: {}
          } as ApiRouteType)
        },
        ToListServicosAtivos(): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/list-servicos-ativos',
            params: {}
          } as ApiRouteType)
        },
        /**
         * @param pPesqPor 0: Número, 1: Cliente, 2: Data Saída ( Para montar a agenda ), 3: Id_Venda_Eventual, 4: Id_Entidade ( Cliente ), 5: Id_Entidade ( Motorista )
         * @param pValue Parâmetro
         * @param pTraceSQL Nome do arquivo de log para análise
         * @returns 
         */
        ToSearch(pPesqPor: number, pValue?: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/search',
            params: { value: pValue, pesqPor: pPesqPor, traceSQL: pTraceSQL }
          } as ApiRouteType)
        },
        ToInitList(): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/init-list',
            params: {}
          } as ApiRouteType)
        },
        ToGet(pIdVendaEventual: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/get',
            params: { value: pIdVendaEventual, pTraceSQL: pTraceSQL }
          } as ApiRouteType)
        },
        ToPrintOrcamento(pLogoReport: string, pIdVenda: string, pEmpresa: string, pNumero: number): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/print-orcamento',
            params: { toHtml: false, toPdf: true, logo_Report: pLogoReport, id: pIdVenda, param01: pEmpresa, report_Title: `Proposta de Prestação de Serviço ${pNumero.toString()}` }
          } as ApiRouteType)
        },
        ToPrintContrato(pLogoReport: string, pIdVenda: string, pApelidoEmpresa: string, pCnpjEmpresa: string, pNomeCompletoEmpresa: string, pNomeCompletoUsuario: string, pNumero: number): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/print-contrato',
            params: {
              toHtml: false, toPdf: true, logo_Report: pLogoReport, id: pIdVenda,
              param01: pApelidoEmpresa ?? "",
              param02: pCnpjEmpresa ?? "",
              param03: pNomeCompletoEmpresa ?? "",
              param04: pNomeCompletoUsuario ?? "",
              report_Title: `Contrato de Prestação de Serviços de Transporte - ${pNumero.toString()}`
            }
          } as ApiRouteType)
        },
        ToPrintRealizadas(logoReport: string, dataDe: string, dataAte: string, pPrintFiltro: boolean, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/print-vendas-realizadas',
            params: {
              report_Title: "Vendas Eventuais Realizadas",
              param01: dataDe,
              param02: dataAte,
              toPdf: true,
              logo_Report: logoReport,
              printFiltro: pPrintFiltro,
              traceSQL: pTraceSQL
            }
          }) as ApiRouteType
        },
        ToPrintOrcamentosPedidos(logoReport: string, dataDe: string, dataAte: string, pPrintFiltro: boolean, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/print-orcamentos-perdidos',
            params: {
              report_Title: "Vendas Eventuais - Orçamentos Perdidos",
              param01: dataDe,
              param02: dataAte,
              toPdf: true,
              logo_Report: logoReport,
              printFiltro: pPrintFiltro,
              traceSQL: pTraceSQL
            }
          }) as ApiRouteType
        },
        ToPrintProducaoHodometro(logoReport: string, dataDe: string, dataAte: string, pPrintFiltro: boolean, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/print-vendas-hodometro',
            params: {
              report_Title: "Vendas Eventuais - Produção Hodômetro",
              param01: dataDe,
              param02: dataAte,
              toPdf: true,
              logo_Report: logoReport,
              printFiltro: pPrintFiltro,
              traceSQL: pTraceSQL
            }
          }) as ApiRouteType
        },
        ToGetFoto(pIdVendaEventual: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/get-foto',
            params: { value: pIdVendaEventual, pTraceSQL: pTraceSQL }
          } as ApiRouteType)
        },
        ToSaveRoteiro(pIdVendaEventual: string, pRoteiro?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/roteiro-save',
            params: { id_Venda_Eventual: pIdVendaEventual, roteiro: pRoteiro }
          } as ApiRouteType)
        },
        ToSave(): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/save',
            params: {}
          } as ApiRouteType)
        },
        ToAceptCancel(pNumero: number, pIsCancel: boolean, pDataAceptCancel: string, pidEntidade: string, pNomeEntidade: string,
          pIdMotivoCancelamento: string
        ): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/acept-cancel',
            params: {
              numero: pNumero,
              isCancel: pIsCancel,
              data_AceptCancel: pDataAceptCancel,
              id_Entidade: pidEntidade,
              id_Motivo_Cancelamento: pIdMotivoCancelamento,
              nome_Cliente: pNomeEntidade
            }
          } as ApiRouteType)
        },
        ToFinalizeVigem(pIdVendaEventual: string, pDataFinalizacao: String): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/finalize-viagem',
            params: {
              data_Finalize_Viagem: pDataFinalizacao,
              id_Venda_Eventual: pIdVendaEventual
            }
          } as ApiRouteType)
        },
        ToImport(pJsonEnderecoDestino: string, pJsonFormViagem: string, pJsonCategorias: string, pJsonServicos: string,
          pJsonEmbarques: string, pIdVendaEventual: string, pNumero: number, pTraceSQL?: string,
        ): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/import',
            params: {
              json_Endereco_Destino: pJsonEnderecoDestino,
              json_Form_Viagem: pJsonFormViagem,
              json_Categorias: pJsonCategorias,
              json_Servicos: pJsonServicos,
              json_Embarques: pJsonEmbarques,
              id_Venda_Eventual: pIdVendaEventual,
              numero: pNumero,
              traceSQL: pTraceSQL
            }
          } as ApiRouteType)
        },
      },
      vendas_escalas: {
        ToSave(): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/escalas/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/escalas/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(pValue: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/escalas/list',
            params: { value: pValue, traceSQL: pTraceSQL }
          }) as ApiRouteType
        },
        ToPrintEscala(pLogoReport: string, pIdVendaEscala: string, pObservacoes: string, pTitleReport: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/escalas/print-escala-motorista',
            params: {
              report_Title: pTitleReport,
              id: pIdVendaEscala,
              param01: pObservacoes,
              toPdf: true,
              toHtml: true,
              logo_Report: pLogoReport,
            }
          }) as ApiRouteType
        }
      },
      vendas_deslocamento: {
        ToSave(): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/deslocamento/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/deslocamento/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(pValue: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/deslocamento/list',
            params: { value: pValue, traceSQL: pTraceSQL }
          }) as ApiRouteType
        }
      },
      vendas_ocorrencias_obs: {
        ToSave(): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/ocorrencias-observacoes/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/ocorrencias-observacoes/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(pValue: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/ocorrencias-observacoes/list',
            params: { value: pValue, traceSQL: pTraceSQL }
          }) as ApiRouteType
        }
      },
      vendas_ocorrencias_multas: {
        ToSave(): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/ocorrencias-multas/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/ocorrencias-multas/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(pValue: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/ocorrencias-multas/list',
            params: { value: pValue, traceSQL: pTraceSQL }
          }) as ApiRouteType
        },
        ToListChaveValor(dataDe: string, dataAte: string, pesqPeriodoPor: number, forWho: number, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/ocorrencias-multas/list-chave-valor',
            params: { pDateDe: dataDe, pDateAte: dataAte, pPesqPeriodoPor: pesqPeriodoPor, pForWho: forWho, traceSQL: pTraceSQL }
          }) as ApiRouteType
        },
        ToPrint(logoReport: string, dataDe: string, dataAte: string, pesqPeriodoPor: number, listMotoristas: string[], listVeiculos: string[], naoPagas: boolean, pPrintFiltro: boolean, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/ocorrencias-multas/print',
            params: {
              paramsSearch: {
                pPesqPeriodoPor: pesqPeriodoPor,
                pDateDe: dataDe,
                pDateAte: dataAte,
                pListMotoristas: listMotoristas,
                pListVeiculos: listVeiculos,
                pNaoPagas: naoPagas,
                printFiltro: pPrintFiltro,
                traceSQL: pTraceSQL
              },
              paramReport: {
                logo_Report: logoReport,
                toHtml: false, toPdf: true,
                traceSQL: pTraceSQL
              }
            }
          }) as ApiRouteType
        }
      },
      vendas_ocorrencias_despesas: {
        ToSave(): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/ocorrencias-despesas/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/ocorrencias-despesas/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(pValue: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/ocorrencias-despesas/list',
            params: { value: pValue, traceSQL: pTraceSQL }
          }) as ApiRouteType
        },
      },
      vendas_pagamentos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/pagamentos/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/pagamentos/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(pValue: string, pTraceSQL?: string): ApiRouteType {
          return ({
            route: 'vendas-eventuais/vendas/pagamentos/list',
            params: { value: pValue, traceSQL: pTraceSQL }
          }) as ApiRouteType
        }
      }
    }
  },

  //veículos
  veiculos: {
    tabelas: {
      combustiveis: {
        ToSave(): ApiRouteType {
          return ({
            route: 'veiculos/combustiveis/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/combustiveis/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/combustiveis/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
      tipos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'veiculos/tipos/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/tipos/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/tipos/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
      categorias: {
        ToSave(): ApiRouteType {
          return ({
            route: 'veiculos/categorias/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/categorias/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/categorias/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
      chassis: {
        ToSave(): ApiRouteType {
          return ({
            route: 'veiculos/chassis/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/chassis/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/chassis/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
      carrocerias: {
        ToSave(): ApiRouteType {
          return ({
            route: 'veiculos/carrocerias/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/carrocerias/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/carrocerias/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
      marcas: {
        ToSave(): ApiRouteType {
          return ({
            route: 'veiculos/marcas/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/marcas/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/marcas/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
      modelos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'veiculos/modelos/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/modelos/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        /*
          0: id_veiculo_modelo;
          1: nome;
          2: id_veiculo_marca
        */
        ToSearch(pValuePesq: string, pPesqPor: number, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/modelos/search',
            params: { valuePesq: pValuePesq, pesqPor: pPesqPor, traceSQL: traceSQL }
          } as ApiRouteType)
        },
        ToInitList(): ApiRouteType {
          return ({
            route: 'veiculos/modelos/init-list',
            params: {}
          } as ApiRouteType)
        }
      }
    },
    cadastros: {
      veiculos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'veiculos/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        /*
          0 => prefixo;
          1 => placa;
          2 => modelo;
          3 => renavan;
        */
        ToSearch(pValue: string, pPesqPor: number, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/search',
            params: { value: pValue, pesqPor: pPesqPor, traceSQL: traceSQL }
          } as ApiRouteType)
        },
        ToInitList(): ApiRouteType {
          return ({
            route: 'veiculos/init-list',
            params: {}
          } as ApiRouteType)
        },
        ToSearchAutoComplete(pValue: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/search-autocomplete',
            params: { value: pValue, traceSQL: traceSQL }
          } as ApiRouteType)
        },
        ToGet(pValue: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/get',
            params: { value: pValue, traceSQL: traceSQL }
          } as ApiRouteType)
        },
        ToGetCategorias(pIdVeiculo: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/categorias/list_categ',
            params: { value: pIdVeiculo, traceSQL: traceSQL }
          } as ApiRouteType)
        },
        ToSaveCategorias(pIdVeiculo: string, pListIdVeiculoCategoria: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'veiculos/categorias/save_categ',
            params: { id_Veiculo: pIdVeiculo, list_Id_Veiculo_Categoria: pListIdVeiculoCategoria, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
    }
  },

  //Tabelas
  tabelas: {
    gerais: {
      bancos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'tabelas/bancos/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'tabelas/bancos/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'tabelas/bancos/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        },
        ToPrint(pLogoReport: string): ApiRouteType {
          return ({
            route: 'tabelas/bancos/report',
            params: { toHtml: false, toPdf: true, logo_Report: pLogoReport }
          } as ApiRouteType)
        }
      },
      cores: {
        ToSave(): ApiRouteType {
          return ({
            route: 'tabelas/cores/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'tabelas/cores/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'tabelas/cores/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
      tiposContatos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'tabelas/tipos-contatos/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'tabelas/tipos-contatos/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'tabelas/tipos-contatos/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        },
        ToPrint(pLogoReport: string): ApiRouteType {
          return ({
            route: 'tabelas/tipos-contatos/report',
            params: { toHtml: false, toPdf: true, logo_Report: pLogoReport }
          } as ApiRouteType)
        }
      },
      tiposDocumentos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'tabelas/tipos-documentos/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'tabelas/tipos-documentos/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'tabelas/tipos-documentos/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
      departamentos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'departamentos/save',
            params: { nome: null, ativo: null }
          } as ApiRouteType)
        },
        ToDelete(pIdDepartamento: string): ApiRouteType {
          return ({
            route: 'departamentos/delete',
            params: { idDepartamento: pIdDepartamento }
          } as ApiRouteType)
        },
        ToList(): ApiRouteType {
          return ({
            route: 'departamentos/list',
            params: { onlyAtivos: 0 }
          } as ApiRouteType)
        },
        ToListForSelect(): ApiRouteType {
          return ({
            route: 'departamentos/list',
            params: { onlyAtivos: 1 }
          } as ApiRouteType)
        }
      }
    },
    diario: {
      assuntos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'tabelas/assuntos-diario/save',
            params: { nome: null, ativo: null }
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'tabelas/assuntos-diario/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'tabelas/assuntos-diario/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)

        }
      },
    },
    cep: {
      tiposLogradouros: {
        ToSave(): ApiRouteType {
          return ({
            route: 'cep/tipos-logradouros/save',
            params: { nome: null, ativo: null }
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'cep/tipos-logradouros/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'cep/tipos-logradouros/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        },
        ToPrint(pLogoReport: string): ApiRouteType {
          return ({
            route: 'cep/tipos-logradouros/report',
            params: { toHtml: false, toPdf: true, logo_Report: pLogoReport }
          } as ApiRouteType)
        }
      },
      tiposEnderecos: {
        ToSave(): ApiRouteType {
          return ({
            route: 'cep/tipos-enderecos/save',
            params: { nome: null, ativo: null }
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'cep/tipos-enderecos/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'cep/tipos-enderecos/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)

        },
        ToPrint(pLogoReport: string): ApiRouteType {
          return ({
            route: 'cep/tipos-enderecos/report',
            params: { toHtml: false, toPdf: true, logo_Report: pLogoReport }
          } as ApiRouteType)
        }
      },
      estados: {
        ToSave(): ApiRouteType {
          return ({
            route: 'cep/estados/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'cep/estados/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'cep/estados/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
      cidades: {
        ToSave(): ApiRouteType {
          return ({
            route: 'cep/cidades/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'cep/cidades/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToSearch(pNome?: string, pIdEstado?: string, pIdCidade?: string): ApiRouteType {
          return ({
            route: 'cep/cidades/search',
            params: { id_Cidade: pIdCidade, id_Estado: pIdEstado, nome_Cidade: pNome }
          }) as ApiRouteType
        },
        ToInitiList(): ApiRouteType {
          return ({
            route: 'cep/cidades/init-list',
            params: {}
          }) as ApiRouteType
        }
      },
      ceps: {
        ToSave(): ApiRouteType {
          return ({
            route: 'cep/ceps/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'cep/ceps/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToSearch(pIdCep?: string, pCep?: string, pLogradouro?: string): ApiRouteType {
          return ({
            route: 'cep/ceps/search',
            params: { idCep: pIdCep, cep: pCep, endereco: pLogradouro }
          } as ApiRouteType)
        },
        ToInitList(): ApiRouteType {
          return ({
            route: 'cep/ceps/init-list',
            params: {}
          } as ApiRouteType)
        }
      }
    }
  },

  //Cadastros
  cadastros: {
    entidades: {
      ToSave(): ApiRouteType {
        return ({
          route: 'cadastros/entidades/save',
          params: {}
        } as ApiRouteType)
      },
      ToDelete(id?: string, traceSQL?: string): ApiRouteType {
        return ({
          route: 'cadastros/entidades/delete',
          params: {
            id: id,
            traceSQL: traceSQL
          }
        } as ApiRouteType)
      },
      ToSearch(pValueSearch: string, pPesqPor: number, pSearchWho: number): ApiRouteType {
        /*
          pSearchWho => 
            {
              cliente = 0,
              usuario = 1,
              fornecedor = 2,
              motorista = 3    
            }    
        */
        return ({
          route: 'cadastros/entidades/search',
          params: { valuePesq: pValueSearch, pesqPor: pPesqPor, searchWho: pSearchWho }
        }) as ApiRouteType
      },
      ToInitList(pSearchWho: number): ApiRouteType {
        /*
          pSearchWho => 
            {
              cliente = 0,
              usuario = 1,
              fornecedor = 2,
              motorista = 3    
            }    
        */
        return ({
          route: 'cadastros/entidades/init-list',
          params: { valueGet: pSearchWho.toString() }
        }) as ApiRouteType
      },
      ToGet(pIdEntidade: string, pPesqPor: number): ApiRouteType {
        return ({
          route: 'cadastros/entidades/get',
          params: { idEntidade: pIdEntidade, pesqPor: pPesqPor }
        }) as ApiRouteType
      },
      ToPrintFichaCadastro(pLogoReport: string, pId: string): ApiRouteType {
        return ({
          route: 'cadastros/entidades/ficha-cadastro',
          params: {
            toHTML: false, toPDF: true, logo_Report: pLogoReport, id: pId,
          }
        }) as ApiRouteType
      }
    },
    entidadesContatos: {
      ToSave(): ApiRouteType {
        return ({
          route: 'cadastros/entidades/contatos/save',
          params: {}
        } as ApiRouteType)
      },
      ToDelete(id?: string, traceSQL?: string): ApiRouteType {
        return ({
          route: 'cadastros/entidades/contatos/delete',
          params: {
            id: id,
            traceSQL: traceSQL
          }
        } as ApiRouteType)
      },
      ToList(pIdEntidade: string, pOnlyAtivos: boolean = false): ApiRouteType {
        return ({
          route: 'cadastros/entidades/contatos/list',
          params: { id: pIdEntidade, onlyAtivos: pOnlyAtivos }
        } as ApiRouteType)
      }
    },
    entidadesEnderecos: {
      ToSave(): ApiRouteType {
        return ({
          route: 'cadastros/entidades/enderecos/save',
          params: {}
        } as ApiRouteType)
      },
      ToDelete(id?: string, traceSQL?: string): ApiRouteType {
        return ({
          route: 'cadastros/entidades/enderecos/delete',
          params: {
            id: id,
            traceSQL: traceSQL
          }
        } as ApiRouteType)
      },
      ToList(pIdEntidade: string, pOnlyAtivos: boolean = false): ApiRouteType {
        return ({
          route: 'cadastros/entidades/enderecos/list',
          params: { id: pIdEntidade, onlyAtivos: pOnlyAtivos }
        } as ApiRouteType)
      }
    },
    entidadesAso: {
      ToSave(): ApiRouteType {
        return ({
          route: 'cadastros/entidades/aso/save',
          params: {}
        } as ApiRouteType)
      },
      ToDelete(id?: string, traceSQL?: string): ApiRouteType {
        return ({
          route: 'cadastros/entidades/aso/delete',
          params: {
            id: id,
            traceSQL: traceSQL
          }
        } as ApiRouteType)
      },
      ToList(pIdEntidade: string): ApiRouteType {
        return ({
          route: 'cadastros/entidades/aso/get',
          params: { value: pIdEntidade }
        } as ApiRouteType)
      }
    },
    entidadesDiario: {
      ToSave(): ApiRouteType {
        return ({
          route: 'cadastros/entidades/diario/save',
          params: {}
        } as ApiRouteType)
      },
      ToSearch(pDataDe: Date, pDataAte: Date, pOnlyOwner: boolean, pUserOwner: string, pIdEntidade: string, pTraceSQL: string = ""): ApiRouteType {
        return ({
          route: 'cadastros/entidades/diario/search',
          params: { data_De: pDataDe, data_Ate: pDataAte, only_Owner: pOnlyOwner, user_Owner: pUserOwner, id_Entidade: pIdEntidade, traceSQL: pTraceSQL }
        }) as ApiRouteType
      },
      ToExecReport(pLogoReport: string, pDataInicial: string, pDataFinal: string, pMostrarEm: string,
        pListIdAssuntos: string, pSelecionouTodosAssuntos: boolean, pListIdEntidades: string,
        pSelecionouTodasEntidades: boolean, pPrintParamsReport: boolean,
      ): ApiRouteType {
        return ({
          route: 'entidades/diario/report',
          params: {
            reportParametersRequest: {
              toPDF: true,
              toHTML: true,
              logoReport: pLogoReport,
            },
            dataInicial: pDataInicial,
            dataFinal: pDataFinal,
            mostrarEm: pMostrarEm,
            listIdAssuntos: pListIdAssuntos,
            selecionouTodosAssuntos: pSelecionouTodosAssuntos,
            listIdEntidades: pListIdEntidades,
            selecionouTodasEntidades: pSelecionouTodasEntidades,
            printParamsReport: pPrintParamsReport
          }
        }) as ApiRouteType
      }
    }
  },

  //Financeiro
  financeiro: {
    tabelas: {
      formasPagamento: {
        ToSave(): ApiRouteType {
          return ({
            route: 'financeiro/tabelas/formas-pagamento/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'financeiro/tabelas/formas-pagamento/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'financeiro/tabelas/formas-pagamento/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      },
      tiposDespesas: {
        ToSave(): ApiRouteType {
          return ({
            route: 'financeiro/tabelas/tipos-despesas/save',
            params: {}
          } as ApiRouteType)
        },
        ToDelete(id?: string, traceSQL?: string): ApiRouteType {
          return ({
            route: 'financeiro/tabelas/tipos-despesas/delete',
            params: {
              id: id,
              traceSQL: traceSQL
            }
          } as ApiRouteType)
        },
        ToList(onlyAtivos?: boolean, traceSQL?: string): ApiRouteType {
          return ({
            route: 'financeiro/tabelas/tipos-despesas/list',
            params: { onlyAtivos: onlyAtivos, traceSQL: traceSQL }
          } as ApiRouteType)
        }
      }
    },
    report: {
      ToPrintVERealizadasEntradas(logoReport: string, dataDe: string, dataAte: string, pPrintFiltro: boolean, pTraceSQL?: string): ApiRouteType {
        return ({
          route: 'financeiro/report/vendas-eventuais/entradas',
          params: {
            param01: dataDe,
            param02: dataAte,
            toPdf: true,
            logo_Report: logoReport,
            printFiltro: pPrintFiltro,
            traceSQL: pTraceSQL
          }
        }) as ApiRouteType
      },
      ToPrintVERealizadasDespesas(logoReport: string, dataDe: string, dataAte: string, pPrintFiltro: boolean, pTraceSQL?: string): ApiRouteType {
        return ({
          route: 'financeiro/report/vendas-eventuais/despesas',
          params: {
            param01: dataDe,
            param02: dataAte,
            toPdf: true,
            logo_Report: logoReport,
            printFiltro: pPrintFiltro,
            traceSQL: pTraceSQL
          }
        }) as ApiRouteType
      },
      ToPrintVERealizadasSaldoViagem(logoReport: string, dataDe: string, dataAte: string, pPrintFiltro: boolean, pTraceSQL?: string): ApiRouteType {
        return ({
          route: 'financeiro/report/vendas-eventuais/saldo-viagem',
          params: {
            param01: dataDe,
            param02: dataAte,
            toPdf: true,
            logo_Report: logoReport,
            printFiltro: pPrintFiltro,
            traceSQL: pTraceSQL
          }
        }) as ApiRouteType
      }
    }
  },

  //Administrativo
  administrativo: {
    report: {
      PrintVencimentoCnh(logoReport: string, dataDe: string, dataAte: string, pPrintFiltro: boolean, pTraceSQL?: string): ApiRouteType {
        return ({
          route: 'cadastros/entidades/print-vencimento-cnh',
          params: {
            printFiltro: pPrintFiltro,
            param01: dataDe,
            param02: dataAte,
            param03: "0",
            toPdf: true,
            logo_Report: logoReport,
            traceSQL: pTraceSQL
          }
        } as ApiRouteType)
      },
      PrintLicenciamento(logoReport: string, mes: number, reportTitle: string, pTraceSQL?: string): ApiRouteType {
        return ({
          route: 'veiculos/print-licenciamento',
          params: {
            param01: mes.toString(),
            report_Title: reportTitle,
            toPdf: true,
            logo_Report: logoReport,
            traceSQL: pTraceSQL
          }
        } as ApiRouteType)
      }
    }
  },

  //dashboard
  dashboard: {
    Escalas(pVisaoVeiculos: boolean): ApiRouteType {
      return ({
        route: 'dashboard/vendaseventuais/escalas',
        params: {
          value: pVisaoVeiculos ? "0" : "1"
        }
      } as ApiRouteType)
    },

    VendasEventais(): ApiRouteType {
      return ({
        route: 'dashboard/vendaseventuais/vendas-eventuais',
        params: {}
      } as ApiRouteType)
    }
  }

}
