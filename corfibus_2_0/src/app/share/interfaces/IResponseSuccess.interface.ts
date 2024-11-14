
export interface IResponseBackEnd {
  isError: boolean,
  mensagem: string,
  info: string
}

export interface IResponseBackEndErrors {
  errors: any,
  status: number,
  title: string
}