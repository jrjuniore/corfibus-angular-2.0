import { inject, signal } from "@angular/core";
import { CoreRouterService } from "../../core/core-router.service";
import { ErpAccess } from "../../share/class-utils/erp-access.class";
import { HelperUtilsClass } from "../../share/class-utils/helper-utils.class";
import { environment } from "../../../environments/environment";
import { ConfigSystemMapperClass } from "../pages/config-system/config-system.mapper";
import { CoreObservableService } from "../../core/core-observable.service";
import { Subject, take, takeUntil } from "rxjs";


export const HaveAccess = () => {
  return ({
    veiculos: {
      access: ErpAccess.HaveAccess('ca530317-caca-4b25-a993-c63b51088c88'),
      tabelas: {
        ocultar: HelperUtilsClass.NumberIsEqual(environment.userErp.config[ConfigSystemMapperClass.OCULTAR_MENU_TABELAS], 1),
        access: ErpAccess.HaveAccess('794d5bb2-b7b7-4242-9000-344686df1897'),
        combustiveis: {
          access: ErpAccess.HaveAccess('dab2d01f-3172-4d12-b66e-e8803adb5811'),
          route: 'veiculos/tabelas/combustiveis'
        },
        categorias: {
          access: ErpAccess.HaveAccess('156ada54-bd07-43d1-ad15-2c62f647abed'),
          route: 'veiculos/tabelas/categorias'
        },
        chassis: {
          access: ErpAccess.HaveAccess('1b971fe2-aedd-4894-95df-8c30e1ed9c44'),
          route: 'veiculos/tabelas/chassis'
        },
        carrocerias: {
          access: ErpAccess.HaveAccess('0413f86c-3f0f-4611-8768-a20d736194c8'),
          route: 'veiculos/tabelas/carrocerias'
        },
        marcas: {
          access: ErpAccess.HaveAccess('e28536f6-cd35-4ca2-911a-e369e6103471'),
          route: 'veiculos/tabelas/marcas'
        },
        modelos: {
          access: ErpAccess.HaveAccess('a9ee225c-be5f-4a4f-803f-4389a3efe041'),
          route: 'veiculos/tabelas/modelos'
        }
      },
      cadastros: {
        access: ErpAccess.HaveAccess('c8e4ac7d-f89b-4852-ab14-17bb52960018'),
        veiculos: {
          access: ErpAccess.HaveAccess('eadbe501-f0eb-4508-b344-2862cf597dd5'),
          route: 'veiculos/cadastros/veiculos'
        },
        motoristas: {
          access: ErpAccess.HaveAccess('fbb87ffe-9b42-438a-83ba-275990e63c7c'),
          route: 'cadastros/motoristas'
        }
      }
    },
    tabelas: {
      ocultar: HelperUtilsClass.NumberIsEqual(environment.userErp.config[ConfigSystemMapperClass.OCULTAR_MENU_TABELAS], 1),
      access: ErpAccess.HaveAccess('8207444e-1b9e-431c-96d5-957415dd86a1'),
      gerais: {
        access: ErpAccess.HaveAccess('5c0492fa-91e1-420b-9e3a-e493203429f7'),
        tiposContatos: {
          access: ErpAccess.HaveAccess('38b3144e-f4cc-4ac1-b7e3-ba919bae8d5c'),
          route: 'tabelas/gerais/tipos-contatos'
        },
        tiposDocumentos: {
          access: ErpAccess.HaveAccess('a5a15e06-7af8-411a-ad5b-735c140f7730'),
          route: 'tabelas/gerais/tipos-documentos'
        },
        sexos: {
          access: ErpAccess.HaveAccess('0e8db9af-0ba0-4dde-bbb9-f7e64931a3a1'),
          route: 'tabelas/gerais/sexos'
        },
        departamentos: {
          access: ErpAccess.HaveAccess('0cccde10-4dd4-41f1-a913-f8781169ac8a'),
          route: 'tabelas/gerais/departamentos'
        },
        bancos: {
          access: ErpAccess.HaveAccess('c45af6a7-a851-4555-a6ee-eab450f36cfc'),
          route: 'tabelas/gerais/bancos'
        },
        cores: {
          access: ErpAccess.HaveAccess('bf2ba7f7-dddf-4608-9232-0624347c2734'),
          route: 'tabelas/gerais/cores'
        }
      },
      diario: {
        access: ErpAccess.HaveAccess('377bb909-6f8f-4611-96d2-e8c0b572fb25'),
        assuntos: {
          access: ErpAccess.HaveAccess('cb030196-2be5-467d-ab15-2ae7274eb6c6'),
          route: 'tabelas/diario/assuntos'
        },
      },
      ceps: {
        access: ErpAccess.HaveAccess('28569e72-e556-4199-bfdb-9ffe06fb7ca2'),
        tiposEnderecos: {
          access: ErpAccess.HaveAccess('54995be2-7455-4a6c-abd8-5c11519c2844'),
          route: 'tabelas/cep/tipos-enderecos'
        },
        tiposLogradouros: {
          access: ErpAccess.HaveAccess('ee76c043-4b67-45f3-a79d-593023a1e5cb'),
          route: 'tabelas/cep/tipos-logradouros'
        },
        estados: {
          access: ErpAccess.HaveAccess('d93e596e-3081-4abe-bf30-08316233c5b4'),
          route: 'tabelas/cep/estados'
        },
        cidades: {
          access: ErpAccess.HaveAccess('467598f2-7018-40e7-9317-2bb67a43331b'),
          route: 'tabelas/cep/cidades'
        },
        ceps: {
          access: ErpAccess.HaveAccess('31731e04-cb33-432d-93a0-3d67924da4cf'),
          route: 'tabelas/cep/ceps'
        }
      }
    },
    cadastros: {
      access: ErpAccess.HaveAccess('c4148a8d-eb48-4287-a4c9-0165b6cb21cb'),
      entidades: {
        access: ErpAccess.HaveAccess('4bbb1898-547d-4cee-b03c-d8ed40900806'),
        route: 'cadastros/entidades'
      },
      fornecedores: {
        access: ErpAccess.HaveAccess('0d287481-913a-40d1-b978-ac18ce33a5eb'),
        route: 'cadastros/fornecedores'
      }
    },
    vendas: {
      access: ErpAccess.HaveAccess('c1ca23c1-3acc-40b6-ac83-14c302b6c1af'),
      tabelas: {
        ocultar: HelperUtilsClass.NumberIsEqual(environment.userErp.config[ConfigSystemMapperClass.OCULTAR_MENU_TABELAS], 1),
        access: ErpAccess.HaveAccess('8eaf16f9-8fe0-4451-85c9-e13679ffe75a'),
        servicos: {
          access: ErpAccess.HaveAccess('59672f14-2152-4527-a6bc-b690f2c16ef7'),
          route: 'vendas/tabelas/servicos'
        },
        motivos_cancelamento: {
          access: ErpAccess.HaveAccess('61b20851-bec1-47e3-8900-0aeeb4cacfef'),
          route: 'vendas/tabelas/motivos-cancelamento'
        }
      },
      cadastros: {
        access: ErpAccess.HaveAccess('f7042e06-16df-48ea-8ee6-98364530ed7b'),
        valores: {
          access: ErpAccess.HaveAccess('1f5b6e9b-bcf6-4964-931b-13c434d81e98'),
          route: 'vendas/cadastros/valores'
        },
        servicos: {
          access: ErpAccess.HaveAccess('0c4b6c7c-e45b-4944-a955-08d60b8c0dbb'),
          route: 'vendas/cadastros/servicos'
        },
        periodos: {
          access: ErpAccess.HaveAccess('152b524c-b65c-46cd-aad1-e2d1df024c4b'),
          route: 'vendas/cadastros/periodos'
        },
        vendas: {
          access: ErpAccess.HaveAccess('666cac06-c9f9-4cef-9661-1c57609de850'),
          route: 'vendas/cadastros/vendas'
        }
      }
    },
    financeiro: {
      access: ErpAccess.HaveAccess('4cfb20a8-8fc2-4f0a-a7c2-df55c0f1eff2'),
      tabelas: {
        ocultar: HelperUtilsClass.NumberIsEqual(environment.userErp.config[ConfigSystemMapperClass.OCULTAR_MENU_TABELAS], 1),
        access: ErpAccess.HaveAccess('bb51a8f8-637a-407c-92ad-18b274b1526e'),
        formasPagamento: {
          access: ErpAccess.HaveAccess('7c39256d-ce4d-43ed-a7b4-3bccaf85874d'),
          route: 'financeiro/tabelas/formas-pagamento'
        },
        tiposDespesas: {
          access: ErpAccess.HaveAccess('e62af493-d37a-4596-898b-d1388e2f3b0f'),
          route: 'financeiro/tabelas/tipos-despesas'
        }
      },
    },
    reportCorFidence: {
      access: ErpAccess.HaveAccess('fbacac72-6c63-4753-9105-5ff52be6dd10'),
      tabelas: {
        access: ErpAccess.HaveAccess('0bde0a7f-136f-4afa-98a7-39b8aa564f33'),
        route: 'relatorios/tabelas'
      },
      vendasEventuais: {
        access: ErpAccess.HaveAccess('f840de72-b9fb-4dbd-bd24-33695eb4c195'),
        multas: {
          access: ErpAccess.HaveAccess('a7b3f08a-7713-4091-a423-964d14ac71af'),
          route: 'relatorios/vendas-eventuais/multas'
        },
        realizadas: {
          access: ErpAccess.HaveAccess('2582a3ed-b1c1-4b48-93d2-6abbe22b3707'),
          route: 'relatorios/vendas-eventuais/realizadas'
        },
        orcamentosPerdidos: {
          access: ErpAccess.HaveAccess('a1784829-06eb-40db-bd62-d05c5d5e6ca3'),
          route: 'relatorios/vendas-eventuais/orcamentos-perdidos'
        },
        producaoHodometro: {
          access: ErpAccess.HaveAccess('c2e9781a-6a61-44f1-9699-1f081b39ef5a'),
          route: 'relatorios/vendas-eventuais/producao-hodometro'
        }
      },
      administrativo: {
        access: ErpAccess.HaveAccess('7d9c89ba-3f73-46ee-8970-348f42c8089e'),
        vencimentoCnh: {
          access: ErpAccess.HaveAccess('1ccb15ba-78a2-46a4-bdc4-71c38b33fcfc'),
          route: 'relatorios/administrativo/entidades/vencimento-cnh'
        },
        veiculosLicenciamento: {
          access: ErpAccess.HaveAccess('72598f84-8021-4a5a-a25e-d65cdce7d895'),
          route: 'relatorios/veiculos/licenciamento'
        }
      },
      financeiro: {
        access: ErpAccess.HaveAccess('164a4950-cf59-469f-aec3-80688339e2f0'),
        vendasEventuais: {
          access: ErpAccess.HaveAccess('77de3f91-1651-4cae-a69d-bbf8509b9578'),
          route: 'relatorios/financeiro/vendas-eventuais'
        }
      },
      entidades: {
        access: ErpAccess.HaveAccess('2248cd37-3fc3-4375-aea8-f0592d741242'),
        diario: {
          access: ErpAccess.HaveAccess('ef00cfe5-2a54-4865-b937-ac3843ebd9b9'),
          route: 'relatorios/entidades/diario'
        }
      }
    },
    sistema: {
      access: ErpAccess.HaveAccess('e5881d6f-bdea-4630-a8a9-dfba4dada808'),
      configSystem: {
        access: ErpAccess.HaveAccess('58897a13-6b08-41e5-94fd-bbb03fbc78fe'),
        route: 'sistema/configuracoes'
      },
      auditoria: {
        access: ErpAccess.HaveAccess('da4c3fb1-c782-482e-b8a7-188983182746'),
        route: 'sistema/auditoria'
      },
      acessos: {
        access: ErpAccess.HaveAccess('7ee19b86-7151-4f54-9dea-3fbe105b5908'),
        grupos: {
          access: ErpAccess.HaveAccess('206f94c2-7d21-4792-bcad-ee8de697577a'),
          route: 'sistema/grupos-acessos'
        },
        usuarios: {
          access: ErpAccess.HaveAccess('ba562c4d-d8a8-41c9-a72f-430d685f59ff'),
          route: 'sistema/usuarios-acessos'
        }
      }
    },
    dashboard: {
      access: ErpAccess.HaveAccess('6c0b7f17-b1c3-403e-bdef-7fc37507ae86'),
      vendas_eventuais: {
        access: ErpAccess.HaveAccess('56a23add-4d95-4668-b753-96d6d72ff813'),
      }
    }
  });
}

export class MenuController {

  private coreObservable: CoreObservableService = inject(CoreObservableService);
  private destroy$ = new Subject<void>();
  public coreRouter: CoreRouterService = inject(CoreRouterService);

  public pbClienteLogado = signal<boolean>(false);
  public haveAccessTabelas = signal<any>(null);
  public haveAccessCadastros = signal<any>(null);
  public haveAccessVeiculos = signal<any>(null);
  public haveAccessVendas = signal<any>(null);
  public haveAccessFinanceiro = signal<any>(null);
  public haveAccessSistema = signal<any>(null);
  public haveAccessDashBoard = signal<any>(null);
  public haveAccessReportCorFidence = signal<any>(null);

  constructor() {
    this.coreObservable.GetClienteLogado()
      .pipe(takeUntil(this.destroy$))
      .subscribe((clienteLogado: boolean) => {
        this.pbClienteLogado.set(clienteLogado);
        if (this.pbClienteLogado()) {
          this.haveAccessTabelas.set(HaveAccess().tabelas);
          this.haveAccessCadastros.set(HaveAccess().cadastros);
          this.haveAccessVeiculos.set(HaveAccess().veiculos);
          this.haveAccessVendas.set(HaveAccess().vendas);
          this.haveAccessFinanceiro.set(HaveAccess().financeiro);
          this.haveAccessSistema.set(HaveAccess().sistema);
          this.haveAccessDashBoard.set(HaveAccess().dashboard);
          this.haveAccessReportCorFidence.set(HaveAccess().reportCorFidence);
        }
      });
  }


  public NavigateTo(rote: string, pUserConn: boolean, pReplaceUrl: boolean = false) {
    this.coreRouter.ToNavigateTo(rote, pUserConn, pReplaceUrl);
  }

  public ToNewPage(): void {
    this.coreRouter.ToNavigateToNewTab('agenda');
  }

  public Finalize(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}