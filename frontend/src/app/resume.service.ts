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

  /** POST: initializes db with test resumés */
  initializeDb(): Observable<Array<Resume>> {
    return this.http.post<Array<Resume>>(`${this.url}/initializedb`, null);
  }

  /** POST: publishes a resumé */
  createResume(resume: Resume): Observable<Resume> {
    return this.http.post<Resume>(this.url, resume);
  }

  /** GET: gets every resumé */
  getResumes(): Observable<Array<Resume>> {
    return this.http.get<Array<Resume>>(this.url);
  }

  /** GET: gets specific resumé by its id */
  getOneResumes(resumeId: string): Observable<Resume> {
    return this.http.get<Resume>(`${this.url}/${resumeId}`);
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
