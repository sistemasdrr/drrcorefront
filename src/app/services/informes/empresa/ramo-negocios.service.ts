import { Injectable } from '@angular/core';
import { RamoNegocios } from 'app/models/informes/empresa/ramo-negocios';

@Injectable({
  providedIn: 'root'
})
export class RamoNegociosService {

  private ramoNegocios : RamoNegocios[] = [
    {
      codigoInforme : 'E0000143232',

      sectorPrincipal : '1',
      ramoNegocio : 'Alimentos en General',
      actividadEspecifica : 'aceites-lacteos-galletas',

      importan : 'SI',
      paisesImportan : 'CHILE, PERU, PARAGUAY',
      paisesImportanIng : 'CHILE, PERU, PARAGUAY',
      exportan : 'NO',
      paisesExportan : 'paises exportan',
      paisesExportanIng : 'paises exportan ing',
      ventaContado : '40%',
      ventaContadoIng : '40%',
      ventaCredito : '60% | Plazos 15 días',
      ventaCreditoIng : '60% | Term 15 days',
      territorioVentas : ' | Mercado Nacional e Internacional',
      territorioVentasIng : ' | national and international market',
      ventaExterior : '10%',
      ventaExteriorIng : '10%',
      comprasNacionales : 'compras nacionales',
      comprasNacionalesIng : 'compras nacionales ing',
      comprasExterior : 'compras exterior',
      comprasExteriorIng : 'compras exterior ing',

      numTrabajadores : '150',
      titularidad : 'Propio Cancelado',
      areaTotal : 'area total',
      areaTotalIng : 'area total ing',
      domicilioAnterior : 'Calle Chincón 980, Urb. Jardín, San Isidro / Lima, 27 (Canceled on 25/01/2005)',
      otrosLocales : 'el domicilio legal ...',
      otrosLocalesIng : 'legal address ...',
      detalleActividad : 'Elaboracipon y comercializacion de productos...',
      detalleActividadIng : 'Elaboracipon y comercializacion de productos... ing',
      comentarioNegocio : 'Entre los productos que elaboran ...',
      comentarioNegocioIng : 'Entre los productos que elaboran ... ing',
      comentarioNegocioTabulado : 'comentario negocio tabulado'
    }
  ]

  constructor() {
  }

  getRamoNegocios(codigoInforme : string){
    return this.ramoNegocios.filter(emp => emp.codigoInforme === codigoInforme)
  }

  updateRamoNegocios(ramoNegocios : RamoNegocios){
    const index = this.ramoNegocios.findIndex(x => x.codigoInforme === ramoNegocios.codigoInforme);
    if (index !== -1) {
      this.ramoNegocios[index] = ramoNegocios;
    }else{
      console.log('No se encontro el informe.')
    }
  }
}
