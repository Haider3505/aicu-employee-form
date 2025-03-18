import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Step1PersonalComponent } from '../step1-personal/step1-personal.component';
import { Step2LocationComponent } from '../step2-location/step2-location.component';
import { Step3LanguagesComponent } from '../step3-languages/step3-languages.component';
import { Step4PreviewComponent } from '../step4-preview/step4-preview.component';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    Step1PersonalComponent,
    Step2LocationComponent,
    Step3LanguagesComponent,
    Step4PreviewComponent,
  ],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  formData: any = {};

  constructor(private employeeService: EmployeeService) {}

  isFirstStepValid = false;

  onFormStatusChange(isValid: boolean): void {
    this.isFirstStepValid = isValid;
  }

  submitForm(formData: any): void {
    const combinedData = {
      firstName: '',
      familyName: '',
      region: '',
      subregion: '',
      languages: [],
    }; //replace with actual data

    this.employeeService.submitEmployeeDetails(formData).subscribe(
      (response) => {
        console.log('Form submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting form:', error);
      }
    );
  }
}
