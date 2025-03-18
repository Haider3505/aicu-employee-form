import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step4-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step4-preview.component.html',
})
export class Step4PreviewComponent {
  @Input() formData!: any;
}
