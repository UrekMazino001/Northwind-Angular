import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError = '';
  loginForm: FormGroup; //Contendra 2 elementos, el email y el password, los cuales se podra validar.
  constructor(private fb: FormBuilder) {} //Permite crear controles al formulario
 
  ngOnInit() {
    this.buildLoginForm();
  }

  //Método que permite crear los controles y aplicar validaciones.
  buildLoginForm():void{
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]]
    })
  }  

  login(Form: FormGroup){
    debugger
  }

}
