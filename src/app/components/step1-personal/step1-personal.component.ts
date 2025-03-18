import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step1-personal',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './step1-personal.component.html',
  styleUrls: ['./step1-personal.component.scss'],
})
export class Step1PersonalComponent {
  personalForm: FormGroup;

  @Output() formStatusChange = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
    });

    // Emit the form status on form value changes
    this.personalForm.statusChanges.subscribe(() => {
      this.formStatusChange.emit(this.personalForm.valid);
    });
  }
}
