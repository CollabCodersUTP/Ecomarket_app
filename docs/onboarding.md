# Onboarding Documentation for Ecomarket Project

## Introduction
Welcome to the Ecomarket project! This document serves as an onboarding guide for new developers joining the team. It outlines the project structure, development environment setup, and best practices to follow while contributing to the project.

## Project Structure
The Ecomarket project is divided into several key directories:

- **frontend**: Contains the Next.js application for the user interface.
- **backend**: Contains the Java-based backend services for authentication, catalog management, and notifications.
- **infra**: Contains infrastructure-related files, including Docker configurations and Terraform scripts.
- **scripts**: Contains utility scripts for local development and database migrations.
- **docs**: Contains documentation files, including architecture and API specifications.
- **tests**: Contains test directories for end-to-end and integration testing.

## Development Environment Setup

### Prerequisites
- Node.js (version 14 or higher)
- Java JDK (version 11 or higher)
- Gradle (for backend services)
- Docker (for containerization)
- Git (for version control)

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```
   cd ecomarket/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```
   cd ecomarket/backend
   ```

2. Build the backend services:
   ```
   ./gradlew build
   ```

3. Run the backend services:
   ```
   ./gradlew bootRun
   ```

### Running with Docker
To run the entire application using Docker, navigate to the `infra` directory and use Docker Compose:
```
cd ecomarket/infra
docker-compose up
```

## Best Practices
- **Code Quality**: Follow the coding standards and guidelines defined in the `.eslintrc.js` and `tsconfig.json` files for the frontend, and adhere to Java best practices for the backend.
- **Documentation**: Document your code and write clear commit messages. Update relevant documentation files in the `docs` directory as needed.
- **Testing**: Write unit tests for your code and ensure they pass before submitting a pull request. Use the existing test structure in the `tests` directory.
- **Branching**: Use feature branches for new development. Follow the naming convention `feature/<feature-name>` for branches.
- **Pull Requests**: Submit pull requests for code reviews. Ensure that your code is well-tested and adheres to the project's coding standards.

## Conclusion
We are excited to have you on board! If you have any questions or need assistance, feel free to reach out to the team. Happy coding!