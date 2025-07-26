import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registraion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registraion.component.html',
  styleUrl: './registraion.component.css'
})
export class RegistraionComponent {
registrationForm: FormGroup;
 constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['male', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue]
    });

    // Debugging subscriptions
    this.registrationForm.valueChanges.subscribe(values => {
      console.log('Form values changed:', values);
    });

    this.registrationForm.statusChanges.subscribe(status => {
      console.log('Form status changed:', status);
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
      // Add your form submission logic here
    } else {
      console.log('Form is invalid');
      this.registrationForm.markAllAsTouched();
      
      // Log detailed validation errors
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.get(key);
        if (control?.invalid) {
          console.error(`${key} errors:`, control.errors);
        }
      });
    }
  }

  getControlNames(): string[] {
    return Object.keys(this.registrationForm.controls);
  }
}