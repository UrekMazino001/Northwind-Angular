import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
 
  title = 'northwind-angular';
  displayLogin = false;
  
  constructor(private authService: AuthService) {       
  }

  //Escuchar todos los cambios para el Token
  ngOnInit(): void {
    this.authService.authStatus.subscribe(
      authStatus => {
        const jwt = this.authService.getToken();
        setTimeout(() => (this.displayLogin = !(jwt == null || jwt === ''), 0));
        //Cuando el jwt no es vacio ni null entonces coloca l variable como true. para que muestre la barra de navegacion
      }
    );
  }

  get displayMenu(){
    return this.displayLogin;
  }
}
