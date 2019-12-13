import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../shared/services/http.service';
import { CommunicationService } from '../../shared/services/communication.service';
import { ENDPOINTS } from 'src/app/shared/services/end-points.enum';

import { USER } from '../../models/app.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  toggleLoginReg = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginvalidation = false;
  loginSpin: boolean;
  registerSpin: boolean;
  constructor(private http: HttpService, private router: Router, private passdata: CommunicationService) { }

  ngOnInit() {
    /* Loginform creation */
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });

    /* registration form creation */
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      emailid: new FormControl(null, [Validators.required, Validators.email])
    });
    const usesession = sessionStorage.getItem('user');
    if (usesession) {

      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }

  }

  /* toggle login form and registration form */
  toggleForm() {
    this.toggleLoginReg = !this.toggleLoginReg;
  }

  /* Login api submit */
  loginSubmit() {

    const queryparams = {
      userId: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.loginSpin = true;
    this.http.createData(ENDPOINTS.LOGIN, queryparams).subscribe(
      (res: USER) => {
        this.loginSpin = false;
        if (res.statusCode === 200) {
          const data = {
            userDetails: true
          };
          sessionStorage.clear();
          this.loginvalidation = false;
          sessionStorage.setItem('user', JSON.stringify(res));
          this.passdata.sendMessage(data);
          this.router.navigate(['/claim-list']);
        } else {
          sessionStorage.clear();
          this.loginvalidation = true;
        }
      }
    );

  }




}
