import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { LimitsControllerComponent } from './limits-controller/limits-controller.component';
import { RegComponent } from './reg/reg.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'reg', component: RegComponent},
  {path: 'home', component: HomeComponent},
  {path: 'limits', component: LimitsControllerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
