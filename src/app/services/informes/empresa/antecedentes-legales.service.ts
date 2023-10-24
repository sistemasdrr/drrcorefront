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
        fechaConstitucion : '10/10/1967',
        inicioActividades : '14/10/1967',
        duracion : 'Indefinida',
        duracionIng : 'Indefinite',
        registradaEn : 'Lima',
        registradaEnIng : 'Lima',
        notaria : '',
        registrosPublicos : 'Partida Electrónica 11012496.',
        registrosPublicosIng : 'Electronic Entry 11012496.',

        monedaPais : 'PEN',
        monto : '15,902,518',
        observacion : 'Soles',
        observacionIng : '',

        origen : 'Nacional',
        fechaAumento : '01/10/2021',
        fechaAumentoIng : '01/10/2021',

        moneda : 'PERU - SOL',
        cotizada : 'NO',
        por : 'Por Capitalización',
        actualTC : 'PEN | 3.57 | Soles',
        actualTCIng : 'PEN | 3.57 | Soles',
        fechaUltimaConsultaRRPP : '',
        fechaUltimaConsultaPor : '',

        comentarioAntecedentesLegales : 'El 28 de junio 2021 se registra en el Asiento B00010 Por escritura pública del 21/12/2020 y su aclaratoria del 15/02/2021 otorgadas ante notario de Lima Carola Cecilia Hidalgo Moran, y por Junta obligatoria de accionistas del 01/07/2020 y su reapertura el 07/12/2020, se acordó Aumentar el capital social, mediante capitalización del resultado por exposición a la inflación. \nEn consecuencia, el capital social es de S/ 16,933,836.00 representado por el mismo número de acciones comunes nominativas de un valor nominal de S/ 1.00 cada una, íntegramente suscritas y pagadas.\nAsimismo se acordó aprobar que el número de Directores para el período 2020-2023, sea de 5 miembros y 1 suplente.\n\nEl 01 de octubre 2021 se registra en el Asiento B00011, Por escritura pública del 08/09/2021 otorgada ante notario de Lima Jose Alfredo Paino Scarpati, y por junta general del 11/12/2021 se acordó aprobar la Escisión Parcial del patrimonio de la sociedad del rubro y transferir un bloque patrimonial a favor de la sociedad Inmobiliaria Cintac Perú S.A..\nEn consecuencia, se acuerda reducir el capital social en la suma de S/ 1,031,318.00 Soles, quedando el capital social de la titular en la suma de S/ 15,902,518.00, representado por 15,902,518 acciones comunes y nominativas de un valor nominal de S/ 1.00 cada una, íntegramente suscritas y pagadas.\nLa fecha de entrada en vigencia de la escisión es el 11 de diciembre 2020.\n\nNo se obtuvo la composición accionaria de la empresa por medio de fuentes directas ni externas.\n\nAnte SUNAT, la titular:\nEs Emisor Electrónico desde el 29/09/2015 (Facturas) desde el 30/09/2015 (Boletas)\nEstá Afiliada a la PLE - Planilla Electrónica desde el 01/01/2013.\n\n- Incorporada al Régimen de Agentes de Retención del IGV (R.S.037-2003) a partir del 01/06/2002.\n- Incorporada al Régimen de Agentes de Percepción del IGV - Venta Interna (R.S.058-2006) a partir del 01/04/2006.',
        comentarioAntecedentesLegalesIng : 'On June 28, 2021, under Record B00010 and by Notarial Act dated 21/12/2020 and amendment dated 15/02/2021, executed before Notary Public of Lima, Carola Cecilia Hidalgo Moran, and according to the General Shareholders Meeting held on 01/07/2020 and reopening dated 07/12/2020, it was resolved to increase the capital stock by capitalization of result from exposure to inflation.\nConsequently, the capital stock amounts to S/.16,933,836.00 Soles represented by the same number of common registered shares at a nominal value of S/.1.00 Sol, each, fully subscribed and paid-in.\nFurthermore, it was resolved to approve the number of Directors for the period 2020-2023, of five members and one Alternate Director.\n\n\nOn October 1st, 2021 Record B00011 was registered and by Notarial Act dated 08/09/2021 executed before Notary Public of Lima, Jose Alfredo Paino Scarpati, and according to the General Shareholders’ Meeting held on 11/12/2021, it was resolved to split partially the investigated Company and transfer a block of shares in favor of Inmobiliaria Cintac Perú S.A..\nConsequently, it was resolved to reduce the capital in the sum of S/.1,031,318.00 Soles, the capital remaining in S/.15,902,518.00, represented by 15,902,518 common and registered shares at a value of S/.1.00 Sol, fully subscribed and paid-in.\nThe spin off entered into force on December 11, 2020.\n\nIt was not possible to get the shareholding structure neither direct nor from external sources.\n\n\nAccording to SUNAT (National Tax Authority):\nThe Company issues electronic invoices since 29/09/2015.\nThe Company issues sales slips since 30/09/2015.\nPLE (Electronic Payroll) affiliate since: 01/01/2013\n\nIncorporated into the System of Tax Withholding Agent (R.S.037-2003) since 01/06/2002.\nIncorporated into the System of Tax Collection Agent - Internal Sales R.S.058-2006) since 01/04/2006',
        comentarioHistoriaAntecedentes : 'Actualmente forma parte del GRUPO CINTAC\n\nTubos y Perfiles Metálicos S.A. (TUPEMESA), es la principal empresa fabricante de productos tubulares del Perú. Desde su fundación viene operando con éxito en el mercado los productos tubulares de acero  y que a contar de 1,996 pasa a formar parte de un importante grupo internacional líder en la Región Sudamericana en la producción y comercialización de productos de acero conformados en frío\n\nDebido a este hecho, le ha permitido realizar a la fecha importantes inversiones para aumentar su capacidad de producción para hacerla mas competitiva con la que hoy en día Tupemesa se ha consolidado como uno de los principales actores del mercado en que participa, alcanzando una participación de mercado del 42%.\n\nTubos y Perfiles Metálicos S.A. ha sido reconocida a principios del año 2,003 con el ISO 9001:2000, un Standard Internacional de normas que garantizan la calidad de todos sus procesos y productos.\n\nEsta Certificación, exige que todos sus procesos estén documentados y registrados para poder ser auditados. Ello ha requerido, no solo de una gran inversión, sino de un compromiso permanente con la excelencia, para poder cumplir con los altos estándares de calidad internacionales.\n\nForma parte del Grupo CAP S.A. el principal grupo minero siderúrgico de Chile, el cual inicia operaciones en 1946 con Compañía de Aceros del Pacífico S.A. presidido por Juan Antonio Ríos, y con el transcurrir de los años ampliaron su territorio de operaciones instalando plantas de producción en Chile, Perú (TUPEESA) y Argentina (Tubos Argentinos, TASA)',
        comentarioHistoriaAntecedentesIng : 'At present Subject is a part of CINTAC GROUP.\n\nTubos y Perfiles Metálicos S.A. (TUPEMESA) is the main manufacturer of tubular products in Peru. Since it was founded, it has been operating successfully in the market for tubular steel products , and from 1,996  it became part of an important international group, leader in the South American Region in the production and commercialization of cold-formed steel products.\n\nThis has allowed it to make important investments to date to increase its production capacity to make it more competitive reason why today Tupemesa has consolidated as one of the main players in the market in which it participates, reaching a share of 42% of market.',
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
