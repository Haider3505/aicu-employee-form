import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlattenedEmployeeData } from '../../models/form-data.type';
import { FormStateService } from '../../services/form-state.service';

@Component({
  selector: 'app-step4-preview',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './step4-preview.component.html',
  styleUrls: ['./step4-preview.component.scss'],
})
export class Step4PreviewComponent {
  @Input() formData!: FlattenedEmployeeData;

  private formStateService = inject(FormStateService);
}
