import { ErpAccess } from "../../../share/class-utils/erp-access.class"
import { JrrbTablePermissionsType } from "../../../share/types/jrrb-table-permissions.type"

export const tiposDocumentosPermitions = (): JrrbTablePermissionsType => {
  return {
    haveAcessIncludeRecord: ErpAccess.HaveAccess('a0b4106a-51e0-462f-955a-5c002462b55c'),
    haveAcessEditRecord: ErpAccess.HaveAccess('692dcdb5-bb98-41c3-ad5a-e5a322dd87c7'),
    haveAcessDeleteRecord: ErpAccess.HaveAccess('847cbe95-efe4-4c16-893c-e39d17c508a2'),
    haveAcessVisualizeRecord: ErpAccess.HaveAccess('ea02db5c-f76d-4e67-b98f-b9ee90de894a'),
    haveAcessLogRecord: ErpAccess.HaveAccess('059fc146-00d2-4d20-9e57-2b1767329a7f')
  }
}
