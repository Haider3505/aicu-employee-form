import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private dummyUrl = 'https://example.com/api/employees'; // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  submitEmployeeDetails(data: any): Observable<any> {
    return this.http.post(this.dummyUrl, data);
  }
}
