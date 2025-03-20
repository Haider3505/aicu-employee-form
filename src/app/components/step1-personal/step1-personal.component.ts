import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormStateService } from '../../services/form-state.service';
import { PersonalInfo } from '../../models/form-data.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step1-personal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './step1-personal.component.html',
  styleUrls: ['./step1-personal.component.scss'],
})
export class Step1PersonalComponent implements OnInit {
  @Output() formStatusChange = new EventEmitter<boolean>();
  @Output() formValueChange = new EventEmitter<PersonalInfo>();

  form!: FormGroup;
  private fb = inject(FormBuilder);
  private formStateService = inject(FormStateService);

  ngOnInit(): void {
    this.initializeForm();

    // Check if form data exists to populate the form
    const formData = this.formStateService.getCompleteFormData();
    if (formData.personal) {
      this.form.patchValue(formData.personal);
    }

    // Listen for reset events
    this.formStateService.formReset.subscribe(() => {
      this.form.reset();
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
    });

    // Monitor form status changes
    this.form.statusChanges.subscribe(() => {
      this.formStatusChange.emit(this.form.valid);
    });

    // Monitor form value changes
    this.form.valueChanges.subscribe((value) => {
      this.formValueChange.emit(value);
      this.formStateService.updateFormData('personal', value);
    });
  }
}
