import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ClaimListRoutingModule } from './claim-list-routing.module';
import { ClaimListComponent } from './claim-list.component';


@NgModule({
  declarations: [ClaimListComponent],
  imports: [
    CommonModule,
    ClaimListRoutingModule, SharedModule
  ]
})
export class ClaimListModule { }
