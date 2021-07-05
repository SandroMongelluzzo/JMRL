import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { LogisticComponent } from './features/logistic/logistic.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent , canActivate: [AuthGuard] 
  },

  {path: 'logistic', component: LogisticComponent},
  {
    path: 'users', loadChildren: () => import('src/app/features/admin/manage-users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] 
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
