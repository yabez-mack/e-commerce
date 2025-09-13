import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitted = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    if (this.auth.login(email!, password!)) {
      
      this.router.navigate(['/']); // redirect to homepage
    } else {
      alert('Invalid login');
    }
  }



  // Easy getter for form fields
  get f() {
    return this.loginForm.controls;
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


}
