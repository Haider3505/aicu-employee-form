import { Component, Input, OnInit } from '@angular/core';
import { FormStateService } from '../../services/form-state.service';
import { COMMON_IMPORTS } from './../../shared/material-imports';

@Component({
  selector: 'app-step4-preview',
  standalone: true,
  imports: [...COMMON_IMPORTS],
  templateUrl: './step4-preview.component.html',
  styleUrls: ['./step4-preview.component.scss']
})
export class Step4PreviewComponent implements OnInit {
  @Input() formData: any;

  constructor(private formStateService: FormStateService) {}

  ngOnInit(): void {
    // this.formStateService.getFormData().subscribe((data) => {
    // });
  }
}
