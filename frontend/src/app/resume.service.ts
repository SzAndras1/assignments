import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Resume} from "./resume";

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private url: string = 'api/v1/resume'

  constructor(private http: HttpClient) {
  }

  /** GET: gets every resumé */
  getResumes(): Observable<Array<Resume>> {
    return this.http.get<Array<Resume>>(this.url);
  }

  /** PUT: updates specific resumé */
  updateResume(body: Resume) {
    return this.http.put<Resume>(this.url, body);
  }

  /** DELETE: deletes specific resumé */
  deleteResume(body: Resume) {
    return this.http.delete<Resume>(this.url, {body: body});
  }
}
