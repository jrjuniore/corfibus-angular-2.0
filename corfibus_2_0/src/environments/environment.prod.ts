interface IUserErp {
  userConnected: boolean;
  iInfoEmpresa: any;
  iInfoLogin: any;
  config: any;
  userAccess: any[],
  erpVersion: string,
  apiErp: string,
  mainUrl: string
}

export const environment = {
  production: true,
  formatDatePicker: {
    parse: {
      dateInput: 'DD/MM/YYYY'
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMMYYYY',
      monthLabel: 'MMMM'
    },
  },
  apiErp: 'https://api.corfibus.com.br:4400/',
  siteErp: 'https://www.corfibus.com.br/',
  userErp: {
    userConnected: false,
    iInfoEmpresa: null,
    iInfoLogin: null,
    config: null,
    userAccess: [],
    erpVersion: '',
    apiErp: '',
    mainUrl: ''
  } as IUserErp
};
