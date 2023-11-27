import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ESSALUD, Personal } from 'app/models/mantenimiento/persona/personal';
import { PersonalService } from 'app/services/mantenimiento/personal.service';
import { AgregarEssaludComponent } from './agregar-essalud/agregar-essalud.component';
import { Pais } from 'app/models/pais';
import { PaisService } from 'app/services/pais.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import Swal from 'sweetalert2';
import { ComboService } from 'app/services/combo.service';
import { ComboData } from 'app/models/combo';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetallePersonalComponent implements OnInit {
  breadscrums = [
    {
      title: 'Detalle de Personal',
      items: ['Administración','Mantenimiento'],
      active: 'Personal',
    },
  ];

  loading: boolean = true;

  id = 0
  codigo = ""
  tipoDocIdent = 0
  numDocIdent = ""
  email = ""
  apellidos = ""
  nombres = ""
  telCelular = ""
  telFijo = ""
  telEmergencia = ""
  direccion = ""
  estadoCivil = 0
  numHijos = 0
  tipoSangre = ""
  lugarNac = ""
  ciudadNac = ""
  paisNac : Pais = {
    id : 0,
    valor : '',
    bandera : ''
  }
  fechaNacimientoDate : Date | null = new Date()
  fechaNacimiento : string | null = ""
  fechaIngresoDate : Date | null = new Date()
  fechaIngreso : string | null = ""
  fechaCeseDate : Date | null = new Date()
  fechaCese : string | null = ""
  departamento = 0
  cargo = 0
  tipoContrato = ""
  CSbanco = ""
  CStipoCuenta = 0
  CSnumCuenta = ""
  CSmoneda = 0
  CCbanco = ""
  CCtipoCuenta = 0
  CCnumCuenta = ""
  CCmoneda = 0
  listaEssalud : any[] = []
  files: File[] = []
  urlFoto = ""

  personal : Personal = {
    address : "",
    birthday : "",
    bloodType : "",
    cellphone : "",
    childrenNumber : 0,
    code : "",
    ctsBank : "",
    distrit : "",
    documentNumber : "",
    email : "",
    emergencyPhone : "",
    endDate : "",
    firstName : "",
    healthInsuranceRequestDto : [],
    id : 0,
    idBankAccountTypeCts : 0,
    idBankAccountTypeSalary : 0,
    idCivilStatus : 0,
    idCountry : 0,
    idCurrencyCts : 0,
    idCurrencySalary : 0,
    idDocumentType : 0,
    idJob : 0,
    idJobDepartment : 0,
    lastName : "",
    numberAccountCts : "",
    numberAccountSalary : "",
    photoPath : "",
    province : "",
    salaryBank : "",
    shortName : "",
    startDate : "",
    telephone : "",
    workModality : "",
  }

  columnas = [ 'nombre', 'tipoVinculo', 'docIdentidad','accion']
  dataSource : MatTableDataSource<ESSALUD>
  paises : Pais[] = []
  filterPais : Observable<Pais[]>
  controlPaises = new FormControl<string | Pais>('')

  tiposDocumento : ComboData[] = []
  estadosCivil : ComboData[] = []
  departamentos : ComboData[] = []
  cargos : ComboData[]= []
  tiposCuenta : ComboData[] = []
  tiposMoneda : ComboData[] = []

  constructor(private router : Router,
    private personalService : PersonalService,
    private comboService : ComboService,
    private activatedRoute : ActivatedRoute,
    public dialog: MatDialog, private paisService : PaisService,
    private snackBar: MatSnackBar){
      this.dataSource = new MatTableDataSource()
      this.filterPais = new Observable<Pais[]>()
  }

  ngOnInit(): void {
    this.comboService.getTipoDocumento().subscribe((response) => {
      if(response.isSuccess == true){
        this.tiposDocumento = response.data;
      }
    });
    this.comboService.getEstadoCivil().subscribe(response => {
      if(response.isSuccess == true){
        this.estadosCivil = response.data;
      }
    });
    this.comboService.getDepartamento().subscribe(response => {
      if(response.isSuccess == true){
        this.departamentos = response.data;
      }
    });
    this.comboService.getTipoMoneda().subscribe(response => {
      if(response.isSuccess == true){
        this.tiposMoneda = response.data;
      }
    });
    this.comboService.getTipoCuenta().subscribe(response => {
      if(response.isSuccess == true){
        this.tiposCuenta = response.data;
      }
    });
    this.paisService.getPaises().subscribe(response => {
      if(response.isSuccess == true){
        this.paises = response.data;
      }else{
        this.snackBar.open('Ha ocurrido un problema en la conexión', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'snackbar-danger',
        });
      }
    });
    this.filterPais = this.controlPaises.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.valor
        return name ? this._filterPais(name as string) : this.paises.slice()
      }),
    );
    const idRoute = this.activatedRoute.snapshot.paramMap.get('id');
    const contieneLetras = /[a-zA-Z]/.test(idRoute+'');

    if(parseInt(idRoute+'') > 0 && contieneLetras == false){
      this.personalService.getPersonalById(parseInt(idRoute+'')).subscribe((response) => {

        if(response.isSuccess == true){
          const personal = response.data;
          this.personal = response.data
          console.log(response.data)
          if(personal){
            this.breadscrums = [
              {
                title: 'Detalle de Personal - ' + personal.firstName + ' ' + personal.lastName,
                items: ['Administración','Mantenimiento'],
                active: 'Detalle',
              },
            ];
            this.id = personal.id
            this.codigo = personal.code
            this.tipoDocIdent = personal.idDocumentType
            this.numDocIdent = personal.documentNumber
            this.email = personal.email
            this.apellidos = personal.lastName
            this.nombres = personal.firstName
            this.telCelular = personal.cellphone
            this.telFijo = personal.telephone
            this.telEmergencia = personal.emergencyPhone
            this.direccion = personal.address
            this.estadoCivil = personal.idCivilStatus
            this.numHijos = personal.childrenNumber
            this.tipoSangre = personal.bloodType
            this.urlFoto = personal.photoPath
            this.lugarNac = personal.distrit
            this.ciudadNac = personal.province
            if(personal.idCountry > 0){
              this.paisService.getPaises().subscribe(response => {
                if(response.isSuccess === true){
                  const paises : Pais[] = response.data
                  this.paisNac = paises.filter(x => x.id === personal.idCountry)[0]
                }
              })
            }
            console.log(this.paisNac)
            //this.paisNac = this.paises.filter(x => x.id === personal.idCountry)[0]
            if(personal.birthday !== null){
              this.fechaNacimiento = personal.birthday
              const fechaNacimiento = personal.birthday.split('/')
              if(fechaNacimiento.length > 0){
                this.fechaNacimientoDate = new Date(parseInt(fechaNacimiento[2]), parseInt(fechaNacimiento[1])-1, parseInt(fechaNacimiento[0]))
              }
            }else{
              this.fechaNacimiento = null
              this.fechaNacimientoDate = null
            }
            if(personal.startDate !== null){
              this.fechaIngreso = personal.startDate
              const fechaIngreso = personal.startDate.split('/')
              if(fechaIngreso.length > 0){
                this.fechaIngresoDate = new Date(parseInt(fechaIngreso[2]), parseInt(fechaIngreso[1])-1, parseInt(fechaIngreso[0]))
              }
            }else{
              this.fechaIngreso = null
              this.fechaIngresoDate = null
            }
            if(personal.endDate !== null){
              this.fechaCese = personal.endDate
              const fechaCese = personal.endDate.split('/')
              if(fechaCese.length > 0){
                this.fechaCeseDate = new Date(parseInt(fechaCese[2]), parseInt(fechaCese[1])-1, parseInt(fechaCese[0]))
              }
            }else{
              this.fechaCese = null
              this.fechaCeseDate = null
            }
            this.departamento = personal.idJobDepartment
            this.updateCargos(personal.idJobDepartment)
            this.cargo = personal.idJob
            this.tipoContrato = personal.workModality
            this.CSbanco = personal.salaryBank
            this.CStipoCuenta = personal.idBankAccountTypeSalary
            this.CSnumCuenta = personal.numberAccountSalary
            this.CSmoneda = personal.idCurrencySalary
            this.CCbanco = personal.ctsBank
            this.CCtipoCuenta = personal.idBankAccountTypeCts
            this.CCnumCuenta = personal.numberAccountCts
            this.CCmoneda = personal.idCurrencyCts
            this.listaEssalud = personal.healthInsuranceResponseDto
            this.actualizarTablaEssalud(personal.healthInsuranceResponseDto)
          }
          setTimeout(() => {
            this.loading = false
          }, 500);

        }
      },
      (error) =>{
        this.loading = false;
        Swal.fire({
          title: 'Ocurrió un problema. Comunicarse con Sistemas.',
          text: error,
          icon: 'warning',
          confirmButtonColor: 'blue',
          confirmButtonText: 'Ok',
          width: '40rem',
          heightAuto : true
        }).then(() => {
        })
      }
    );
    }else if(idRoute === 'nuevo' && contieneLetras == true){
      this.loading = false
      this.fechaNacimiento = null
      this.fechaNacimientoDate = null
      this.fechaIngreso = null
      this.fechaIngresoDate = null
      this.fechaCese = null
      this.fechaCeseDate = null
      console.log("nuevo empleado")
    }else{
      Swal.fire({
        title: 'No se encontró el registro',
        text: "",
        icon: 'warning',
        confirmButtonColor: 'blue',
        confirmButtonText: 'Volver',
        width: '40rem',
        heightAuto : true
      }).then((result) => {
        this.loading = false
        this.router.navigate(['mantenimiento/personal/lista'])

      })
    }
  }

  actualizarTablaEssalud(lista : ESSALUD[]){
    this.dataSource = new MatTableDataSource(lista)
  }
  selectFechaNacimiento(event: MatDatepickerInputEvent<Date>) {
    this.fechaNacimientoDate = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaNacimiento = this.formatDate(selectedDate);
    }
  }
  selectFechaCese(event: MatDatepickerInputEvent<Date>) {
    this.fechaCeseDate = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaCese = this.formatDate(selectedDate);
    }
  }
  selectFechaIngreso(event: MatDatepickerInputEvent<Date>) {
    this.fechaIngresoDate = event.value!
    const selectedDate = event.value;
    if (selectedDate) {
      this.fechaIngreso = this.formatDate(selectedDate);
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  updateCargos(id : number){
    this.comboService.getCargoPorDepartamento(id).subscribe(response => {
      if(response.isSuccess == true){
        this.cargos = response.data;
      }
    });
  }
  private _filterPais(description: string): Pais[] {
    const filterValue = description.toLowerCase();
    return this.paises.filter(pais => pais.valor.toLowerCase().includes(filterValue));
  }
  displayPais(pais : Pais): string {
    return pais && pais.valor ? pais.valor : '';
  }

  /**/
  paisSeleccionado : number = 0
  iconoSeleccionado: string = ""

  actualizarSeleccion(id: number) {
    const paisSeleccionadoObj = this.paises.find((pais) => pais.id === id);
    if (paisSeleccionadoObj) {
      this.paisSeleccionado = paisSeleccionadoObj.id;
      this.iconoSeleccionado = paisSeleccionadoObj.bandera;
    }
  }
  onSelect(event : any) {
    this.files = []
    this.files.push(...event.addedFiles);
    console.log(...event.addedFiles)
    // for (const file of this.files) {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //   const base64String = event.target?.result as string;
    //     console.log('Base64 de la imagen:', base64String);
    //   };
    //   reader.readAsDataURL(file);
    // }
  }

  agregarEssalud(){
    const dialogRef = this.dialog.open(AgregarEssaludComponent, {
      disableClose: true,
      data : this.id,
    });
    dialogRef.afterClosed().subscribe((essalud) => {
      console.log(essalud)
      this.listaEssalud.push({
        nameHolder : essalud.nameHolder,
        idFamilyBondType : essalud.idFamilyBondType,
        valueFamilyBondType : essalud.valueFamilyBondType,
        documentNumber : essalud.documentNumber
      })
      this.actualizarTablaEssalud(this.listaEssalud)
    });
  }
  eliminarEssalud(nombreCompleto : string, tipoVinculo : number, numDocumento : string){
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.listaEssalud = this.listaEssalud.filter(x => x.nameHolder !== nombreCompleto && x.idFamilyBondType !== tipoVinculo && x.documentNumber !== numDocumento)
        this.actualizarTablaEssalud(this.listaEssalud)
        Swal.fire({
          title :'¡Eliminado!',
          text : 'El registro se elimino correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
      }
    });
  }
  armarPersonal(){
    this.personal = {
      address : this.direccion,
      birthday : this.fechaNacimiento,
      bloodType : this.tipoSangre,
      cellphone : this.telCelular,
      childrenNumber : this.numHijos,
      code : this.codigo,
      ctsBank : this.CCbanco,
      distrit : this.lugarNac,
      documentNumber : this.numDocIdent,
      email : this.email,
      emergencyPhone : this.telEmergencia,
      endDate : this.fechaCese,
      firstName : this.nombres,
      healthInsuranceRequestDto : [],
      id : this.id,
      idBankAccountTypeCts : this.CCtipoCuenta,
      idBankAccountTypeSalary : this.CStipoCuenta,
      idCivilStatus : this.estadoCivil,
      idCountry : this.paisNac?.id,
      idCurrencyCts : this.CCmoneda,
      idCurrencySalary : this.CSmoneda,
      idDocumentType : this.tipoDocIdent,
      idJob : this.cargo,
      idJobDepartment : this.departamento,
      lastName : this.apellidos,
      numberAccountCts : this.CCnumCuenta,
      numberAccountSalary : this.CSnumCuenta,
      photoPath : this.urlFoto,
      province : this.ciudadNac,
      salaryBank : this.CSbanco,
      shortName : this.nombres + ' ' + this.apellidos,
      startDate : this.fechaIngreso,
      telephone : this.telFijo,
      workModality : this.tipoContrato,
    }
    this.listaEssalud.forEach(essalud => {
      this.personal.healthInsuranceRequestDto.push({
        nameHolder : essalud.nameHolder,
        idFamilyBondType : essalud.idFamilyBondType,
        documentNumber : essalud.documentNumber
      })
    });
  }
  guardarDatos(){
    const idRoute = this.activatedRoute.snapshot.paramMap.get('id')
    this.armarPersonal()
    if(idRoute?.includes('nuevo')){
      this.personal.id = 0
      Swal.fire({
        title: '¿Está seguro de agregar este registro?',
        text: "",
        showCancelButton: true,
        cancelButtonText : 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          this.personalService.addPersonal(this.personal).subscribe(
            (response) => {
              console.log(response)
              if(response.data == true && response.isSuccess == true && response.isWarning == false){
                Swal.fire({
                  title: 'Se agregó el registro con éxito',
                  text: "",
                  icon: 'success',
                  confirmButtonColor: 'blue',
                  confirmButtonText: 'Ok',
                  width: '40rem',
                  heightAuto : true
                }).then(() => {
                  this.router.navigate(['mantenimiento/personal/lista'])
                })
              }else{
                Swal.fire({
                  title: 'Ocurrió un problema.',
                  text: 'Completo los campos de DNI, Departamento y Cargo',
                  icon: 'warning',
                  confirmButtonColor: 'blue',
                  confirmButtonText: 'Ok',
                  width: '40rem',
                  heightAuto : true
                }).then(() => {
                })
              }
          },(error) => {
            console.log(error)
            Swal.fire({
              title: 'Ocurrió un problema.',
              text: error,
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Comunicarse con Sistemas',
              width: '30rem',
              heightAuto : true
            }).then(() => {
            })
          }
          );
        }
      })
    }else{
      this.personal.id = parseInt(idRoute+'')
      Swal.fire({
        title: '¿Está seguro de modificar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText : 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '40rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          this.loading = true
          this.personalService.addPersonal(this.personal).subscribe(
            (response) => {
              Swal.fire({
                title: 'Se guardo el registro con éxito',
                text: "",
                icon: 'success',
                confirmButtonColor: 'blue',
                confirmButtonText: 'Ok',
                width: '40rem',
                heightAuto : true
              }).then((result) => {
                this.loading = false
                this.router.navigate(['mantenimiento/personal/lista'])

              })
          },(error) => {
            console.log(error)
          }
          );
        }
      })
    }
  }
  volver(){
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
        this.router.navigate(['mantenimiento/personal/lista'])
      }
    })
  }

}
