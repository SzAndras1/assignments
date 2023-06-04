import {CanMatchFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {UserService} from "../user.service";
import {tap} from "rxjs";

export const canMatchGuardFn: CanMatchFn = () => {
  const router = inject(Router);
  return inject(UserService)
    .subjectIsLoggedIn
    .pipe(tap((isLoggedIn) => !isLoggedIn && router.navigate(['register'])))
}
