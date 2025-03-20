import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  private http = inject(HttpClient);

  // Fetch all countries and extract unique regions
  getRegions(): Observable<string[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(
        map((countries) =>
          Array.from(
            new Set(
              countries
                .map((country) => country.region)
                .filter((region) => region)
            )
          )
        )
      );
  }

  // Fetch subregions based on the selected region
  getSubregions(region: string): Observable<string[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((countries) =>
        Array.from(
          new Set(
            countries
              .filter((country) => country.region === region)
              .map((country) => country.subregion)
              .filter((subregion) => subregion)
          )
        )
      )
    );
  }
}
