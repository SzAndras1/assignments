import {Component, OnInit} from '@angular/core';
import {ResumeService} from "../resume.service";
import {Resume} from "../resume";

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css']
})
export class ResumeListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'address', 'update', 'delete'];
  //resumes: Resume[] = [];
  dataSources: Resume[] = [];

  constructor(private resumeService: ResumeService) {
  }

  getEvery(): void {
    this.resumeService.getResumes().subscribe(
      (incResumes: Resume[]) => {
        console.log(incResumes);
        this.dataSources = incResumes;
      });
  }

  ngOnInit(): void {
    this.getEvery();
  }

  delete(body: Resume): void {
    this.resumeService.deleteResume(body).subscribe(
      (updatedResume: Resume) => this.getEvery());
  }

  update(body: Resume): void {
    this.resumeService.updateResume(body).subscribe(
      (updatedResume: Resume) => this.getEvery());
  }
}
