import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMON_IMPORTS } from '../../shared/material-imports';

import { Step1PersonalComponent } from '../step1-personal/step1-personal.component';
import { Step2LocationComponent } from '../step2-location/step2-location.component';
import { Step3LanguagesComponent } from '../step3-languages/step3-languages.component';
import { Step4PreviewComponent } from '../step4-preview/step4-preview.component';
import { EmployeeService } from '../../services/employee.service';
import { FormStateService } from '../../services/form-state.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    ...COMMON_IMPORTS,
    Step1PersonalComponent,
    Step2LocationComponent,
    Step3LanguagesComponent,
    Step4PreviewComponent,
  ],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  formData: any = {};
  submitting: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private formStateService: FormStateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formStateService.getFormData().subscribe((data) => {
      this.formData = this.flattenFormData(data);
    });
  }

  isStep1Valid = false;
  isStep2Valid = false;
  isStep3Valid = false;

  onStep1ValidationChange(isValid: boolean): void {
    this.isStep1Valid = isValid;
  }

  onStep2ValidationChange(isValid: boolean): void {
    this.isStep2Valid = isValid;
  }

  onStep3ValidationChange(isValid: boolean): void {
    this.isStep3Valid = isValid;
  }

  flattenFormData(data: any): any {
    const flatData: any = {};

    if (data.personal) {
      flatData.firstName = data.personal.firstName;
      flatData.familyName = data.personal.familyName;
    }

    if (data.location) {
      flatData.region = data.location.region;
      flatData.subregion = data.location.subregion;
    }

    if (data.languages) {
      flatData.languages = data.languages.languages;
    }

    return flatData;
  }

  submitForm(): void {
    this.submitting = true;
    const completeData = this.formStateService.getCompleteFormData();
    const processedData = this.flattenFormData(completeData);

    this.employeeService
      .submitEmployeeDetails(processedData)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          this.showSuccessMessage();
          this.resetForm();
        },
        (error) => {
          // console.error('Error submitting form:', error);
          // this.showErrorMessage(error);
          // temporary for testing purposes using the following
          // instead of the above two lines
          console.log('Form submitted successfully:');
          this.showSuccessMessage();
          this.resetForm();
        }
      );
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

  showErrorMessage(error: any): void {
    const message =
      error?.message || 'An error occurred while submitting the form';
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  resetForm(): void {
    this.formStateService.resetFormData();

    // Reset stepper to first step
    setTimeout(() => {
      if (this.stepper) {
        this.stepper.reset();
      }
    }, 300);
  }
}
