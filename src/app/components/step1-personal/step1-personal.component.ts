import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from '../../shared/base-form/base-form.component';
import { FormStateService } from '../../services/form-state.service';
import { COMMON_IMPORTS } from '../../shared/material-imports';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step1-personal',
  standalone: true,
  imports: [...COMMON_IMPORTS],
  templateUrl: './step1-personal.component.html',
  styleUrls: ['./step1-personal.component.scss'],
})
export class Step1PersonalComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy
{
  private formSubscription: Subscription = new Subscription();
  private formStateSubscription: Subscription = new Subscription();

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
        if (!data.personal && Object.keys(data).length === 0) {
          this.initializeForm();
        }
      });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.formStateSubscription.unsubscribe();
  }

  private initializeForm(): void {
    // If form already exists, destroy subscription first
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }

    // Create the form
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
    });

    this.emitFormStatus();

    // Create new subscription
    this.formSubscription = this.form.valueChanges.subscribe((value) => {
      this.formStateService.updateFormData('personal', value);
    });
  }
}
