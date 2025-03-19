import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { BaseFormComponent } from '../../shared/base-form/base-form.component';
import { FormStateService } from '../../services/form-state.service';
import { COMMON_IMPORTS } from '../../shared/material-imports';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step3-languages',
  standalone: true,
  imports: [...COMMON_IMPORTS],
  templateUrl: './step3-languages.component.html',
  styleUrls: ['./step3-languages.component.scss'],
})
export class Step3LanguagesComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy
{
  private formSubscription: Subscription = new Subscription();
  private formStateSubscription: Subscription = new Subscription();
  newLanguageControl = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();

    // Subscribe to the form state to detect resets
    this.formStateSubscription = this.formStateService
      .getFormData()
      .subscribe((data) => {
        // If form state is reset (empty object), reinitialize the form
        if (!data.languages && Object.keys(data).length === 0) {
          this.initializeForm();
        }
      });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.formStateSubscription.unsubscribe();
  }

  private initializeForm(): void {
    // if form already initialized, destroy subscription first
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }

    // Initialize the form with empty language array
    this.form = this.fb.group({
      languages: this.fb.array([]),
    });

    this.emitFormStatus();

    this.formSubscription = this.form.valueChanges.subscribe((value) => {
      this.formStateService.updateFormData('languages', value);
    });
  }

  get languages(): FormArray {
    return this.form.get('languages') as FormArray;
  }

  createLanguageField(value: string) {
    return this.fb.group({
      language: [value, Validators.required],
    });
  }

  addLanguage(): void {
    if (
      this.newLanguageControl.valid &&
      this.newLanguageControl.value?.trim()
    ) {
      this.languages.push(
        this.createLanguageField(this.newLanguageControl.value)
      );
      this.newLanguageControl.reset();
    }
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }
}
