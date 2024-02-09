import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SociosPersonaT } from 'app/models/informes/empresa/socios-empresa';
import { SocioPersonaService } from 'app/services/informes/persona/socio-persona.service';
import { AgregarSocioComponent } from 'app/views/informe/info-empresa/ie-lista/socios-empresa/agregar-socio/agregar-socio.component';
import { AgregarSocioPersonaComponent } from './agregar-socio/agregar-socio.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-socios-persona',
  templateUrl: './socios-persona.component.html',
  styleUrls: ['./socios-persona.component.scss'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class SociosPersonaComponent implements OnInit{
  idPerson = 0

  dataSourcePartners : MatTableDataSource<SociosPersonaT>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  columnasPartners : string[] = ['name','country','taxTypeName','situation','mainExecutive','profession','constitutionDate','acciones']
  constructor(private dialog : MatDialog,private sociosPersonaService : SocioPersonaService,@Inject(MAT_DIALOG_DATA) public data: any){
    this.dataSourcePartners = new MatTableDataSource()
    if(data){
      this.idPerson = data.idPerson
    }
    console.log(this.idPerson)
  }
  ngOnInit(): void {
    this.sociosPersonaService.getListPersonPartner(this.idPerson).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSourcePartners.data = response.data
          this.dataSourcePartners.sort = this.sort
        }
      }
    )
  }

  agregarSociosPersona(){
    const dialogRef = this.dialog.open(AgregarSocioPersonaComponent, {
      data: {
        id : 0,
        idPerson : this.idPerson
      },
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.sociosPersonaService.getListPersonPartner(this.idPerson).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.dataSourcePartners.data = response.data
              this.dataSourcePartners.sort = this.sort
            }
          },(error) => {
            console.log(error)
          }
        )
      }
    )
  }
  editarSociosPersona(id : number){
    const dialogRef = this.dialog.open(AgregarSocioPersonaComponent, {
      data: {
        id : id,
        idPerson : this.idPerson
      },
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.sociosPersonaService.getListPersonPartner(this.idPerson).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.dataSourcePartners.data = response.data
              this.dataSourcePartners.sort = this.sort
            }
          },(error) => {
            console.log(error)
          }
        )
      }
    )
  }
  eliminarSociosPersona(id : number){

  }
}
