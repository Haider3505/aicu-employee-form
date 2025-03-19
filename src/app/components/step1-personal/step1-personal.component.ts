import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from '../../shared/base-form/base-form.component';
import { FormStateService } from '../../services/form-state.service';
import { COMMON_IMPORTS } from '../../shared/material-imports';

@Component({
  selector: 'app-step1-personal',
  standalone: true,
  imports: [...COMMON_IMPORTS],
  templateUrl: './step1-personal.component.html',
  styleUrls: ['./step1-personal.component.scss'],
})
export class Step1PersonalComponent
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
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
    });

    this.emitFormStatus();

    this.form.valueChanges.subscribe((value) => {
      this.formStateService.updateFormData('personal', value);
    });
  }
}
