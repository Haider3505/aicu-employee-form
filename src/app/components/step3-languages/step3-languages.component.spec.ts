import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3LanguagesComponent } from './step3-languages.component';

describe('Step3LanguagesComponent', () => {
  let component: Step3LanguagesComponent;
  let fixture: ComponentFixture<Step3LanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3LanguagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3LanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
