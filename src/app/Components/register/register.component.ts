import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';
  
  constructor (
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rep_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      if (this.registerForm.value.password === this.registerForm.value.rep_password) {
        this.authService.register(this.registerForm.value).subscribe({
          next: (response) => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.errorMessage = 'Registration Failed';
          }
        })
      } else {
        this.errorMessage = 'Passwords do not match';
      }
    }
  }
}
