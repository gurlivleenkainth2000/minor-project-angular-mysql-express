import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffLayoutRoutingModule } from './staff-layout-routing.module';
import { StaffDashBoardComponent } from '../../pages/staff-dash-board/staff-dash-board.component';


@NgModule({
  declarations: [
    StaffDashBoardComponent
  ],
  imports: [
    CommonModule,
    StaffLayoutRoutingModule
  ]
})
export class StaffLayoutModule { }
