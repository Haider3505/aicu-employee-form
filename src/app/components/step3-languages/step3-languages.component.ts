import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { BaseFormComponent } from '../../shared/base-form/base-form.component';
import { FormStateService } from '../../services/form-state.service';
import { COMMON_IMPORTS } from '../../shared/material-imports';

@Component({
  selector: 'app-step3-languages',
  standalone: true,
  imports: [...COMMON_IMPORTS],
  templateUrl: './step3-languages.component.html',
  styleUrls: ['./step3-languages.component.scss'],
})
export class Step3LanguagesComponent
  extends BaseFormComponent
  implements OnInit
{
  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      languages: this.fb.array([this.createLanguageField()]),
    });

    this.emitFormStatus();

    this.form.valueChanges.subscribe((value) => {
      this.formStateService.updateFormData('languages', value);
    });
  }

  get languages(): FormArray {
    return this.form.get('languages') as FormArray;
  }

  createLanguageField() {
    return this.fb.group({
      language: ['', Validators.required],
    });
  }

  addLanguage(): void {
    this.languages.push(this.createLanguageField());
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }
}
