import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guard/admin.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { ContactComponent } from './features/contact/contact.component';
import { HomeComponent } from './features/home/home.component';
import { LeasingComponent } from './features/leasing/leasing.component';
import { LogisticComponent } from './features/logistic/logistic.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent  
  },

  {path: 'logistic', component: LogisticComponent , canActivate: [AuthGuard]},
  {path: 'leasing', component: LeasingComponent , canActivate: [AuthGuard]},
  {path: 'contact', component: ContactComponent , canActivate: [AuthGuard]},
  
  {
    path: 'users', loadChildren: () => import('src/app/features/admin/manage-users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard, AdminGuard] 
  },
  {
    path: 'vehicles', loadChildren: () => import('src/app/features/admin/manage-vehicles/vehicles.module').then(m => m.VehiclesModule), canActivate: [AuthGuard, AdminGuard] 
  },
  {
    path: 'account', loadChildren: () => import('src/app/public/account-module/account.module').then(m => m.AccountModule), //canActivate: [AuthGuard] 
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
