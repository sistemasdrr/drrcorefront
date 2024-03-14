import { ComboService } from 'app/services/combo.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComboData } from 'app/models/combo';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Pais } from 'app/models/combo';
import { PrecioAbonado } from 'app/models/mantenimiento/abonado';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AbonadoService } from 'app/services/mantenimiento/abonado.service';

@Component({
  selector: 'app-agregar-editar',
  templateUrl: './agregar-editar.component.html',
  styleUrls: ['./agregar-editar.component.scss']
})
export class AgregarEditarPrecioAbonadoComponent implements OnInit {

  titulo = ""
  accion = ""

  //FORM
  id = 0
  idSubscriber = 0
  date = ""
  dateD : Date | null = null
  idContinent = 0
  idCountry = 0
  countryPrecio : Pais = {
    id: 0,
    valor: '',
    bandera: '',
    regtrib: '',
    codCel: '',
  }
  idCurrency = 0
  priceT1 = 0
  dayT1 = 0
  priceT2 = 0
  dayT2 = 0
  priceT3 = 0
  dayT3 = 0
  priceB = 0

  Precio : PrecioAbonado[] = []

  continentes : ComboData[] = []

  controlPaises = new FormControl<string | Pais>('')
  paises: Pais[] = []
  filterPais: Observable<Pais[]>
  msgPais = ""
  colorMsgPais = ""
  iconoSeleccionado = ""

  constructor(private abonadoService : AbonadoService, private activatedRoute : ActivatedRoute,public dialogRef: MatDialogRef<AgregarEditarPrecioAbonadoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private comboService : ComboService){
    if(data){
      this.id = data.id

      this.idSubscriber = data.idSubscriber
      console.log(this.id)
    }
    this.filterPais = new Observable<Pais[]>
  }
  ngOnInit(): void {
    this.comboService.getContinentes().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.continentes = response.data
        }
      }
    )
    if(this.id > 0){
      this.titulo = "Editar Precio"
      this.abonadoService.getPrecioPorId(this.id).subscribe(
        (response) => {
          console.log(response)
          if(response.isSuccess === true && response.isWarning === false){
            const precioAbonado = response.data
            if(precioAbonado){
              this.date = precioAbonado.date
              if(this.date !== "" && this.date !== null){
                const fecha = this.date.split("/")
                if(fecha.length > 0){
                  this.dateD = new Date(parseInt(fecha[2]),parseInt(fecha[1]),parseInt(fecha[0]))
                }else{
                  this.dateD = null
                }
              }
              this.idContinent = precioAbonado.idContinent
              this.idCountry = precioAbonado.idCountry
              this.comboService.getPaisesPorContinente(this.idContinent).subscribe(
                (response) => {
                  if(response.isSuccess === true && response.isWarning === false){
                    this.paises = []
                    this.paises = response.data
                    this.limpiarSeleccionPais()
                  }
                }
              ).add(
                () => {
                  if(precioAbonado.idCountry > 0 || precioAbonado.idCountry !== null){
                    this.idCountry = precioAbonado.idCountry
                    this.countryPrecio = this.paises.filter(x => x.id === precioAbonado.idCountry)[0]
                  }else{
                    this.idCountry = 0
                  }
                }
              )
              this.idCurrency = precioAbonado.idCurrency
              this.priceT1 = precioAbonado.priceT1
              this.dayT1 = precioAbonado.dayT1
              this.priceT2 = precioAbonado.priceT2
              this.dayT2 = precioAbonado.dayT2
              this.priceT3 = precioAbonado.priceT3
              this.dayT3 = precioAbonado.dayT3
              this.priceB = precioAbonado.priceB
            }
          }
        }
      ).add(
        () => {
          this.countryPrecio = this.paises.filter(x => x.id === this.idCountry)[0]
        }
      )
    }else{
      this.titulo = "Agregar Precio"
    }

    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    )
  }
  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  displayPais(pais: Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }
  cambioPais(pais: Pais) {
    console.log(pais)
    if (typeof pais === 'string' || pais === null) {
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
  selectFecha(event: MatDatepickerInputEvent<Date>) {
    this.dateD = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.date = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  selectContinente(){
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
  guardar(){
    this.Precio[0] = {
      id : this.id,
      idSubscriber : this.idSubscriber,
      date : this.date,
      idContinent : this.idContinent,
      idCountry : this.idCountry,
      idCurrency : this.idCurrency,
      priceT1 : this.priceT1,
      dayT1 : this.dayT1,
      priceT2 : this.priceT2,
      dayT2 : this.dayT2,
      priceT3 : this.priceT3,
      dayT3 : this.dayT3,
      priceB : this.priceB
    }
    if(this.id > 0){
      Swal.fire({
        title: '¿Está seguro de modificar este registro?',
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
          this.abonadoService.addPrecio(this.Precio[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title: 'Se modificó el registro correctamente',
                  text: "",
                  icon: 'success',
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Ok',
                  width: '30rem',
                  heightAuto: true
                })
              }
            }
          ).add(
            () => {
              this.dialogRef.close()
            }
          )
        }
      })
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
          this.abonadoService.addPrecio(this.Precio[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
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
              }
            }
          ).add(
            () => {
              this.dialogRef.close()
            }
          )
        }
      })
    }
    console.log(this.Precio[0])
  }
  salir(){
    this.dialogRef.close()
  }
}
