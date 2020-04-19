import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

//Ruteo del Componente Home, cargando componentes hijo.
const homeRoutes: Routes = [
  {  
    path: '',
    children: [
      {path: '', component: HomeComponent}
     ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
