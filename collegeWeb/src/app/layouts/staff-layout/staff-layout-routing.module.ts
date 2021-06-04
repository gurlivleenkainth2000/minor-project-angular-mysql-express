import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffGuard } from 'src/app/guards/staff.guard';
import { StaffDashBoardComponent } from 'src/app/pages/staff-dash-board/staff-dash-board.component';

const routes: Routes = [
  { path: "staff-dashboard", component: StaffDashBoardComponent, canActivate: [StaffGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffLayoutRoutingModule { }
