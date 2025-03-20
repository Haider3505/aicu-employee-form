import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormStateService } from '../../services/form-state.service';
import { LanguageInfo } from '../../models/form-data.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step3-languages',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './step3-languages.component.html',
  styleUrls: ['./step3-languages.component.scss'],
})
export class Step3LanguagesComponent implements OnInit {
  @Output() formStatusChange = new EventEmitter<boolean>();
  @Output() formValueChange = new EventEmitter<LanguageInfo[]>();

  form!: FormGroup;
  newLanguageControl = new FormControl('', Validators.required);

  private fb = inject(FormBuilder);
  private formStateService = inject(FormStateService);

  ngOnInit(): void {
    this.initializeForm();

    // Check if form data exists to populate the form
    const formData = this.formStateService.getCompleteFormData();
    if (formData.languages && formData.languages.length > 0) {
      formData.languages.forEach((lang) => {
        this.languages.push(this.createLanguageField(lang.language));
      });
    }

    // Listen for reset events
    this.formStateService.formReset.subscribe(() => {
      this.form.reset();
      while (this.languages.length > 0) {
        this.languages.removeAt(0);
      }
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      languages: this.fb.array([]),
    });

    // Monitor form status changes
    this.form.statusChanges.subscribe(() => {
      this.formStatusChange.emit(this.form.valid);
    });

    // Monitor form value changes
    this.form.valueChanges.subscribe((value) => {
      this.formValueChange.emit(this.languages.value);
      this.formStateService.updateFormData('languages', this.languages.value);
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
      this.formValueChange.emit(this.languages.value);
    }
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
    this.formValueChange.emit(this.languages.value);
  }
}
