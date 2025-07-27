import { Component } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registraion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registraion.component.html',
  styleUrl: './registraion.component.css',
})
export class RegistraionComponent {
  registrationForm: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
      ],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required, this.minimumAgeValidator(18)]],
      gender: ['male', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }
  onSubmit(): void {
    // Mark all fields as touched to show validation messages
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.valid) {
      console.log('form submitted', this.registrationForm.value);
    } else {
      console.log('form has errors');
    }
  }
  get firstName() {
    return this.registrationForm.get('firstName')!;
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get dob() {
    return this.registrationForm.get('dob')!;
  }
  minimumAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // Don't validate empty values
      }

      const dob = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      // Adjust age if birthday hasn't occurred yet this year
      const actualAge =
        monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())
          ? age - 1
          : age;

      return actualAge >= minAge
        ? null
        : { minimumAge: { requiredAge: minAge, actualAge } };
    };
  }
}
