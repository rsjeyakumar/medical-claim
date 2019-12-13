import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./module/login/login.module').then(log => log.LoginModule)
  },
  {
    path: '', redirectTo: 'request-claim', pathMatch: 'full'
  },
  {
    path: 'request-claim',
    loadChildren: () => import('./module/home/home.module').then(home => home.HomeModule)
  },
  {
    path: 'status-check',
    loadChildren: () => import('./module/status-check/status-check.module').then(status => status.StatusCheckModule)
  },
  {
    path: 'claim-list',
    loadChildren: () => import('./module/claim-list/claim-list.module').then(claim => claim.ClaimListModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppModuleRoutingModule { }
