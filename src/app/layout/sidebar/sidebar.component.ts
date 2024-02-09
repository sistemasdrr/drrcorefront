import { UsuarioService } from 'app/services/usuario.service';
import { PersonalService } from './../../services/mantenimiento/personal.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { ROUTES } from './sidebar-items';
import { AuthService } from '@core';
import { RouteInfo } from './sidebar.metadata';
import Swal from 'sweetalert2';
import { UserProcess } from 'app/models/usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  activeLI = 0
  public sidebarItems!: RouteInfo[];
  public innerHeight?: number;
  public bodyTag!: HTMLElement;
  listMaxHeight?: string;
  listMaxWidth?: string;
  headerHeight = 60;
  routerObj;

  tooltip1 = "";
  tooltip2 = "";
  tooltip3 = "";

  nombre = ""
  cargo = ""
  foto = ""

  listaGerencia : UserProcess[] = []
  listaProduccion : UserProcess[] = []
  listaAdministracion : UserProcess[] = []
  listaFacturacion : UserProcess[] = []

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private personalService : PersonalService,
    private usuarioService : UsuarioService
  ) {
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  windowResizecall() {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callToggleMenu(event: Event, length: number) {
    if (length > 0) {
      const parentElement = (event.target as HTMLInputElement).closest('li');
      const activeClass = parentElement?.classList.contains('active');
      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
      } else {
        this.renderer.addClass(parentElement, 'active');
      }
    }
  }
  ngOnInit() {
    const auth = JSON.parse(localStorage.getItem('authCache')+'')
    console.log(auth)
    this.personalService.getPersonalById(auth.idEmployee).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          const empleado = response.data
          console.log(empleado)
          if(empleado){
            this.nombre = empleado.shortName
            this.cargo = empleado.department + " - " + empleado.job
            this.foto = empleado.photoPath
          }
        }
      }
    )
    this.usuarioService.getUserProcess(auth.idEmployee).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.listaGerencia = response.data.gerencia
          this.listaProduccion = response.data.produccion
          this.listaAdministracion = response.data.administracion
          this.listaFacturacion = response.data.facturacion
          console.log(response.data)
        }
      }
    )
    if (this.authService.currentUserValue) {
      this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
    }
    this.initLeftSidebar();
    this.bodyTag = this.document.body;

  }



  ngOnDestroy() {
  }
  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);

  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime: boolean) {
    if (window.innerWidth < 1025) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  goTo(num : number){
    const tabAntecedentes = document.getElementById('tab-datos-empresa') as HTMLElement | null;
    if(tabAntecedentes?.classList.contains('tab-cambios')){
      Swal.fire({
        title: '¿Está seguro de salir sin guardar los cambios?',
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
          this.router.navigate(['/mantenimiento/personal/lista']);
        }
      });
    }else{
      this.router.navigate(['/mantenimiento/personal/lista']);
    }
  }
}
