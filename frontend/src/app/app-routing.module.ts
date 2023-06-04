import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {ResumeListComponent} from "./resume-list/resume-list.component";
import {ResumeDetailsComponent} from "./resume-details/resume-details.component";
import {canMatchGuardFn} from "./guard/canMatchGuard";

const routes: Routes = [
  {path: 'register', component: UserRegisterComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'main', component: ResumeListComponent, canMatch:[canMatchGuardFn]},
  {path: ':id', component: ResumeDetailsComponent, canMatch:[canMatchGuardFn]},
  {path: '**', redirectTo: 'register' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
