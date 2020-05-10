import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/role.enum';


//Ruteo del Componente Home, cargando componentes hijo.
const customerRoutes: Routes = [
  {  
    path: '',
    children: [
      {path: '', component: CustomerListComponent}
     ],
     canActivate: [AuthGuard],
     data:{ expectedRole : Role.AdminSupplier }
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
