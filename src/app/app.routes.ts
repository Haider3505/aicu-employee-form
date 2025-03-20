import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/stepper-page/stepper-page.component').then(
        (m) => m.StepperPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
