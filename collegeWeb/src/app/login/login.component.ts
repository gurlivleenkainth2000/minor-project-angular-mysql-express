import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string = null;
  errorMsg: string = null;
  loader: boolean = false;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    })
  }

  loginUser(form: FormGroup) {
    this.message = this.errorMsg = null;
    this.loader = true;
    this.http.post(`${environment.serverUrl}/login`, form.value)
      .subscribe(response => {
        this.loader = false;
        if(response['status'] == "ok") {
          this.message = response['loginType'] + " Login Successfully";
          localStorage.setItem('userObj', JSON.stringify({ ...response['response'][0] }));
          localStorage.setItem('loginType', JSON.stringify(response['loginType']));
        }

        if(response['status'] == "error") {
          this.errorMsg = response['error']['lde_message'] || response['error'];
          localStorage.setItem('userObj', null);
          localStorage.setItem('loginType', null);
        }
      })
  }

}
