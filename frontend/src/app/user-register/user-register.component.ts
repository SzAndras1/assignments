import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../user";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  error: boolean = false;
  errorMessage: string = "";

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  register(): void {
    this.error = false;
    this.userService.createUser(this.registerForm.value as User)
      .pipe(
        catchError(err => {
          this.error = true;
          console.log(err)
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
        })
      ).subscribe((toRegisterUser: User): void => {
      console.log(toRegisterUser);
      this.router.navigate(['login']), {state: {successfulRegistration: true}};
    });
  }
}
