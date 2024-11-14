interface IUserErp {
  userConnected: boolean;
  iInfoEmpresa: any,
  iInfoLogin: any;
  config: any;
  userAccess: any[],
  erpVersion: string,
  apiErp: string,
  mainUrl: string
}

export const environment = {
  production: false,
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
  apiErp: 'http://localhost:5238/',
  siteErp: 'http://localhost:4200/',
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
