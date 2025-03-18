import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2LocationComponent } from './step2-location.component';

describe('Step2LocationComponent', () => {
  let component: Step2LocationComponent;
  let fixture: ComponentFixture<Step2LocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step2LocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
