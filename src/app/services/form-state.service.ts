import { Injectable, signal, EventEmitter } from '@angular/core';
import {
  EmployeeFormData,
  FlattenedEmployeeData,
} from '../models/form-data.type';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  // Using a signal to manage form data
  private formData = signal<EmployeeFormData>({});

  public formReset = new EventEmitter<void>();

  // Expose the form data as a read-only signal
  public formData$ = this.formData.asReadonly();

  updateFormData(step: 'personal' | 'location' | 'languages', data: any): void {
    this.formData.update((currentData) => ({
      ...currentData,
      [step]: data,
    }));
  }

  getCompleteFormData(): EmployeeFormData {
    return this.formData();
  }

  resetFormData(): void {
    this.formData.set({});
    // Emit reset event
    this.formReset.emit();
  }

  // Helper method to flatten the form data for API submission
  getFlattenedFormData(): FlattenedEmployeeData {
    const data = this.formData();
    return {
      firstName: data.personal?.firstName || '',
      familyName: data.personal?.familyName || '',
      region: data.location?.region || '',
      subregion: data.location?.subregion || '',
      languages: data.languages || [],
    };
  }
}
