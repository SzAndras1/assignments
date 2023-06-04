import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ResumeService} from "../resume.service";
import {Resume} from "../resume";

@Component({
  selector: 'app-resume-details',
  templateUrl: './resume-details.component.html',
  styleUrls: ['./resume-details.component.css']
})
export class ResumeDetailsComponent implements OnInit {
  resumeId: string = this.route.snapshot.paramMap.get('id')!;
  resume: Resume = {_id: "", address: "", email: "", name: "", text: ""};
  constructor(private location: Location,
              private route: ActivatedRoute,
              private resumeService: ResumeService) {
  }

  ngOnInit(): void {
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
      });
  }
}
