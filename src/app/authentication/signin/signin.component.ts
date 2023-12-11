import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Aniversario } from 'app/models/login/aniversario';
import { FechasImportantesService } from 'app/services/login/fechas-importantes.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  arrayImg = [
    'assets/images/fondo-1.jpg',
    'assets/images/fondo-2.jpg',
    'assets/images/fondo-3.jpg',
    'assets/images/fondo-4.jpg',
  ]
  url = ""
  loginForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  hide = true;
  fechasImportantes : Aniversario[] = []
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private aniversarioService : FechasImportantesService
  ) {
    super();
  }
  ngOnInit() {
    console.log(this.getRandomNumber())
    this.loginForm = this.formBuilder.group({
      email: [
        'admin@lorax.com',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['admin', Validators.required],
    });
    this.url = this.arrayImg[this.getRandomNumber()]

      this.aniversarioService.getFechasImportantes().subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            this.fechasImportantes = response.data
          }
        }
      )

  }
  getRandomNumber() : number {
    return Math.floor(Math.random() * (0 - 4) + 4);
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';
    if (this.loginForm.invalid) {
      this.error = 'Nombre de Usuario y Contraseña no validos!';
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.form['email'].value, this.form['password'].value)
        .subscribe(
          (res) => {

            if (res) {
              const token = this.authService.currentUserValue.token;
              if (token) {
                if(this.authService.getIsLoginValue()){
                  this.router.navigate(['/dashboard/main']);
                }
              }
            } else {
              this.error = 'Invalid Login';
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
          }
        );
    }
  }
}
