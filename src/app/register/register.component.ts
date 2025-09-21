import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })), // when element enters or leaves
      transition(':enter', [ // 👈 fade in
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [ // 👈 fade out
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideFade', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })), // before enter
      transition(':enter', [
        animate('900ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  submitted = false;

  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      verify_password: ['', [Validators.required]],
    },
    { validators: RegisterComponent.passwordMatchValidator } // 👈 Custom validator applied here
  );

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    }

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
  get verify_password() {

    return this.loginForm.get('verify_password');
    ;
  }
  static passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirm = group.get('verify_password')?.value;
    return password === confirm ? null : { mismatch: true };
  };
  private addPasswordMatchWatcher() {
    this.loginForm.get('verify_password')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });

    this.loginForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  private checkPasswords() {
    const password = this.loginForm.get('password')?.value;
    const verifyPassword = this.loginForm.get('verify_password')?.value;

    if (password && verifyPassword && password !== verifyPassword) {
      this.verify_password?.setErrors({ mismatch: true });
    } else {
      // Clear mismatch if exists
      if (this.verify_password?.hasError('mismatch')) {
        this.verify_password?.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      verify_password: ['', [Validators.required]],
    });

    this.addPasswordMatchWatcher();
  }
}
