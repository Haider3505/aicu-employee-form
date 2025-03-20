import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormStateService } from '../../services/form-state.service';
import { CountryService } from '../../services/country.service';
import { LocationInfo } from '../../models/form-data.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step2-location',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './step2-location.component.html',
  styleUrls: ['./step2-location.component.scss'],
})
export class Step2LocationComponent implements OnInit {
  @Output() formStatusChange = new EventEmitter<boolean>();
  @Output() formValueChange = new EventEmitter<LocationInfo>();

  form!: FormGroup;
  regions: string[] = [];
  subregions: string[] = [];

  private fb = inject(FormBuilder);
  private countryService = inject(CountryService);
  private formStateService = inject(FormStateService);

  ngOnInit(): void {
    this.initializeForm();

    // Check if form data exists to populate the form
    const formData = this.formStateService.getCompleteFormData();
    if (formData.location) {
      this.form.patchValue(formData.location);
      // Load subregions for the selected region
      if (formData.location.region) {
        this.loadSubregions(formData.location.region);
      }
    }

    // Listen for reset events
    this.formStateService.formReset.subscribe(() => {
      this.form.reset();
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      region: ['', Validators.required],
      subregion: ['', Validators.required],
    });

    // Fetch regions
    this.countryService.getRegions().subscribe((data) => {
      this.regions = data;
    });

    // Listen to region selection change
    this.form.get('region')?.valueChanges.subscribe((region) => {
      if (region) {
        this.loadSubregions(region);
      }
    });

    // Monitor form status changes
    this.form.statusChanges.subscribe(() => {
      this.formStatusChange.emit(this.form.valid);
    });

    // Monitor form value changes
    this.form.valueChanges.subscribe((value) => {
      this.formValueChange.emit(value);
      this.formStateService.updateFormData('location', value);
    });
  }

  private loadSubregions(region: string): void {
    this.countryService.getSubregions(region).subscribe((data) => {
      this.subregions = data;
      this.form.get('subregion')?.setValue('');
    });
  }
}
