# Ecomarket Project Architecture

## Overview
The Ecomarket project is a collaborative web application designed to facilitate the marketing and sale of ecological products. The application is structured to allow team members to work independently on different features while adhering to best programming practices.

## Project Structure
The project is divided into several key components:

### Frontend
- **Framework**: Next.js
- **Directory Structure**:
  - `src/app`: Contains the main layout component.
  - `src/pages/api`: API routes for handling requests.
  - `src/components`: Reusable UI and shared components.
  - `src/features`: Feature-specific directories for authentication, catalog, and notifications.
  - `src/services`: API client for handling requests.
  - `src/contexts`: React context providers for state management.
  - `src/hooks`: Custom hooks for shared logic.
  - `src/styles`: Stylesheets for the application.
  - `src/types`: TypeScript types for type safety.

### Backend
- **Framework**: Spring Boot (Java)
- **Directory Structure**:
  - `services/auth-service`: Handles user registration and authentication.
  - `services/catalog-service`: Manages product catalog and visualization.
  - `services/notification-service`: Integrates notification functionalities for user actions.
  - `services/common`: Contains shared utilities and common code.

### Infrastructure
- **Containerization**: Docker
- **Configuration**:
  - `docker-compose.yml`: Manages multi-container applications.
  - `Dockerfile.backend`: Builds the backend service.
  - `Dockerfile.frontend`: Builds the frontend service.
  - `terraform`: Infrastructure as code for cloud deployment.

### Testing
- **Types of Tests**:
  - End-to-end tests using Cypress located in `tests/e2e/cypress`.
  - Integration tests located in `tests/integration`.

### Documentation
- **Docs Directory**: Contains architecture, API, and onboarding documentation to assist developers in understanding the project structure and contributing effectively.

## Best Practices
- **Modular Design**: Each feature is encapsulated within its own directory, promoting separation of concerns.
- **Version Control**: Use of Git for version control, with a clear branching strategy for feature development.
- **Continuous Integration/Deployment**: Automated workflows defined in `.github/workflows` for CI/CD processes.
- **Code Quality**: ESLint and Prettier configurations to maintain code quality and consistency across the codebase.

## Conclusion
This architecture provides a solid foundation for the Ecomarket project, enabling team members to work independently while ensuring that the application remains maintainable and scalable.