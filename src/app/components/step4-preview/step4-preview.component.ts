import { Component, Input, OnInit } from '@angular/core';
import { FormStateService } from '../../services/form-state.service';
import { COMMON_IMPORTS } from './../../shared/material-imports';

@Component({
  selector: 'app-step4-preview',
  standalone: true,
  imports: [...COMMON_IMPORTS],
  templateUrl: './step4-preview.component.html',
})
export class Step4PreviewComponent implements OnInit {
  @Input() formData: any;

  constructor(private formStateService: FormStateService) {}

  ngOnInit(): void {
    // Optional: If you want to directly access the form data from the service
    this.formStateService.getFormData().subscribe((data) => {
      // Can be used for additional processing if needed
    });
  }
}
