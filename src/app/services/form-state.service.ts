import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private formDataSubject = new BehaviorSubject<any>({});
  private formData: any = {};

  constructor() {}

  updateFormData(step: string, data: any): void {
    this.formData[step] = data;
    this.formDataSubject.next(this.formData);
  }

  getFormData(): Observable<any> {
    return this.formDataSubject.asObservable();
  }

  getCompleteFormData(): any {
    return this.formData;
  }

  resetFormData(): void {
    this.formData = {};
    this.formDataSubject.next(this.formData);
  }
}
