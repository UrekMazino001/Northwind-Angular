import { Injectable } from '@angular/core';
import { Role } from './role.enum';
import { Observable, BehaviorSubject, throwError as observableThrowError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import * as decode from 'jwt-decode'
import { transformError } from '../common/common';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {

  //Varible para capturar lo retornado por el metodo userProvider.
  private readonly AuthProvider: (email: string, password: string) => Observable<IServerAuthResponse>;
  authStatus =new BehaviorSubject<IAuthStatus>(this.getItemStoraged('authStatus') || defaultAuthStatus); 
  //Cada vez que cambia es setea en el LocalStorage.
  //Observable para escuchar los cambios que ocurren sobre el modelo IAuthStatus. IAuthStatus -> será usado en otros componentes, para ver si hay cambios en el logueo

  constructor(private httpClient: HttpClient) {
    super(); //ya que esta heredando y el constructor padre esta vacio.
    this.authStatus.subscribe(res =>{
      this.setItemStoraged('authStatus', res) //Cada vez que cambie el authStatus tambien setearemos el Token
    })
    this.AuthProvider = this.userAuthProvider;
   }

   //Método hace la peticion POST
  private userAuthProvider(email: string, password: string): Observable<IServerAuthResponse>{
    return this.httpClient.post<IServerAuthResponse>(`${environment.urlLocal}/token`, {email: email, password: password});
  } 

  //Se regresa la informacion que viene en el Access_Token pero decodificada.
  login(email: string, password: string): Observable<IAuthStatus>{
    this.logout();
    
    const loginResponse = this.AuthProvider(email, password).pipe(
      map(value =>{ //Value es el valor de la peticion Http.
        this.setToken(value.accessToken) //Guardando el valor en el localStorage
        const result = decode(value.accessToken); //decofica el Access_Token y mapea el resultado con la Interface de IAuthStatus
        
        return result as IAuthStatus;
      }), catchError(transformError) //
    );

     //loginResponse se convierte en un Observable
     loginResponse.subscribe(
       res => {
         this.authStatus.next(res);     
       },
       err => {
         this.logout();
         return observableThrowError(err);
       }
     );

     return loginResponse;
  }

  logout(){
    this.claerToken(); //Limpia todo lo almacenado en el localStorage.
    this.authStatus.next(defaultAuthStatus);
  };

  //Métodos para utilizar con el Token.
  private setToken(jwt: string){
    this.setItemStoraged('jwt', jwt);
  }

  getToken(): string{
    return this.getItemStoraged('jwt') || '';
  }

  claerToken(){
    this.removeItemStoraged('jwt');
  }

  //Metodo para conocer el Rol de  cada usuario
  getAuthStatus(): IAuthStatus{
    return this.getItemStoraged('authStatus');
  }
}

//data obtenida al decodificar el Token.
export interface IAuthStatus{
  role: Role,
  primarysid: number,
  unique_name: string
}

interface IServerAuthResponse{
  accessToken: string  ;
}

//Inicializacion del modelo
const defaultAuthStatus: IAuthStatus ={
  role: Role.None, primarysid: null, unique_name: null
}