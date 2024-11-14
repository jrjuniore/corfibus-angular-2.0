import { HelperUtilsClass } from "../../../../share/class-utils/helper-utils.class";
import { LibraryUtilsClass } from "../../../../share/class-utils/library-utils.class";
import { IMessage } from "./message.interface";
import { DescEnumTypeMessage, EnumTypeMessage } from "./type-message.enum";

export class MessageUtilsClass {

  static timer: any;

  static NewMessageInfo(message: string): IMessage {
    return this.NewMessage(EnumTypeMessage.info, message);
  }

  static NewMessageError(message: string): IMessage {
    return this.NewMessage(EnumTypeMessage.error, message);
  }

  static NewMessageWarning(message: string): IMessage {
    return this.NewMessage(EnumTypeMessage.warning, message);
  }

  static NewMessageSuccess(message: string): IMessage {
    return this.NewMessage(EnumTypeMessage.success, message);
  }

  static NewMessageRecordSaveSuccess(): IMessage {
    return this.NewMessage(EnumTypeMessage.success, 'Registro salvo com sucesso');
  }

  static NewMessageNoRecordToPrint(): IMessage {
    return this.NewMessage(EnumTypeMessage.success, 'Não há registros para impressão');
  }

  static NewMessageRecordDeleteSuccess(): IMessage {
    return this.NewMessage(EnumTypeMessage.success, 'Registro excluído com sucesso');
  }

  static NewMessageNenhumRegistroEncontrado(): IMessage {
    return this.NewMessage(EnumTypeMessage.warning, 'Nenhum registro foi encontrado');
  }

  static NewMessageFormInvalid(): IMessage {
    return this.NewMessage(EnumTypeMessage.warning, 'Formulário com erro! Verifique as mensagens');
  }

  static ShowAlerts(listMessages: IMessage[], title?: string, miliSeconds: number = 3000, execFunc?: Function): void {

    clearInterval(this.timer);

    //Criando as mensagens
    this.CreateMessages(listMessages, title);

    //Exibindo a mensagem
    this.ShowMessage(true);

    //Hidding Message
    this.timer = setTimeout(() => {
      this.ShowMessage(false);

      if (execFunc)
        execFunc();

    }, miliSeconds);
  }

  //pObject -> São as mensagens oriundas do backend
  static NoMessagesFromBackEnd(pObject: any, pTitleErrors: string): boolean {
    //pObject está vazio ou
    //pObject.errors está com a lista vazia
    let _result: boolean = (
      HelperUtilsClass.ObjectIsEmpty(pObject) ||
      HelperUtilsClass.ObjectIsEmpty(pObject.errors)
    );

    //se _result for false, exibir os erros, ou seja, há erros a serem tratados
    if (!_result) {
      let lstMessage: IMessage[] = [];
      //errors contém as listas dos erros
      Object.keys(pObject.errors).forEach((key: string) => {
        pObject.errors[key].forEach((error: string) => {
          lstMessage.push(MessageUtilsClass.NewMessageError(error))
        });
      });

      this.ShowAlerts(lstMessage, pTitleErrors);
    }

    return _result;
  }

  //pObject -> Objeto que implementar FormControl
  static NoMessagesFromFrontEnd(pObject: any, pTitleErrors: string): boolean {
    //pObject está vazio ou
    //pObject.errors está com a lista vazia
    let _result: boolean = (
      HelperUtilsClass.ObjectIsEmpty(pObject) ||
      HelperUtilsClass.ObjectIsEmpty(pObject.errors)
    );

    //se _result for false, exibir os erros, ou seja, há erros a serem tratados
    if (!_result) {
      let lstMessage: IMessage[] = [];
      //errors contém as listas dos erros
      Object.keys(pObject.errors).forEach((key: string) => {
        pObject.errors[key].forEach((error: string) => {
          lstMessage.push(MessageUtilsClass.NewMessageError(error))
        });
      });

      this.ShowAlerts(lstMessage, pTitleErrors);
    }

    return _result;
  }

  static ShowMessage(pShow?: boolean): void {

    document.querySelector("#web202209050704")?.classList.remove('form-message-fadeOut');
    document.querySelector("#web202209050704")?.classList.remove('form-message-fadeIn');

    if (pShow)
      document.querySelector("#web202209050704")?.classList.add('form-message-fadeIn');
    else
      document.querySelector("#web202209050704")?.classList.add('form-message-fadeOut');
  }

  static NewMessage(enumTypeMessage: EnumTypeMessage, message: string): IMessage {
    let result: IMessage = {
      idMessage: LibraryUtilsClass.NewId(),
      typeMessage: enumTypeMessage,
      message: message
    };

    return result;
  }

  static CreateMessages(pListMessage: IMessage[], pTitle?: string) {
    let divMessage: HTMLDivElement = <HTMLDivElement>document.querySelector("#web202209050846");
    divMessage.innerHTML = '';

    //Lista não está vazia
    if (!HelperUtilsClass.ListIsEmpty(pListMessage))
      for (let message of pListMessage) {
        divMessage.append(this.CreateAlert(message, pTitle));
      }
  }

  static CreateAlert(pMessage: IMessage, pTitle?: string): HTMLDivElement {
    let result: HTMLDivElement = document.createElement('div');
    let tagMessage: HTMLElement = document.createElement('p');
    let tagI: HTMLElement = document.createElement('i');
    let tagTitle: HTMLElement = document.createElement('h5');

    result.innerHTML = '';
    tagTitle.innerHTML = '';
    tagMessage.innerHTML = '';
    tagI.innerHTML = '';

    //Adicionando o ícone à mensagem
    tagI.className = 'fa-solid me-1 ';
    tagI.className +=
      pMessage.typeMessage === EnumTypeMessage.warning ? 'fa-triangle-exclamation text-warning'
        : pMessage.typeMessage === EnumTypeMessage.error ? 'fa-circle-xmark text-danger'
          : pMessage.typeMessage === EnumTypeMessage.info ? 'fa-circle-info text-info'
            : 'fa-circle-check text-success';

    tagMessage.append(tagI);

    tagMessage.className = 'm-0 jrrb-font-14px';
    tagMessage.append(pMessage.message);


    if (pTitle) {
      tagTitle.className = 'm-0 mb-2 jrrb-font-medium pb-1 border border-top-0 border-end-0 border-start-0 border-2 border-light';
      tagTitle.append(pTitle);
    }

    result.id = pMessage.idMessage;
    result.className = 'mx-2 alert mb-1 p-2 alert-';
    result.className += DescEnumTypeMessage.get(pMessage.typeMessage);

    result.append(tagTitle);
    result.append(tagMessage);

    return result;
  }


}