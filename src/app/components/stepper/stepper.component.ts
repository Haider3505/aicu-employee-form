import { Component, OnInit } from '@angular/core';
import { COMMON_IMPORTS } from '../../shared/material-imports';

import { Step1PersonalComponent } from '../step1-personal/step1-personal.component';
import { Step2LocationComponent } from '../step2-location/step2-location.component';
import { Step3LanguagesComponent } from '../step3-languages/step3-languages.component';
import { Step4PreviewComponent } from '../step4-preview/step4-preview.component';
import { EmployeeService } from '../../services/employee.service';
import { FormStateService } from '../../services/form-state.service';

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
  formData: any = {};

  constructor(
    private employeeService: EmployeeService,
    private formStateService: FormStateService
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
    const completeData = this.formStateService.getCompleteFormData();
    const processedData = this.flattenFormData(completeData);

    this.employeeService.submitEmployeeDetails(processedData).subscribe(
      (response) => {
        console.log('Form submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting form:', error);
      }
    );
  }
}
