import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';


//Ruteo del Componente Home, cargando componentes hijo.
const customerRoutes: Routes = [
  {  
    path: '',
    children: [
      {path: '', component: CustomerListComponent}
     ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(customerRoutes)
  ],
  exports:[RouterModule]
})
export class CustomerRoutingModule { }
