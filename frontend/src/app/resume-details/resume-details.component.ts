import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ResumeService} from "../resume.service";
import {Resume} from "../resume";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-resume-details',
  templateUrl: './resume-details.component.html',
  styleUrls: ['./resume-details.component.css']
})
export class ResumeDetailsComponent implements OnInit {
  resumeId: string = this.route.snapshot.paramMap.get('id')!;
  resume: Resume = {_id: "", address: "", email: "", name: "", text: ""};
  public resumeForm!: FormGroup;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private resumeService: ResumeService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.resumeForm = this.fb.group({
      name: [''],
      email: [''],
      address: [''],
      text: [''],
    });
    this.getResume();
  }

  goBack(): void {
    this.location.back();
  }

  getResume(): void {
    this.resumeService.getOneResumes(this.resumeId).subscribe(
      (receivedResume: Resume) => {
        console.log(receivedResume);
        this.resume = receivedResume
        this.resumeForm.patchValue({
          name: receivedResume['name'],
          email: receivedResume['email'],
          address: receivedResume['address'],
          text: receivedResume['text'],
        });
      });
  }
}
