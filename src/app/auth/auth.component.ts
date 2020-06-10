import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  public isLoginMode = true;
  public isLoading = false;
  public error: string = null;

  public authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router){}

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public initForm(): void{
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    });
  }

  ngOnInit() {
    this.initForm();
  }

  public onSubmit() {
    // console.log(this.authForm);
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.get('email').value.toString();
    const password = this.authForm.get('password').value.toString();
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;
    if (!this.isLoginMode) {
      authObs = this.authService.signup(email, password);
    } else {
      authObs = this.authService.login(email, password);
    }

    authObs.subscribe(resData => { // this is done since subscribe() logic is same for signup and login, in this case.
      // console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
    });

    this.authForm.reset();
  }

  public onHandleError(): void {
    this.error = null;
  }
}
