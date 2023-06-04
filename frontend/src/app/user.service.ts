import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'api/v1/user'

  subjectIsLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  /** POST: create a user if username is unique. Will return 400 if username already exists */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/register', user).pipe(
      tap(() => console.log("successful login!")))
  }

  /** POST: log in to the app. Will return 400 if username or/and password does not match */
  login(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/login', user)
  }

}
