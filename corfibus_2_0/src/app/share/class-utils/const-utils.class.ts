import { JrrbSelectTypeList } from "../../framework/components/jrrb-select/jrrb-select-list.type";

export class ConstUtilsClass {

  //Mensagens de erro
  static message_error_required = (pCaption: string): string => { return `Informe ${pCaption}` };
  static message_error_min = (pMin: number): string => { return `O mínimo ${pMin}` };
  static message_error_minlength = (pMinLength: number): string => { return `No mínimo ${pMinLength}` };
  static message_error_max = (pMax: number): string => { return `O máximo ${pMax}` };
  static message_error_maxlength = (pMaxLength: number): string => { return `No máximo ${pMaxLength}` };
  static message_error_invalid_email = (): string => { return 'Informe um e-mail válido' };
  static message_error_cpfValidator = (): string => { return 'Informe um CPF válido' };
  static message_error_cnpjValidator = (): string => { return 'Informe um CNPJ válido' };
  static message_error_invalid_range = (): string => { return 'Informe um período de data válido' };
  static message_error_invalid_date = (): string => { return 'Informe uma data válida' };

  //Masks
  static mask_date = (): string => { return '00/00/0000' };
  static mask_number5 = (): string => { return '00000' };
  static mask_time = (): string => { return '00:00:00' };
  static mask_time_short = (): string => { return '00:00' };
  static mask_date_time = (): string => { return '00/00/0000 00:00:00' };
  static mask_cep = (): string => { return '00000-000' };
  static mask_phone = (): string => { return '(00) 0 0000-0000' };
  static mask_phone_with_ddd = (): string => { return '(00) 0000-0000' };
  static mask_phone_us = (): string => { return '(000) 000-0000' };
  static mask_mixed = (): string => { return 'AAA 000-S0S' };
  static mask_cpf = (): string => { return '000.000.000-00' };
  static mask_cnpj = (): string => { return '00.000.000/0000-00' };
  static mask_money = (): string => { return '000.000.000.000.000,00' };
  static mask_money2 = (): string => { return "09999,00" };
  static mask_ano_fabricacao = (): string => { return "9999" };
  static mask_ano_modelo = (): string => { return "9999" };
  static mask_renavam = (): string => { return "99999999999" };
  static mask_sete_digitos = (): string => { return "9999999" };
  static mask_number_dois_digitos = (): string => { return "99" };

  //Screen Width
  static width_sm = (): string => { return ('400px'); };
  static width_md = (): string => { return ('600px'); };
  static width_md2 = (): string => { return ('768px'); };
  static width_md3 = (): string => { return ('900px'); };
  static width_lg = (): string => { return ('1024px'); };
  static width_lg2 = (): string => { return ('1200px'); };
  static width_xl = (): string => { return ('1440px'); };
  static width_max = (): string => { return ('99vw'); };
  static height_max = (): string => { return ('99vh'); };
  static height_26_7rem = (): string => { return ('26.7rem'); };
  static dialogRef = (): any => {
    return ({
      disableClose: false,
      width: '100%',
      height: '100%'
    });
  };

  //Período
  static perido_data = (): JrrbSelectTypeList[] => {
    return ([
      { value: 0, caption: "7 DIAS" },
      { value: 1, caption: "15 DIAS" },
      { value: 2, caption: "30 DIAS" },
      { value: 3, caption: "45 DIAS" },
      { value: 4, caption: "60 DIAS" },
      { value: 5, caption: "75 DIAS" },
      { value: 6, caption: "90 DIAS" },
      { value: 7, caption: "PERSONALIZADO" }
    ]);
  }

  static meses_do_ano = (): JrrbSelectTypeList[] => {
    return ([
      { value: 1, caption: "Janeiro" },
      { value: 2, caption: "Fevereiro" },
      { value: 3, caption: "Março" },
      { value: 4, caption: "Abril" },
      { value: 5, caption: "Maio" },
      { value: 6, caption: "Junho" },
      { value: 7, caption: "Julho" },
      { value: 8, caption: "Agosto" },
      { value: 9, caption: "Setembro" },
      { value: 10, caption: "Outubro" },
      { value: 11, caption: "Novembro" },
      { value: 12, caption: "Dezembro" },
    ]);
  }

  static periodo_get_days = (pItemOfPeriodoData: number): number => {
    return (
      pItemOfPeriodoData == 0 ? 7 :
        pItemOfPeriodoData == 1 ? 15 :
          pItemOfPeriodoData == 2 ? 30 :
            pItemOfPeriodoData == 3 ? 45 :
              pItemOfPeriodoData == 4 ? 60 :
                pItemOfPeriodoData == 5 ? 75 :
                  pItemOfPeriodoData == 6 ? 90 : -1
    );
  };

  static day_of_week = (): JrrbSelectTypeList[] => {
    return ([
      { value: 0, caption: "Domingo" },
      { value: 1, caption: "Segunda-feira" },
      { value: 2, caption: "Terça-feira" },
      { value: 3, caption: "Quarta-feira" },
      { value: 4, caption: "Quinta-feira" },
      { value: 5, caption: "Sexta-feira" },
      { value: 6, caption: "Sábado" }
    ]);
  };

  static list_comand = (): JrrbSelectTypeList[] => {
    return ([
      { value: 0, caption: 'Insert' },
      { value: 1, caption: 'Update' },
      { value: 2, caption: 'Delete' }
    ]);
  };

  static pesqPor_Entidades = (): JrrbSelectTypeList[] => {
    return ([
      { value: 0, caption: 'CPF' },
      { value: 1, caption: 'Nome' },
      { value: 2, caption: 'RG' },
      { value: 3, caption: 'CNPJ' }
    ]);
  };

  static pesqPor_Veiculos = (): JrrbSelectTypeList[] => {
    return ([
      { value: 0, caption: 'Prefixo' },
      { value: 1, caption: 'Placa' },
      { value: 2, caption: 'Modelo' },
      { value: 3, caption: 'Renavan' }
    ]);
  };

  static pesqPor_EntidadesFornecedores = (): JrrbSelectTypeList[] => {
    return ([
      { value: 3, caption: 'CNPJ' },
      { value: 1, caption: 'Nome' }
    ]);
  };

  static pesqPor_EntidadesMotoristas = (): JrrbSelectTypeList[] => {
    return ([
      { value: 0, caption: 'CPF' },
      { value: 1, caption: 'Nome' }
    ]);
  };

  static opcao_SimNao = (): JrrbSelectTypeList[] => {
    return ([
      { value: 1, caption: 'Sim' },
      { value: 0, caption: 'Não' }
    ]);
  };

  static tipoPessoa_Fisica: number = 0;
  static tipoPessoa_Juridica: number = 1;
  static tiposPessoa_Entidades = (): JrrbSelectTypeList[] => {
    return ([
      { value: this.tipoPessoa_Fisica, caption: 'Pessoa Física' },
      { value: this.tipoPessoa_Juridica, caption: 'Pessoa Jurídica' }
    ]);
  };

  static aso_Entidades = (): JrrbSelectTypeList[] => {
    return ([
      { value: 0, caption: 'Admissional' },
      { value: 1, caption: 'Períodico' },
      { value: 2, caption: 'Retorno ao Trabalho' },
      { value: 3, caption: 'Mudança de Função' },
      { value: 4, caption: 'Demissional' }
    ]);
  };

  static sexo_Masculino: number = 0;
  static sexo_Feminino: number = 1;
  static sexo_NaoInformado: number = 9;
  static sexo_Entidades = (): JrrbSelectTypeList[] => {
    return ([
      { value: this.sexo_Masculino, caption: 'Masculino' },
      { value: this.sexo_Feminino, caption: 'Feminino' },
      { value: this.sexo_NaoInformado, caption: 'Não Informado' }
    ]);
  };

}