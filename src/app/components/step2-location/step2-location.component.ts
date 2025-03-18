import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step2-location',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './step2-location.component.html',
  styleUrls: ['./step2-location.component.scss'],
})
export class Step2LocationComponent implements OnInit {
  locationForm!: FormGroup;
  regions: string[] = [];
  subregions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.locationForm = this.fb.group({
      region: ['', Validators.required],
      subregion: ['', Validators.required],
    });

    // Fetch regions
    this.countryService.getRegions().subscribe((data) => {
      this.regions = data;
    });

    // Listen to region selection change
    this.locationForm.get('region')?.valueChanges.subscribe((region) => {
      this.countryService.getSubregions(region).subscribe((data) => {
        this.subregions = data;
        this.locationForm.get('subregion')?.setValue('');
      });
    });
  }
}
