# Open CI/CD Pipeline

## Description

This project originated as the core pipeline infrastructure developed for a major CRM Software company. Originally designed to support the high volume of deliveries and testing for their critical enterprise services, the project has been refactored, stripped of any sensitive business rules or proprietary data, and is now released as open source.

The goal of this repository is to provide a clean, scalable, and secure boilerplate for implementing Continuous Integration and Continuous Deployment (CI/CD) pipelines for Node.js applications, containerized via Docker and orchestrated by GitHub Actions.

## Technologies & Tools

- Backend: Node.js (Express)
- Testing: Jest and Supertest
- Containerization: Docker (Alpine Linux based)
- Automation & CI/CD: GitHub Actions

## How the Pipeline Works

The automation flow was designed to ensure code quality before any environment promotion. It operates in two main stages:

1. Continuous Integration (CI): On every Push or Pull Request to the `main` branch, GitHub Actions initializes a clean environment, installs dependencies, and runs the full suite of unit tests. If any test fails, the pipeline blocks the workflow.
2. Continuous Deployment (CD): If the testing stage passes without errors during a Push event, the pipeline builds a new Docker image of the application and automatically pushes it to the configured container registry (Docker Hub). The image is tagged both as `latest` and with the commit SHA (to allow for easy version rollbacks if necessary).

## Usage Instructions (Local)

### Prerequisites
- Node.js (version 20 or higher)
- Docker installed on your machine

### Running the Application via Node.js

To run the application locally:

```bash
npm install
npm start
```

The server will start on port 3000. To test the integration and health routes, visit:
- http://localhost:3000/
- http://localhost:3000/health

To run the unit test suite:

```bash
npm test
```

### Running via Docker

To build the image and run it locally using containers:

```bash
docker build -t open-cicd-app .
docker run -p 3000:3000 -d open-cicd-app
```

## Pipeline Configuration (GitHub Secrets)

For the GitHub Actions pipeline to successfully perform the CD stage (pushing the Docker image), you must configure the following secrets in your repository under Settings > Secrets and variables > Actions:

- `DOCKER_USERNAME`: Your Docker Hub username.
- `DOCKER_PASSWORD`: Your Docker Hub password or Personal Access Token.

## License

Distributed under the MIT License. See the LICENSE file for more information.
