# Employee Information Form

A multi-step form application built with Angular 19 that collects and manages employee information through a guided process.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Development Server](#development-server)
- [Code Scaffolding](#code-scaffolding)
- [Building](#building)
- [Running Unit Tests](#running-unit-tests)
- [Running End-to-End Tests](#running-end-to-end-tests)
- [Additional Resources](#additional-resources)
- [License](#license)

## Features

- Multi-step form with validation
- Reactive forms implementation
- Dynamic region and subregion selection
- Language management with add/remove functionality
- Form state management across steps
- Preview of collected information before submission
- Responsive Material Design UI

## Technology Stack

- Angular 19.2.1
- Angular Material
- RxJS
- Standalone Components
- HTTP Client for API Integration

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## License
This project is licensed under the MIT License - see the LICENSE file for details.