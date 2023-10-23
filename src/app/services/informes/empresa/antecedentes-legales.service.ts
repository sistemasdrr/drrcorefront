import { Injectable } from '@angular/core';
import { AntecedentesLegales } from 'app/models/informes/empresa/antecendentes-legales';

@Injectable({
  providedIn: 'root'
})
export class AntecedentesLegalesService {

  private antecedentesLegales : AntecedentesLegales[] = []

  constructor() {
    this.antecedentesLegales = [
      {
        codigoInforme : 'E0000143232',
        fechaConstitucion : '',
        inicioActividades : '',
        duracion : '',
        duracionIng : '',
        registradaEn : '',
        registradaEnIng : '',
        notaria : '',
        registrosPublicos : '',
        registrosPublicosIng : '',

        monedaPais : '',
        monto : '',
        observacion : '',
        observacionIng : '',

        origen : '',
        fechaAumento : '',
        fechaAumentoIng : '',

        moneda : 'PERU - SOL',
        cotizada : '',
        por : '',
        actualTC : '3.23',
        actualTCIng : '',
        fechaUltimaConsultaRRPP : '',
        fechaUltimaConsultaPor : '',

        comentarioAntecedentesLegales : '',
        comentarioAntecedentesLegalesIng : '',
        comentarioHistoriaAntecedentes : '',
        comentarioHistoriaAntecedentesIng : '',
      },
      {
        codigoInforme : 'E0000406826',
        fechaConstitucion : '27/05/1976',
        inicioActividades : '',
        duracion : '',
        duracionIng : '99 years',
        registradaEn : '',
        registradaEnIng : '',
        notaria : '',
        registrosPublicos : '',
        registrosPublicosIng : '',

        monedaPais : 'BS',
        monto : '50,000,000',
        observacion : 'Bolívares',
        observacionIng : '',

        origen : '',
        fechaAumento : '',
        fechaAumentoIng : '30/09/2004',

        moneda : 'VENEZUELA - BOLIVAR',
        cotizada : 'NO',
        por : '',
        actualTC : 'Bs.2,657.10 por Dólar USA',
        actualTCIng : 'Bs.2,150 per US$1 Dollar',
        fechaUltimaConsultaRRPP : '',
        fechaUltimaConsultaPor : '',

        comentarioAntecedentesLegales : '',
        comentarioAntecedentesLegalesIng : '',
        comentarioHistoriaAntecedentes : 'La titular nace en el año 1981 para cubrir la propia demanda de producción de latas de aluminio de las empresas del Grupo POLAR.\n\nLa titular forma parte del denominado "GRUPO POLAR" conformado por todo un conglomerado de empresas que desarrollan actividades en los diferentes campos de la industria y el comercio.\nSu origen se remonta a la creación de Cervecería Polar CA en 1941, con una pequeña planta en el Oeste de Caracas.',
        comentarioHistoriaAntecedentesIng : 'FOUNDERS: Inversiones Polar Ca and Cervecería Nacional SAICA\n\nIn 1978, the company Reynolds International NV (from Curacao)  became a Shareholder.\nIn June 1998, Inversora Polar CA sold its shares to Cervecería Polar del Centro CA.\nDate of the transfer of shares to the actual shareholder is unknown.\nIn May 2003, the Group restructured in the beer segment by merging 11 related firms with Cervecería Polar which merged said companies and stayed as survivor company.  Some of the companies merged and dissolved are Cervecería Modelo CA, Cervecería Polar del Centro CA, Cervecería Polar de Oriente CA, Cervecería Polar del Lago CA, Distribuidora Polar Metropolitana SA.',
      },
    ]
   }

  getAntecedentesLegales(codigoInforme : string){
    return this.antecedentesLegales.filter(emp => emp.codigoInforme === codigoInforme)
  }

  updateAntecedentesLegales(antecedentesLegales : AntecedentesLegales){
    const index = this.antecedentesLegales.findIndex(x => x.codigoInforme === antecedentesLegales.codigoInforme);
    if (index !== -1) {
      this.antecedentesLegales[index] = antecedentesLegales;
    }else{
      console.log('No se encontro el informe.')
    }
  }
}
