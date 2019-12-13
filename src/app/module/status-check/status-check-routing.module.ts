import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusCheckComponent } from './status-check.component';


const routes: Routes = [
  {
    path: '',
    component: StatusCheckComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusCheckRoutingModule { }
