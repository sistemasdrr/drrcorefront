import { SociosEmpresaService } from './../../../../../services/informes/empresa/socios-empresa.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComboData } from 'app/models/combo';
import { SociosEmpresaT } from 'app/models/informes/empresa/socios-empresa';
import { AgregarSocioComponent } from './agregar-socio/agregar-socio.component';

@Component({
  selector: 'app-socios-empresa',
  templateUrl: './socios-empresa.component.html',
  styleUrls: ['./socios-empresa.component.scss']
})
export class SociosEmpresaComponent implements OnInit{

  idCompany = 0

  dataSourcePartners : MatTableDataSource<SociosEmpresaT>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  columnasPartners : string[] = ['name','nationality','birthDate','identificationDocument','mainExecutive','profession','participation','startDate','acciones']

  constructor(private dialog : MatDialog,private sociosEmpresaService : SociosEmpresaService,@Inject(MAT_DIALOG_DATA) public data: any){
    this.dataSourcePartners = new MatTableDataSource()
    if(data){
      this.idCompany = data.idCompany
    }
  }
  ngOnInit(): void {
    this.sociosEmpresaService.getListCompanyPartner(this.idCompany).subscribe(
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
  agregarSociosEmpresa(){
    const dialogRef = this.dialog.open(AgregarSocioComponent, {
      data: {
        id : 0,
        idCompany : this.idCompany
      },
    });
  }
  editarSociosEmpresa(id : number){
    const dialogRef = this.dialog.open(AgregarSocioComponent, {
      data: {
        id : id,
        idCompany : this.idCompany
      },
    });
  }
  eliminarSociosEmpresa(id : number){

  }
}
