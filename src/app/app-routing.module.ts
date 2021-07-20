import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { AdminGuard } from './core/guard/admin.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { ContactComponent } from './features/contact/contact.component';
import { HomeComponent } from './features/home/home.component';
import { LeasingComponent } from './features/leasing/leasing.component';
import { LogisticComponent } from './features/logistic/logistic.component';
import { SandroneComponent } from './public/sandrone/sandrone.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: '404', component: NotfoundComponent },
  { path: 'sandrone', component: SandroneComponent },
  { path: 'logistic', component: LogisticComponent, canActivate: [AuthGuard] },
  { path: 'leasing', component: LeasingComponent, canActivate: [AuthGuard] },

  {
    path: 'users', loadChildren: () => import('src/app/features/admin/manage-users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'vehicles', loadChildren: () => import('src/app/features/admin/manage-vehicles/vehicles.module').then(m => m.VehiclesModule), canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'emailsFC', loadChildren: () => import('src/app/features/admin/manage-emails/emails-fc.module').then(m => m.EmailsFCModule), canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'adminPage', loadChildren: () => import('src/app/features/admin/admin-page/admin-page.module').then(m => m.AdminPageModule), canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'tickets/manage', loadChildren: () => import('src/app/features/admin/manage-tickets/ticket-manage.module').then(m => m.TicketManageModule), canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'tickets', loadChildren: () => import('src/app/features/tickets/ticket.module').then(m => m.TicketModule), canActivate: [AuthGuard]
  },
  {
    path: 'me', loadChildren: () => import('src/app/features/user/user-page/user-page.module').then(m => m.UserPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'account', loadChildren: () => import('src/app/public/account-module/account.module').then(m => m.AccountModule),
  },

  // otherwise redirect to 404
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
