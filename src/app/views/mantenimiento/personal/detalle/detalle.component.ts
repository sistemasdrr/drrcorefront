import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ESSALUD, Personal } from 'app/models/mantenimiento/persona/personal';
import { PersonalService, data } from 'app/services/mantenimiento/personal.service';
import { AgregarEssaludComponent } from './agregar-essalud/agregar-essalud.component';
import { Pais } from 'app/models/pais';
import { PaisService } from 'app/services/pais.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  breadscrums = [
    {
      title: 'Detalle de Personal',
      items: ['Administración','Mantenimiento'],
      active: 'Detalle',
    },
  ];

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
  numHijos = ""
  tipoSangre = ""
  lugarNac = ""
  ciudadNac = ""
  paisNac : Pais = {
    id : 0,
    valor : '',
    bandera : ''
  }
  fechaNacimientoDate = new Date()
  fechaNacimiento = ""
  fechaIngresoDate = new Date()
  fechaIngreso = ""
  departamento = 0
  cargo = 0
  tipoContrato = ""
  CSbanco = ""
  CStipoCuenta = 0
  CSnumCuenta = ""
  CSmoneda = ""
  CCbanco = ""
  CCtipoCuenta = 0
  CCnumCuenta = ""
  CCmoneda = ""
  listaEssalud : ESSALUD[] = []
  files: File[] = []

  personal : Personal = {
    id : 0,
    codigo : '',
    nombres : '',
    apellidos : '',
    telefonoFijo : '',
    telefonoEmergencia : '',
    telefonoCelular : '',
    tipoDocumento : 0,
    numDocumento : '',
    direccion : '',
    estadoCivil : 0,
    numeroHijos : '',
    fechaNacimiento : '',
    lugarNacimiento : '',
    ciudadNacimiento : '',
    paisNacimiento : {
      id : 0,
      valor : '',
      bandera : ''
    },
    tipoSangre : '',
    email : '',
    fechaIngreso : '',
    departamento : 0,
    cargo : 0,
    tipoContrato : '',
    estado : true,
    //CUENTA SUELDO
    CSBanco : '',
    CSTipoCuenta : 0,
    CSNumCuenta : '',
    CSMoneda : '',
    //CUENTA CTS
    CCBanco : '',
    CCTipoCuenta : 0,
    CCNumCuenta : '',
    CCMoneda : '',
    ESSALUD : []
  }

  columnas = ['id', 'nombre', 'tipoVinculo', 'docIdentidad','accion']
  dataSource : MatTableDataSource<ESSALUD>
  paises : Pais[] = []
  filterPais : Observable<Pais[]>
  controlPaises = new FormControl<string | Pais>('')

  tiposDocumento : data[] = []
  estadosCivil : data[] = []
  departamentos : data[] = []
  cargos : data[]= []
  tiposCuenta : data[] = []

  constructor(private router : Router,
    private personalService : PersonalService,
    private activatedRoute : ActivatedRoute,
    public dialog: MatDialog, private paisService : PaisService,
    private snackBar: MatSnackBar){
      this.dataSource = new MatTableDataSource()
      this.filterPais = new Observable<Pais[]>()
  }

  ngOnInit(): void {
    this.personalService.getTipoDocumento().subscribe((response) => {
      if(response.isSuccess == true){
        this.tiposDocumento = response.data;
      }
    });
    this.personalService.getEstadoCivil().subscribe(response => {
      if(response.isSuccess == true){
        this.estadosCivil = response.data;
      }
    });
    this.personalService.getDepartamento().subscribe(response => {
      if(response.isSuccess == true){
        this.departamentos = response.data;
      }
    });
    this.personalService.getTipoCuenta().subscribe(response => {
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
    )
    const idRoute = this.activatedRoute.snapshot.paramMap.get('id')
    if(parseInt(idRoute+'') > 0){
      this.id = parseInt(idRoute+'')
      const personal = this.personalService.getPersonalById(this.id)

      this.breadscrums = [
        {
          title: 'Detalle de Personal - ' + personal.nombres + ' ' + personal.apellidos,
          items: ['Administración','Mantenimiento'],
          active: 'Detalle',
        },
      ];
      console.log(personal.departamento)
      this.personal = {
        id : personal.id,
        codigo : personal.codigo,
        nombres : personal.nombres,
        apellidos : personal.apellidos,
        telefonoFijo : personal.telefonoFijo,
        telefonoEmergencia : personal.telefonoEmergencia,
        telefonoCelular : personal.telefonoCelular,
        tipoDocumento : personal.tipoDocumento,
        numDocumento : personal.numDocumento,
        direccion : personal.direccion,
        estadoCivil : personal.estadoCivil,
        numeroHijos : personal.numeroHijos,
        fechaNacimiento : personal.fechaNacimiento,
        lugarNacimiento : personal.lugarNacimiento,
        ciudadNacimiento : personal.ciudadNacimiento,
        paisNacimiento : personal.paisNacimiento,
        tipoSangre : personal.tipoSangre,
        email : personal.email,
        fechaIngreso : personal.fechaIngreso,
        departamento : personal.departamento,
        cargo : personal.cargo,
        tipoContrato : personal.tipoContrato,
        estado : true,
        //CUENTA SUELDO
        CSBanco : personal.CSBanco,
        CSTipoCuenta : personal.CSTipoCuenta,
        CSNumCuenta : personal.CSNumCuenta,
        CSMoneda : personal.CSMoneda,
        //CUENTA CTS
        CCBanco : personal.CCBanco,
        CCTipoCuenta : personal.CCTipoCuenta,
        CCNumCuenta : personal.CCNumCuenta,
        CCMoneda : personal.CCMoneda,
        ESSALUD : personal.ESSALUD
      }
      this.codigo = personal.codigo
      this.tipoDocIdent = personal.tipoDocumento
      this.numDocIdent = personal.numDocumento
      this.email = personal.email
      this.apellidos = personal.apellidos
      this.nombres = personal.nombres
      this.telCelular = personal.telefonoCelular
      this.telFijo = personal.telefonoFijo
      this.telEmergencia = personal.telefonoEmergencia
      this.direccion = personal.direccion
      this.estadoCivil = personal.estadoCivil
      this.numHijos = personal.numeroHijos
      this.tipoSangre = personal.tipoSangre
      this.lugarNac = personal.lugarNacimiento
      this.ciudadNac = personal.ciudadNacimiento
      this.paisNac = personal.paisNacimiento
      this.fechaNacimiento = personal.fechaNacimiento
      const fechaNacimiento = personal.fechaNacimiento.split('/')
      if(fechaNacimiento.length > 0){
        this.fechaNacimientoDate = new Date(parseInt(fechaNacimiento[2]), parseInt(fechaNacimiento[1])-1, parseInt(fechaNacimiento[0]))
      }
      this.fechaIngreso = personal.fechaIngreso
      const fechaIngreso = personal.fechaIngreso.split('/')
      if(fechaIngreso.length > 0){
        this.fechaIngresoDate = new Date(parseInt(fechaIngreso[2]), parseInt(fechaIngreso[1]), parseInt(fechaIngreso[0]))
      }
      this.departamento = personal.departamento
      this.updateCargos(personal.departamento)
      this.cargo = personal.cargo
      this.tipoContrato = personal.tipoContrato
      this.CSbanco = personal.CSBanco
      this.CStipoCuenta = personal.CSTipoCuenta
      this.CSnumCuenta = personal.CSNumCuenta
      this.CSmoneda = personal.CSMoneda
      this.CCbanco = personal.CCBanco
      this.CCtipoCuenta = personal.CCTipoCuenta
      this.CCnumCuenta = personal.CCNumCuenta
      this.CCmoneda = personal.CCMoneda
      this.listaEssalud = personal.ESSALUD
      if(personal.ESSALUD.length > 0){
        this.dataSource = new MatTableDataSource(this.listaEssalud)
      }
    }else if(idRoute?.includes('nuevo')){
      this.breadscrums = [
        {
          title: 'Detalle de Personal - Nuevo',
          items: ['Administración','Mantenimiento'],
          active: 'Detalle',
        },
      ];
    }
  }

  updateCargos(id : number){
    this.personalService.getCargoPorDepartamento(id).subscribe(data => {
      if(data.isSuccess == true){
        this.cargos = data.data;
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
  cambiarIcono(objPais : any){
    this.iconoSeleccionado = objPais.bandera
  }
  /**/
  paisSeleccionado : number =0
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
      data: {
      },
    });
  }
  eliminarEssalud(id : number){
    console.log(id)
    this.listaEssalud = this.listaEssalud.filter(x => x.id !== id)
    this.dataSource.data = this.listaEssalud
  }
  guardarDatos(){
    console.log(this.files);
    this.personal = {
      id : this.id,
      codigo : this.codigo,
      nombres : this.nombres,
      apellidos : this.apellidos,
      telefonoFijo : this.telFijo,
      telefonoEmergencia : this.telEmergencia,
      telefonoCelular : this.telCelular,
      tipoDocumento : this.tipoDocIdent,
      numDocumento : this.numDocIdent,
      direccion : this.direccion,
      estadoCivil : this.estadoCivil,
      numeroHijos : this.numHijos,
      fechaNacimiento : this.fechaNacimiento,
      lugarNacimiento : this.lugarNac,
      ciudadNacimiento : this.ciudadNac,
      paisNacimiento : this.paisNac,
      tipoSangre : this.tipoSangre,
      email : this.email,
      fechaIngreso : this.fechaIngreso,
      departamento : this.departamento,
      cargo : this.cargo,
      tipoContrato : this.tipoContrato,
      estado : true,
      //CUENTA SUELDO
      CSBanco : this.CSbanco,
      CSTipoCuenta : this.CStipoCuenta,
      CSNumCuenta : this.CSnumCuenta,
      CSMoneda : this.CSmoneda,
      //CUENTA CTS
      CCBanco : this.CCbanco,
      CCTipoCuenta : this.CCtipoCuenta,
      CCNumCuenta : this.CCnumCuenta,
      CCMoneda : this.CCmoneda,
      ESSALUD : this.listaEssalud
    }
    this.personalService.updatePersonal(this.personal)
    this.router.navigate(['mantenimiento/personal/lista'])
  }
  volver(){
    this.router.navigate(['mantenimiento/personal/lista'])
  }

}
