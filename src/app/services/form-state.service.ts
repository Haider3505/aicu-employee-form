import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private formDataSubject = new BehaviorSubject<any>({});

  updateFormData(stepId: string, data: any): void {
    const currentData = this.formDataSubject.getValue();
    this.formDataSubject.next({
      ...currentData,
      [stepId]: data,
    });
  }

  getFormData(): Observable<any> {
    return this.formDataSubject.asObservable();
  }

  getCompleteFormData(): any {
    return this.formDataSubject.getValue();
  }
}
