import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../user";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  error: boolean = false;
  errorMessage: string = "";
  successfulRegistration: boolean = false;

  constructor(private router: Router,
              private userService: UserService,
              private fb: FormBuilder) {
    this.successfulRegistration = this.router.getCurrentNavigation()?.extras.state?.['successfulRegistration'];
  }

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  login(): void {
    this.error = false;
    this.userService.login(this.loginForm.value as User)
      .pipe(
        catchError(err => {
          this.successfulRegistration = false;
          this.error = true;
          console.log(err);
          switch (err.status) {
            case 504:
              this.errorMessage = 'Backend server not running.';
              break;
            case 400:
              this.errorMessage = 'Wrong credentials.';
              break;
            default:
              this.errorMessage = 'Unexpected error.'
          }
          return throwError(err);
        }))
      .subscribe((toLoginUser: User): void => {
        this.userService.isLogged = true;
        console.log(toLoginUser);
        this.router.navigate(['main']);
      });
  }
}
