import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, IAuthStatus } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
 protected currentAuthStatus: IAuthStatus;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.authStatus.subscribe(
      authStatus => (this.currentAuthStatus = this.authService.getAuthStatus())
    ) //validar que el Rol del usuario actual es el mismo a los Roles configurados en las rutas
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   return this.checkPermissions(childRoute);
  }
  canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(); 
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkPermissions(next);
  }

  protected checkLogin(){ //Metodo que valida se ya esta loggeado
    if((this.authService.getToken() == null || this.authService.getToken() === '')){
      alert('You must login to continue');
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }

  protected checkPermissions(route?: ActivatedRouteSnapshot){
    let roleMatch = true;
    let params: any;
    if(route){
      const expectedRole = route.data.expectedRole;
      if(expectedRole){
        roleMatch = this.currentAuthStatus.role === expectedRole;
      }
    }

    if(!roleMatch){
      alert('You do not have the permission to view this resource');
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
  
}
