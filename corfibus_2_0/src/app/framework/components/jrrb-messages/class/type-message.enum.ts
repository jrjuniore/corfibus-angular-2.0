export enum EnumTypeMessage {
  info = 0,
  error = 1,
  warning = 2,
  success = 3
}

export const DescEnumTypeMessage = new Map<number, string>([
  [EnumTypeMessage.info, 'info'],
  [EnumTypeMessage.error, 'danger'],
  [EnumTypeMessage.warning, 'warning'],
  [EnumTypeMessage.success, 'success']
]);
