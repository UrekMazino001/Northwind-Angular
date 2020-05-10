import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth/auth.guard';

//Cargando el modulo en modo Lazy Loading
const routes: Routes = [
  {path: 'home', loadChildren: './home/home.module#HomeModule', canLoad: [AuthGuard]}, // Guard para validar si esta logeado,
  {path: 'customer', loadChildren: './customer/customer.module#CustomerModule', canLoad: [AuthGuard]},
  {path: 'login',component: LoginComponent}, //Carga por defecto el modulo Home.
  {path: '', redirectTo: '/login', pathMatch: 'full'}, //Carga por defecto el modulo Home.
  {path: 'logout', component: LogoutComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
