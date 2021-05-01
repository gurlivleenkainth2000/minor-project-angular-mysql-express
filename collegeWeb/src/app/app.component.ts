import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { StudentsComponent } from './entryComponent/students/students.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'collegeWeb';

  keys: string[];
  stdRecords: any[];

  constructor(private httpClient: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.getStudentRecods();
  }

  getStudentRecods() {
    this.httpClient
      .get(`${environment.serverUrl}/students`, {
        observe: 'body',
        responseType: 'json',
      })
      .subscribe((response: any) => {
        this.keys = Object.keys(response[0]);
        this.stdRecords = response;
      });
  }

  async openStdDialog() {
    let data = await this.dialog
      .open(StudentsComponent, {
        data: { stdObj: null },
        panelClass: ['col-12', 'col-sm-6'],
      })
      .afterClosed()
      .toPromise();
    // console.log(data);
    if (data != null && data != undefined) {
      this.httpClient
        .post(`${environment.serverUrl}/students`, data)
        .subscribe((response) => {
          // console.log(response);
          if (response['status'] == 'ok') {
            this.getStudentRecods();
          }
        });
    }
  }

  async updateStudent(std) {
    let data = await this.dialog
      .open(StudentsComponent, {
        data: { stdObj: std },
        panelClass: ['col-12', 'col-sm-6'],
      })
      .afterClosed()
      .toPromise();
    // console.log(data);
    if (data != null && data != undefined) {
      this.httpClient
        .put(`${environment.serverUrl}/students/${std['id']}`, data)
        .subscribe((response) => {
          // console.log(response);
          if (response['status'] == 'ok') {
            this.getStudentRecods();
          }
        });
    }
  }

  deleteStudent(stdId) {
    this.httpClient
      .delete(`${environment.serverUrl}/students/${stdId}`)
      .subscribe((response) => {
        // console.log(response);
        if (response['status'] == 'ok') {
          this.getStudentRecods();
        }
      });
  }
}
