import {Component, OnInit} from '@angular/core';
import {ResumeService} from "../resume.service";
import {Resume} from "../resume";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css']
})
export class ResumeListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'address', 'details', 'update', 'delete'];
  dataSources: Resume[] = [];
  resumeForm!: FormGroup;
  toDeleteResume: Resume = {_id: "", address: "", email: "", name: "", text: ""};
  isInitializeApiCalledOnce: boolean = false;
  createOrUpdate: boolean = false;

  constructor(private resumeService: ResumeService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.resumeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      text: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.getEvery();
  }

  addFiveResume(): void {
    this.resumeService.initializeDb().subscribe(
      (resumes: Resume[]) => {
        console.log(resumes);
        this.isInitializeApiCalledOnce = true;
        this.getEvery();
      }
    )
  }

  create(): void {
    this.createOrUpdate = true;
    this.resumeForm.removeControl('_id');
    this.resumeService.createResume(this.resumeForm.value as Resume).subscribe(
      (resume: Resume) => {
        console.log(resume);
        this.getEvery();
        this.resetForm();
      }
    )
  }

  getEvery(): void {
    this.resumeService.getResumes().subscribe(
      (resumes: Resume[]) => {
        console.log(resumes);
        this.dataSources = resumes;
      });
  }

  bindToUpdate(resume: Resume): void {
    this.resumeForm.addControl('_id', new FormControl(''));
    this.setCreateOrUpdate(true)
    this.resumeForm.patchValue({
      _id: resume['_id'],
      name: resume['name'],
      email: resume['email'],
      address: resume['address'],
      text: resume['text'],
    });
  }

  bindToRemove(resume: Resume): void {
    this.toDeleteResume = resume;
  }

  delete(): void {
    this.resumeService.deleteResume(this.toDeleteResume).subscribe(
      (deletedResume: Resume) => this.getEvery());
  }

  update(): void {
    this.resumeService.updateResume(this.resumeForm.value as Resume).subscribe(
      (updatedResume: Resume) => {
        console.log(updatedResume);
        this.setCreateOrUpdate(false);
        this.resetForm();
        this.getEvery();
      });
  }

  resetForm(): void {
    this.resumeForm.reset();
  }

  setCreateOrUpdate(value: boolean): void {
    this.createOrUpdate = value;
  }

  navigateToDetail(id: string) {
    this.router.navigate([`../${id}`]);
  }
}
