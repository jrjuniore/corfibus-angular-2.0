import { EnumTypeMessage } from './type-message.enum';

export interface IMessage {
  idMessage: string,
  message: string,
  typeMessage: EnumTypeMessage
}