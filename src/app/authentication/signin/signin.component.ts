import { PersonalService } from './../../services/mantenimiento/personal.service';

import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Aniversario } from 'app/models/login/aniversario';
import { FechasImportantesService } from 'app/services/login/fechas-importantes.service';
import { AuthService } from '@core';
import { Router } from '@angular/router';

interface DecodedToken {
  Id : number
  username: string;
  role: string;
  exp: Date;
  iat: Date;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  private readonly CACHE_KEY = 'saveUser';
  arrayImg = [
    'assets/images/fondo-1.jpg',
    'assets/images/fondo-2.jpg',
    'assets/images/fondo-3.jpg',
    'assets/images/fondo-4.jpg',
    'assets/images/fondo-5.jpg',
  ]
  url = ""
  submitted = false;
  error = '';
  hide = true;
   loading=false;
  recordarUsuario = false
  username : string = ""
  password : string = ""

  typeInput: string = 'password';
  showPassword: boolean = false;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    // Cambiar el tipo de input según si la contraseña debe mostrarse o no
    this.typeInput = this.showPassword ? 'text' : 'password';
  }

  btnIngresar = "Ingresar"
  msgError = ""
  fechasImportantes : Aniversario[] = []
  constructor(
    private personalService :PersonalService,
    private authService : AuthService,
    private router : Router,
    private aniversarioService : FechasImportantesService,
    private usuarioService : UsuarioService
  ) {
    super();
  }
  ngOnInit(): void {

    console.log(this.getRandomNumber())
    const savedUser = JSON.parse(localStorage.getItem(this.CACHE_KEY) || '{}')
    if(savedUser.saveUser === true){
      this.recordarUsuario = true
      this.username = savedUser.username
      this.password = savedUser.password
    }
    this.url = this.arrayImg[this.getRandomNumber()]
   this.loading=true;
      this.aniversarioService.getFechasImportantes().subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.fechasImportantes = response.data
          }
        }
      ).add(
        () => {
          this.loading = false;
        }
      )
  }
  getRandomNumber() : number {
    return Math.floor(Math.random() * (0 - 5) + 5);
  }

  onSubmit() {
    this.btnIngresar = "Validando..."
    this.msgError = ""
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if(response !== null){
          if(this.authService.getIsLoginValue()){
            //recordar usuario

              const cacheData = {
                saveUser : this.recordarUsuario,
                username : this.username,
                password : this.password
              };
              localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
            
            this.router.navigate(['/dashboard/main']);
          }
        }else{
          this.msgError = "Usuario o Contraseña incorrecta"
        }
      }
    ).add(
      () => {
        this.btnIngresar = "Ingresar"
      }
    )

    // this.submitted = true;
    // this.error = '';
    // if (this.loginForm.invalid) {
    //   this.error = 'Nombre de Usuario y Contraseña no validos!';
    //   return;
    // } else {



    //   // this.subs.sink = this.authService
    //   //   .login(this.form['email'].value, this.form['password'].value)
    //   //   .subscribe(
    //   //     (res) => {

    //   //       if (res) {
    //   //         const token = this.authService.currentUserValue.token;
    //   //         if (token) {
    //   //           if(this.authService.getIsLoginValue()){
    //   //             this.router.navigate(['/dashboard/main']);
    //   //           }
    //   //         }
    //   //       } else {
    //   //         this.error = 'Invalid Login';
    //   //       }
    //   //     },
    //   //     (error) => {
    //   //       this.error = error;
    //   //       this.submitted = false;
    //   //     }
    //   //   );


    // }
  }
  enter(event : any){    
    if(event.code == 'Enter'){
      this.onSubmit()
    }
  }
  focusPassword(event : any){
    console.log("hola")
    if(event.code == 'Enter'){
      const input = document.getElementById('id_password') as HTMLElement | null;
    if(input){
            input.focus()
          }
    }
  }
}
