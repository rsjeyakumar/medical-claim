import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { StatusCheckRoutingModule } from './status-check-routing.module';
import { StatusCheckComponent } from './status-check.component';


@NgModule({
  declarations: [StatusCheckComponent],
  imports: [
    CommonModule,
    StatusCheckRoutingModule, SharedModule
  ]
})
export class StatusCheckModule { }
