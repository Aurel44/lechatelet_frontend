import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tfaFlag: boolean = false
  userObject = {
    uname: "",
    upass: "",
    authcode: ""
  }
  errorMessage!: string
  constructor(private _loginService: LoginServiceService, private _router: Router) {
  }

  ngOnInit() {
  }

  loginUser() {
    this._loginService.loginAuth(this.userObject).subscribe((data) => {
      this.errorMessage;
      if (data.status === 200) {
        this._loginService.updateAuthStatus(true);
        this._router.navigateByUrl('/home');
      }
      if (data.body! === 206) {
        this.tfaFlag = true;
      }
      if (data.status === 403) {
        this.errorMessage = data.statusText;
      }
      if (data.status === 404) {
        this.errorMessage = data.statusText;
      }
    })
  }
}
