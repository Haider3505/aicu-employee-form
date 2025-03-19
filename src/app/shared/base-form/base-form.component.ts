import { Directive, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseFormComponent {
  @Output() formStatusChange = new EventEmitter<boolean>();
  @Output() formValueChange = new EventEmitter<any>();

  form!: FormGroup;

  protected emitFormStatus(): void {
    this.form.statusChanges.subscribe(() => {
      this.formStatusChange.emit(this.form.valid);
    });

    this.form.valueChanges.subscribe(() => {
      this.formValueChange.emit(this.form.value);
    });
  }
}
