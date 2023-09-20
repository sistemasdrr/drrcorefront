import { Attachment } from "./attachment"
import { OrderDetail } from "./order-detail"
export interface Order {
  id: string
  Cupon: string
  Informe: string
  Tipo_informe: string
  Tipo_tramite : string
  Calidad: string
  Fecha_ingreso: string
  Fecha_vencimiento: string
  Fecha_descarga: string
  Estado: string
  hasComment : boolean
  comment : string
  hasAttachments : boolean
  attachments : Attachment[]
  detalle_pedido : OrderDetail

}
