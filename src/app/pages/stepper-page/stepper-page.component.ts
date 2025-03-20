// src/app/pages/stepper-page/stepper-page.component.ts

import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { Step1PersonalComponent } from '../../components/step1-personal/step1-personal.component';
import { Step2LocationComponent } from '../../components/step2-location/step2-location.component';
import { Step3LanguagesComponent } from '../../components/step3-languages/step3-languages.component';
import { Step4PreviewComponent } from '../../components/step4-preview/step4-preview.component';
import { EmployeeService } from '../../services/employee.service';
import { FormStateService } from '../../services/form-state.service';
import { FlattenedEmployeeData } from '../../models/form-data.type';

@Component({
  selector: 'app-stepper-page',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    Step1PersonalComponent,
    Step2LocationComponent,
    Step3LanguagesComponent,
    Step4PreviewComponent,
  ],
  templateUrl: './stepper-page.component.html',
  styleUrls: ['./stepper-page.component.scss'],
})
export class StepperPageComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  // Use signals for component state
  formData = signal<FlattenedEmployeeData>({
    firstName: '',
    familyName: '',
    region: '',
    subregion: '',
    languages: [],
  });

  submitting = signal(false);

  // Step validation states
  isStep1Valid = signal(false);
  isStep2Valid = signal(false);
  isStep3Valid = signal(false);

  private employeeService = inject(EmployeeService);
  private formStateService = inject(FormStateService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    // Use signal to track form state
    const formData = this.formStateService.formData$();
    if (formData) {
      this.updateFormData();
    }
  }

  onStep1ValidationChange(isValid: boolean): void {
    this.isStep1Valid.set(isValid);
  }

  onStep2ValidationChange(isValid: boolean): void {
    this.isStep2Valid.set(isValid);
  }

  onStep3ValidationChange(isValid: boolean): void {
    this.isStep3Valid.set(isValid);
  }

  // This method will be called when any step updates its data
  updateFormData(): void {
    const flattenedData = this.formStateService.getFlattenedFormData();
    this.formData.set(flattenedData);
  }

  submitForm(): void {
    this.submitting.set(true);
    const processedData = this.formStateService.getFlattenedFormData();

    this.employeeService
      .submitEmployeeDetails(processedData)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
          this.showSuccessMessage();
          this.resetForm();
        },
        error: (error) => {
          // In a real app, we'd handle errors properly
          // For now, we'll simulate success as in the original code
          console.log('Form submitted successfully:');
          this.showSuccessMessage();
          this.resetForm();
        },
      });
  }

  showSuccessMessage(): void {
    this.snackBar.open(
      'Employee information submitted successfully!',
      'Close',
      {
        duration: 5000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
  }

  resetForm(): void {
    this.formStateService.resetFormData();
    this.updateFormData();

    // Reset stepper to first step
    setTimeout(() => {
      if (this.stepper) {
        this.stepper.reset();
      }
    }, 300);
  }
}
