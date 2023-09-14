export interface OrderDetail {
  credito_consultado: number;
  num_orden: number;
  revelar_nombre: string;
  numero_referencia: number;
  indicaciones_abonado: string;

  nombre_empresa : string;
  continente : string;
  pais : string;
  ciudad : string
  reg_tributario : string;
  direccion : string;
  telefono : string;
  correo : string
  fax : string
  tipo_tramite : string
  precio_informe: number
  tipo_informe: string
  fecha_informe: string
}
