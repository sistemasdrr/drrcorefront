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
    'https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg',
    'https://www.salesforce.com/content/dam/web/es_mx/blog/reporte-de-ventas.jpg',
    'https://itop.academy/wp-content/uploads/2022/10/gestion-informes-reportes-sap-business-one-itop-academy.jpg',
    'https://static5.depositphotos.com/1009762/449/i/950/depositphotos_4499086-stock-illustration-annual-report-graph-diagram-chart.jpg',

  ]
  url = ""
  loginForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
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
  }
  getRandomNumber() : number {
    return Math.floor(Math.random() * (0 - 3) + 4);
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
