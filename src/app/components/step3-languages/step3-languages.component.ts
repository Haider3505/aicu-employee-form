import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-step3-languages',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './step3-languages.component.html',
  styleUrls: ['./step3-languages.component.scss'],
})
export class Step3LanguagesComponent {
  @Output() formStatusChange = new EventEmitter<boolean>();

  languagesForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.languagesForm = this.fb.group({
      languages: this.fb.array([this.createLanguageField()]),
    });

    this.languagesForm.statusChanges.subscribe(() => {
      this.formStatusChange.emit(this.languagesForm.valid);
    });
  }

  get languages(): FormArray {
    return this.languagesForm.get('languages') as FormArray;
  }

  createLanguageField(): FormGroup {
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
