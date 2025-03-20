import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlattenedEmployeeData } from '../models/form-data.type';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private dummyUrl = 'https://example.com/api/employees'; // Replace with actual API endpoint
  private http = inject(HttpClient);

  submitEmployeeDetails(data: FlattenedEmployeeData): Observable<any> {
    return this.http.post(this.dummyUrl, data);
  }
}
