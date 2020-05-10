import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError = '';
  loginForm: FormGroup; //Contendra 2 elementos, el email y el password, los cuales se podra validar.
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {} //Permite crear controles al formulario
 
  ngOnInit() {
    this.authService.logout(); //Para limpiar el localstore cuando se accese al login por URL
    this.buildLoginForm();
  }

  //Método que permite crear los controles y aplicar validaciones.
  buildLoginForm():void{
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]]
    })
  }  

  //Metodo invocado desde el login.html
  login(Form: FormGroup){
    
   this.authService.login(Form.value.email, Form.value.password)
                     .subscribe(value=>{
                       this.router.navigate(['/home'])
                     }, error => this.loginError = error);
  }

}
