import { add } from '@ckeditor/ckeditor5-utils/src/translation-service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ComboData } from 'app/models/combo';
import { Abonado } from 'app/models/mantenimiento/abonado';
import { Pais } from 'app/models/pais';
import { ComboService } from 'app/services/combo.service';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';
import { PaisService } from 'app/services/pais.service';
import { Observable, map, startWith } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-generales-abonado',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.scss']
})
export class DatosGeneralesAbonadoComponent implements OnInit {

  //DATOS GENERALES
  id = 0
  code = ""

  idContinent = 0

  countryAbonado : Pais = {
    id : 0,
    valor : "",
    bandera : ""
  }
  idCountry = 0

  city = ""
  incomeDate = ""
  incomeDateD : Date | null = null
  name = ""
  acronym = ""
  address = ""
  language = ""
  telephone = ""
  fax = ""
  email = ""
  webPage = ""
  principalContact = ""
  idRubro = 0
  taxRegistration = ""
  sendReportToName = ""
  sendReportToTelephone = ""
  sendReportToEmail = ""
  sendInvoiceToName = ""
  sendInvoiceToTelephone = ""
  sendInvoiceToEmail = ""
  additionalContactName = ""
  additionalContactTelephone = ""
  additionalContactEmail = ""
  observations = ""
  indications = ""
  maximumCredit = false
  revealName = false
  subscriberType = ""
  idCurrency = 0
  facturationType = ""
  normalPrice = false

  continentes : ComboData[] = []

  controlPaises = new FormControl<string | Pais>('')
  paises: Pais[] = []
  filterPais: Observable<Pais[]>
  msgPais = ""
  colorMsgPais = "red"
  iconoSeleccionado = ""

  abonadoActual : Abonado[] = []
  abonadoModificado : Abonado[] = []

  constructor(private cdr: ChangeDetectorRef,private router : Router, private activatedRoute: ActivatedRoute, private paisService : PaisService, private comboService : ComboService, private abonadoService : AbonadoService){
    this.filterPais = new Observable<Pais[]>()
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.id = 0
    } else {
      this.id = parseInt(id + '')
    }
  }
  ngOnInit(): void {
    if(this.id > 0){
      this.comboService.getContinentes().subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.continentes = response.data
          }
        }
      ).add(
        () => {
          this.abonadoService.getAbonadoPorId(this.id).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                console.log(response.data)
                const abonado = response.data
                if(abonado){
                  this.code = abonado.code
                  this.idContinent = abonado.idContinent
                  this.comboService.getPaisesPorContinente(this.idContinent).subscribe(
                    (response) => {
                      if(response.isSuccess === true && response.isWarning === false){
                        this.paises = []
                        this.paises = response.data
                      }
                    }
                  ).add(
                    () => {
                      if(abonado.idCountry > 0 || abonado.idCountry !== null){
                        this.idCountry = abonado.idCountry
                        console.log(this.paises)
                        this.countryAbonado = this.paises.filter(x => x.id === abonado.idCountry)[0]
                      }else{
                        this.idCountry = 0
                      }
                    }
                  )
                  this.city = abonado.city
                  this.incomeDate = abonado.startDate
                  if(this.incomeDate !== "" && this.incomeDate !== null){
                    const fecha = this.incomeDate.split("/")
                    if(fecha.length > 0){
                      this.incomeDateD = new Date(parseInt(fecha[2]),parseInt(fecha[1]),parseInt(fecha[0]))
                    }else{
                      this.incomeDateD = null
                    }
                  }
                  this.name = abonado.name
                  this.acronym = abonado.acronym
                  this.address = abonado.address
                  this.language = abonado.language
                  this.telephone = abonado.telephone
                  this.fax = abonado.fax
                  this.email = abonado.email
                  this.webPage = abonado.webPage
                  this.principalContact = abonado.principalContact
                  this.idRubro = abonado.idRubro

                  this.taxRegistration = abonado.taxRegistration
                  this.sendReportToName = abonado.sendInvoiceToName
                  this.sendReportToTelephone = abonado.sendReportToTelephone
                  this.sendReportToEmail = abonado.sendReportToEmail
                  this.sendInvoiceToName = abonado.sendInvoiceToName
                  this.sendInvoiceToTelephone = abonado.sendInvoiceToTelephone
                  this.sendInvoiceToEmail = abonado.sendInvoiceToEmail
                  this.additionalContactName = abonado.additionalContactName
                  this.additionalContactTelephone = abonado.additionalContactTelephone
                  this.additionalContactEmail = abonado.additionalContactEmail
                  this.observations = abonado.observations
                  this.indications = abonado.indications
                  this.maximumCredit = abonado.maximumCredit
                  this.revealName = abonado.revealName
                  this.subscriberType = abonado.subscriberType
                  this.idCurrency = abonado.idCurrency
                  this.facturationType = abonado.facturationType
                  this.normalPrice = abonado.normalPrice
                  this.armarModeloActual()
                  this.armarModeloModificado()
                }
              }
            }
          )
        }
      )
    }else{
      this.comboService.getContinentes().subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.continentes = response.data
          }
        }
      )
    }


    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )
  }

  selectContinente(idContinent : number){
    this.comboService.getPaisesPorContinente(this.idContinent).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.paises = []
          this.paises = response.data
          console.log(response.data)
          this.limpiarSeleccionPais()
        }
      }
    )
  }
  cambioPais(pais: Pais) {
    console.log(pais)
    if (typeof pais === 'string' || pais === null || this.countryAbonado.id === 0) {
      this.msgPais = "Seleccione una opción."
      this.colorMsgPais = "red"
      this.iconoSeleccionado = ""
      this.idCountry = 0
    } else {
      this.msgPais = "Opción Seleccionada"
      this.colorMsgPais = "green"
      this.iconoSeleccionado = pais.bandera
      this.idCountry = pais.id
    }
    console.log(this.idCountry)
  }
  limpiarSeleccionPais() {
    this.controlPaises.reset();
    this.idCountry = 0
    this.iconoSeleccionado = ""
  }
  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  displayPais(pais: Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }

  selectFechaIngreso(event: MatDatepickerInputEvent<Date>) {
    this.incomeDateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.incomeDate = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  armarModeloActual(){
    this.abonadoActual[0] = {
      id : this.id,
      code : this.code,
      idContinent : this.idContinent,
      idCountry : this.idCountry,
      city : this.city,
      startDate : this.incomeDate,
      name : this.name,
      acronym : this.acronym,
      address : this.address,
      language : this.language,
      telephone : this.telephone,
      fax : this.fax,
      email : this.email,
      webPage : this.webPage,
      principalContact : this.principalContact,
      idRubro : this.idRubro,
      taxRegistration : this.taxRegistration,
      sendReportToName : this.sendReportToName,
      sendReportToTelephone : this.sendReportToTelephone,
      sendReportToEmail : this.sendReportToEmail,
      sendInvoiceToName : this.sendInvoiceToName,
      sendInvoiceToTelephone : this.sendInvoiceToTelephone,
      sendInvoiceToEmail : this.sendInvoiceToEmail,
      additionalContactName : this.additionalContactName,
      additionalContactTelephone : this.additionalContactTelephone,
      additionalContactEmail : this.additionalContactEmail,
      observations : this.observations,
      indications : this.indications,
      maximumCredit : this.maximumCredit,
      revealName : this.revealName,
      subscriberType : this.subscriberType,
      idCurrency : this.idCurrency,
      facturationType : this.facturationType,
      normalPrice : this.normalPrice,
      enable : true
    }
  }
  armarModeloModificado(){
    this.abonadoModificado[0] = {
      id : this.id,
      code : this.code,
      idContinent : this.idContinent,
      idCountry : this.idCountry,
      city : this.city,
      startDate : this.incomeDate,
      name : this.name,
      acronym : this.acronym,
      address : this.address,
      language : this.language,
      telephone : this.telephone,
      fax : this.fax,
      email : this.email,
      webPage : this.webPage,
      principalContact : this.principalContact,
      idRubro : this.idRubro,
      taxRegistration : this.taxRegistration,
      sendReportToName : this.sendReportToName,
      sendReportToTelephone : this.sendReportToTelephone,
      sendReportToEmail : this.sendReportToEmail,
      sendInvoiceToName : this.sendInvoiceToName,
      sendInvoiceToTelephone : this.sendInvoiceToTelephone,
      sendInvoiceToEmail : this.sendInvoiceToEmail,
      additionalContactName : this.additionalContactName,
      additionalContactTelephone : this.additionalContactTelephone,
      additionalContactEmail : this.additionalContactEmail,
      observations : this.observations,
      indications : this.indications,
      maximumCredit : this.maximumCredit,
      revealName : this.revealName,
      subscriberType : this.subscriberType,
      idCurrency : this.idCurrency,
      facturationType : this.facturationType,
      normalPrice : this.normalPrice,
      enable : true
    }
  }
  guardar(){
    this.armarModeloModificado()
    if(this.id > 0){
      Swal.fire({
        title: '¿Está seguro de guardar los cambios?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {
          console.log(this.abonadoModificado[0])
          const paginaDetalleAbonado = document.getElementById('pagina-detalle-abonado') as HTMLElement | null;
          if(paginaDetalleAbonado){
            paginaDetalleAbonado.classList.remove('hide-loader');
          }
          this.abonadoService.addAbonado(this.abonadoModificado[0]).subscribe((response) => {
          if(response.isSuccess === true && response.isWarning === false){
            if(paginaDetalleAbonado){
              paginaDetalleAbonado.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Se guardaron los cambios correctamente',
              text: "",
              icon: 'success',
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto: true
            })
            // const busqueda = JSON.parse(localStorage.getItem('busquedaEmpresas')+'');
            // busqueda.razonSocial = this.name;
            // busqueda.idPais = this.idCountry;
            // localStorage.setItem('busquedaEmpresas', JSON.stringify(busqueda));
            this.router.navigate(['mantenimiento/abonado/detalle/'+this.id]);
            this.armarModeloActual();
          }else{
            if(paginaDetalleAbonado){
              paginaDetalleAbonado.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Ocurrió un problema.',
              text: 'Comunicarse con Sistemas',
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto : true
            }).then(() => {
            })
          }
          if(paginaDetalleAbonado){
            paginaDetalleAbonado.classList.add('hide-loader');
          }
        })
        }
      });
    }else{
      Swal.fire({
        title: '¿Está seguro de agregar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {

          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          this.abonadoService.addAbonado(this.abonadoModificado[0]).subscribe((response) => {
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.remove('hide-loader');
            }
            if(response.isSuccess === true && response.isWarning === false){
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
              }
              Swal.fire({
                title: 'Se agregó el registro correctamente',
                text: "",
                icon: 'success',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto: true
              })
              // const busqueda = JSON.parse(localStorage.getItem('busquedaEmpresas')+'');
              // busqueda.razonSocial = this.name;
              // busqueda.idPais = this.idCountry;
              // localStorage.setItem('busquedaEmpresas', JSON.stringify(busqueda));

              this.router.navigate(['mantenimiento/abonado/detalle/'+response.data]);
              this.armarModeloActual()
            }else{
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
              }
              Swal.fire({
                title: 'Ocurrió un problema.',
                text: 'Comunicarse con Sistemas',
                icon: 'warning',
                confirmButtonColor: 'blue',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto : true
              }).then(() => {
              })
            }
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.add('hide-loader');
            }
            console.log(response)
          }, (error) => {
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Ocurrió un problema. Comunicarse con Sistemas',
              text: error,
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto : true
            }).then(() => {
            })
          })
        }
      });
    }
    console.log(this.abonadoModificado)
  }
  salir(){
    Swal.fire({
      title: '¿Está seguro de salir?',
      text: "Los datos ingresados no se guardarán",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '30rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['mantenimiento/abonado/lista'])
      }
    })
  }
}
