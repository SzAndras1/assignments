import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserLoginComponent} from "./user-login/user-login.component";

const routes: Routes = [
  {path: 'register', component: UserRegisterComponent},
  {path: 'login', component: UserLoginComponent},
  {path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
