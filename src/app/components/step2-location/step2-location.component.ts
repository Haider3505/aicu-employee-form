import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormStateService } from '../../services/form-state.service';
import { CountryService } from '../../services/country.service';
import { BaseFormComponent } from '../../shared/base-form/base-form.component';
import { COMMON_IMPORTS } from '../../shared/material-imports';

@Component({
  selector: 'app-step2-location',
  standalone: true,
  imports: [...COMMON_IMPORTS],
  templateUrl: './step2-location.component.html',
  styleUrls: ['./step2-location.component.scss'],
})
export class Step2LocationComponent
  extends BaseFormComponent
  implements OnInit
{
  regions: string[] = [];
  subregions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private formStateService: FormStateService
  ) {
    super();
  }

  ngOnInit(): void {
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
      this.countryService.getSubregions(region).subscribe((data) => {
        this.subregions = data;
        this.form.get('subregion')?.setValue('');
      });
    });

    this.emitFormStatus();

    this.form.valueChanges.subscribe((value) => {
      this.formStateService.updateFormData('location', value);
    });
  }
}
