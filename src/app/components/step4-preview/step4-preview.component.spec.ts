import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4PreviewComponent } from './step4-preview.component';

describe('Step4PreviewComponent', () => {
  let component: Step4PreviewComponent;
  let fixture: ComponentFixture<Step4PreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step4PreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4PreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
