import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData:any = {"email":"","password":""}

  constructor(private _auth:AuthService, private _router:Router) { }

  ngOnInit() {
  }

  loginUser () {
    console.log(this.loginUserData)
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        if(res.email=="admin@gmail.com")
          this._router.navigate(['/crud']); ////crud application
        else
          this._router.navigate(['/survey']);
       },
      err => alert(err.message)
    )
    console.log(localStorage)
    // form.reset();
  }


}
