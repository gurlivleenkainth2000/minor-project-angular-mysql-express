import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  stdForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if(this.data['stdObj'] == null) {
      this.stdForm = this.fb.group({
        "name": this.fb.control("", Validators.required),
        "email": this.fb.control("", Validators.compose([Validators.required, Validators.email])),
        "crn": this.fb.control("", Validators.required),
        "urn": this.fb.control("", Validators.required),
        "mentor": this.fb.control("", Validators.required),
      });
    } else {
      let obj = this.data['stdObj'];
      this.stdForm = this.fb.group({
        "name": this.fb.control(obj.name, Validators.required),
        "email": this.fb.control(obj.email, Validators.compose([Validators.required, Validators.email])),
        "crn": this.fb.control(obj.crn, Validators.required),
        "urn": this.fb.control(obj.urn, Validators.required),
        "mentor": this.fb.control(obj.mentor, Validators.required),
      });
    }
  }

}
