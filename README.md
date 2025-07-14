# Calculator App - Kubernetes-Ready Microservices

[![Version](https://img.shields.io/badge/Version-v1.0.0-brightgreen.svg)](https://github.com/DharshanSR/calculator-k8s/releases)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey.svg)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326ce5.svg)](https://kubernetes.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, cloud-native calculator application built with microservices architecture, featuring a React frontend and Express.js backend, fully containerized and Kubernetes-ready for scalable deployment.

**Current Version: v1.0.0** - Production ready release with complete Docker and Kubernetes support.

## Architecture Overview

This application follows a **microservices architecture** pattern with clean separation of concerns, designed for cloud-native deployment using Docker containers orchestrated by Kubernetes. The architecture supports both local development and production deployment scenarios.

### Complete System Architecture

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                              KUBERNETES CLUSTER                                │
│                                                                                │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                         MINIKUBE (LOCAL DEV)                            │   │
│  │                                                                         │   │
│  │  ┌───────────────────────────────────────────────────────────────────┐  │   │
│  │  │                     KUBERNETES MASTER NODE                        │  │   │
│  │  │                                                                   │  │   │
│  │  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │  │   │
│  │  │  │   API Server    │  │   Scheduler     │  │  Controller     │    │  │   │
│  │  │  │                 │  │                 │  │   Manager       │    │  │   │
│  │  │  └─────────────────┘  └─────────────────┘  └─────────────────┘    │  │   │
│  │  └───────────────────────────────────────────────────────────────────┘  │   │
│  │                                    │                                    │   │
│  │                                    ▼                                    │   │
│  │  ┌───────────────────────────────────────────────────────────────────┐  │   │
│  │  │                    KUBERNETES WORKER NODE                         │  │   │
│  │  │                                                                   │  │   │
│  │  │  ┌─────────────────────────────────────────────────────────────┐  │  │   │
│  │  │  │                    FRONTEND POD                             │  │  │   │
│  │  │  │                                                             │  │  │   │
│  │  │  │  ┌─────────────────┐      ┌─────────────────┐               │  │  │   │
│  │  │  │  │  React Frontend │ ◄──► │     Nginx       │               │  │  │   │
│  │  │  │  │   (Port 3000)   │      │   (Port 80)     │               │  │  │   │
│  │  │  │  │                 │      │                 │               │  │  │   │
│  │  │  │  └─────────────────┘      └─────────────────┘               │  │  │   │
│  │  │  └─────────────────────────────────────────────────────────────┘  │  │   │
│  │  │                                    │                              │  │   │
│  │  │                             HTTP/REST API                         │  │   │
│  │  │                                    │                              │  │   │
│  │  │                                    ▼                              │  │   │
│  │  │  ┌─────────────────────────────────────────────────────────────┐  │  │   │
│  │  │  │                    BACKEND POD                              │  │  │   │
│  │  │  │                                                             │  │  │   │
│  │  │  │  ┌─────────────────┐      ┌─────────────────┐               │  │  │   │
│  │  │  │  │ Express Backend │ ◄──► │     Node.js     │               │  │  │   │
│  │  │  │  │   (Port 8081)   │      │   Runtime       │               │  │  │   │
│  │  │  │  │                 │      │                 │               │  │  │   │
│  │  │  │  └─────────────────┘      └─────────────────┘               │  │  │   │
│  │  │  └─────────────────────────────────────────────────────────────┘  │  │   │
│  │  │                                                                   │  │   │
│  │  │  ┌─────────────────────────────────────────────────────────────┐  │  │   │
│  │  │  │                  KUBERNETES SERVICES                        │  │  │   │
│  │  │  │                                                             │  │  │   │
│  │  │  │  ┌─────────────────┐      ┌─────────────────┐               │  │  │   │
│  │  │  │  │ Frontend Service│      │ Backend Service │               │  │  │   │
│  │  │  │  │  (NodePort)     │      │  (ClusterIP)    │               │  │  │   │
│  │  │  │  │                 │      │                 │               │  │  │   │
│  │  │  │  └─────────────────┘      └─────────────────┘               │  │  │   │
│  │  │  └─────────────────────────────────────────────────────────────┘  │  │   │
│  │  └───────────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
                                    Docker Engine
                                           │
                                           ▼
                              ┌─────────────────────────┐
                              │      HOST MACHINE       │
                              │   (Linux/macOS/Windows) │
                              └─────────────────────────┘
```

### Architecture Components Explained

#### **Frontend Layer**
- **React Application**: Modern, responsive single-page application built with React 19.1.0
- **Nginx Web Server**: Serves static files and acts as a reverse proxy
- **Docker Container**: Multi-stage build for optimized production deployment
- **Kubernetes Pod**: Managed by Kubernetes with resource limits and health checks

#### **Backend Layer**
- **Express.js API**: RESTful API server handling mathematical operations
- **Node.js Runtime**: Lightweight, fast JavaScript runtime environment
- **Docker Container**: Containerized for consistent deployment across environments
- **Kubernetes Pod**: Auto-scaling and self-healing capabilities

#### **Kubernetes Orchestration**
- **Minikube**: Local Kubernetes cluster for development and testing
- **Master Node**: Controls the cluster, schedules workloads, and manages state
- **Worker Node**: Runs application pods and handles actual workloads
- **Services**: Provide stable networking and service discovery
- **Deployments**: Manage pod lifecycle, rolling updates, and scaling

#### **Container Runtime**
- **Docker Engine**: Containerization platform ensuring consistency across environments
- **Image Registry**: Stores and distributes container images
- **Volume Management**: Persistent storage for application data

### Key Features

- **Mathematical Operations**: Addition, subtraction, multiplication, and division
- **Modern UI**: Clean, responsive React interface with real-time calculations
- **RESTful API**: Well-documented backend API with proper error handling
- **Containerized**: Docker containers for both frontend and backend
- **Kubernetes Ready**: Complete K8s manifests for production deployment
- **Performance Optimized**: Multi-stage Docker builds and resource limits
- **Error Handling**: Comprehensive validation and error management
- **Responsive Design**: Works seamlessly across different screen sizes

## Technology Stack

### Frontend Stack (Version 1.0.0)
| Technology | Version | Purpose | Package Details |
|------------|---------|---------|-----------------|
| **React** | 19.1.0 | UI Framework | Core library for building user interfaces with modern hooks and concurrent features |
| **Nginx** | Alpine | Web Server | High-performance HTTP server and reverse proxy |

### Backend Stack (Version 1.0.0)
| Technology | Version | Purpose | Package Details |
|------------|---------|---------|-----------------|
| **Node.js** | 18 Alpine | Runtime Environment | JavaScript runtime built on Chrome's V8 engine with ES modules support |
| **Express** | 4.18.2 | Web Framework | Fast, unopinionated, minimalist web framework for Node.js |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing | Express middleware to enable CORS with various options |

### DevOps & Infrastructure Stack
| Technology | Version | Purpose | Details |
|------------|---------|---------|---------|
| **Docker** | Latest | Containerization | Platform for developing, shipping, and running applications in containers |
| **Kubernetes** | 1.x | Container Orchestration | Open-source system for automating deployment, scaling, and management |
| **Minikube** | Latest | Local K8s Cluster | Tool for running Kubernetes locally for development and testing |
| **Nginx** | Alpine | Reverse Proxy & Static Serving | High-performance web server for serving static content |
| **GitHub Actions** | Latest | CI/CD Pipeline | Automated workflows for building, testing, and deploying applications |
| **GitHub Container Registry** | Latest | Container Registry | Secure, private container registry for storing and distributing Docker images |

### Package Management & Build Tools
| Tool | Purpose | Configuration |
|------|---------|---------------|
| **npm** | Package Manager | Used for dependency management and script execution |
| **ESLint** | Code Linting | Maintains code quality with React and Jest rules |

## Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 6.x or higher (or **yarn** 1.22.x)
- **Docker** 20.x or higher (for containerization)
- **Kubernetes** cluster (minikube 1.25.x for local development)
- **kubectl** CLI tool for Kubernetes management

### Local Development (Recommended for v1.0.0)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DharshanSR/calculator-k8s.git
   cd calculator-k8s
   ```

2. **Start the Backend Service:**
   ```bash
   cd backend
   npm install
   node index.js
   # Backend runs on http://localhost:8081
   ```

3. **Start the Frontend Application** (in a new terminal):
   ```bash
   cd frontend
   npm install
   npm start
   # Frontend runs on http://localhost:3000
   ```

4. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Minikube Local Kubernetes Development

1. **Start Minikube cluster:**
   ```bash
   # Start minikube with sufficient resources
   minikube start --cpus=2 --memory=4096
   
   # Enable required addons
   minikube addons enable ingress
   minikube addons enable metrics-server
   
   # Configure Docker environment
   eval $(minikube docker-env)
   ```

2. **Build Docker images in Minikube:**
   ```bash
   # Build backend image
   cd backend
   docker build -t calculator-backend:v1.0.0 .
   
   # Build frontend image
   cd ../frontend
   docker build -t calculator-frontend:v1.0.0 .
   ```

3. **Deploy to Minikube:**
   ```bash
   # Apply Kubernetes manifests
   kubectl apply -f k8s/
   
   # Wait for deployments to be ready
   kubectl wait --for=condition=available --timeout=300s deployment/calculator-frontend
   kubectl wait --for=condition=available --timeout=300s deployment/calculator-backend
   
   # Get service URLs
   minikube service calculator-frontend --url
   ```

### Docker Deployment (Production Build v1.0.0)

1. **Build optimized production images:**
   ```bash
   # Build backend image with version tag
   cd backend
   docker build -t calculator-backend:v1.0.0 .
   docker tag calculator-backend:v1.0.0 calculator-backend:latest
   
   # Build frontend image with multi-stage build
   cd ../frontend
   docker build -t calculator-frontend:v1.0.0 .
   docker tag calculator-frontend:v1.0.0 calculator-frontend:latest
   ```

2. **Run with Docker containers:**
   ```bash
   # Create a Docker network for service communication
   docker network create calculator-network
   
   # Run backend container
   docker run -d \
     --name calc-backend \
     --network calculator-network \
     -p 8081:8081 \
     -e NODE_ENV=production \
     calculator-backend:v1.0.0
   
   # Run frontend container
   docker run -d \
     --name calc-frontend \
     --network calculator-network \
     -p 80:80 \
     calculator-frontend:v1.0.0
   ```

3. **Access the production application:**
   Open [http://localhost](http://localhost) in your browser

4. **Monitor container health:**
   ```bash
   # Check container status
   docker ps
   
   # View logs
   docker logs calc-backend
   docker logs calc-frontend
   
   # Check resource usage
   docker stats
   ```

### Kubernetes Production Deployment

1. **Prepare Kubernetes cluster:**
   ```bash
   # For cloud providers (GKE, EKS, AKS)
   # Ensure kubectl is configured with your cluster
   kubectl cluster-info
   
   # For local testing with Minikube
   minikube start --cpus=4 --memory=8192
   minikube addons enable ingress
   ```

2. **Deploy application to Kubernetes:**
   ```bash
   # Apply all Kubernetes manifests
   kubectl apply -f k8s/
   
   # Verify deployments
   kubectl get deployments
   kubectl get pods
   kubectl get services
   
   # Check deployment status
   kubectl rollout status deployment/calculator-frontend
   kubectl rollout status deployment/calculator-backend
   ```

3. **Access the application:**
   ```bash
   # For Minikube
   minikube service calculator-frontend --url
   
   # For cloud clusters with LoadBalancer
   kubectl get service calculator-frontend
   # Access via external IP
   
   # Port forwarding (alternative access method)
   kubectl port-forward service/calculator-frontend 8080:80
   # After running the above command, access the web application via http://localhost:8080
   ```

4. **Monitor and manage the deployment:**
   ```bash
   # View pod logs
   kubectl logs -l app=calculator-frontend
   kubectl logs -l app=calculator-backend
   
   # Scale deployments
   kubectl scale deployment calculator-frontend --replicas=3
   kubectl scale deployment calculator-backend --replicas=2
   
   # Update deployments with new versions
   kubectl set image deployment/calculator-frontend calculator-frontend=calculator-frontend:v1.1.0
   kubectl set image deployment/calculator-backend calculator-backend=calculator-backend:v1.1.0
   ```

## Project Structure

```
calculator-app/
├── .github/                   # GitHub Configuration
│   ├── workflows/             # GitHub Actions workflows
│   │   └── ci-cd.yaml         # CI/CD pipeline configuration
│   └── README.md              # GitHub workflows documentation
├── backend/                    # Express.js Backend Service
│   ├── .gitignore             # Backend gitignore
│   ├── Dockerfile             # Backend container configuration
│   ├── index.js               # Main application server
│   ├── package.json           # Node.js dependencies
│   ├── package-lock.json      # Dependency lock file
│   └── README.md              # Backend documentation
├── frontend/                   # React Frontend Application
│   ├── public/                # Static assets
│   │   ├── favicon.ico        # Site favicon
│   │   ├── index.html         # Main HTML template
│   │   ├── logo192.png        # React logo (192px)
│   │   ├── logo512.png        # React logo (512px)
│   │   ├── manifest.json      # PWA manifest
│   │   └── robots.txt         # SEO configuration
│   ├── src/                   # Source code
│   │   ├── App.css            # Application styles
│   │   ├── App.js             # Main React component
│   │   ├── App.test.js        # Component tests
│   │   ├── index.css          # Global styles
│   │   ├── index.js           # Application entry point
│   │   ├── logo.svg           # React logo SVG
│   │   ├── reportWebVitals.js # Performance monitoring
│   │   └── setupTests.js      # Test configuration
│   ├── .gitignore             # Frontend gitignore
│   ├── Dockerfile             # Frontend container configuration
│   ├── default.conf           # Nginx configuration
│   ├── package.json           # React dependencies
│   ├── package-lock.json      # Dependency lock file
│   └── README.md              # Frontend documentation
├── k8s/                       # Kubernetes Manifests
│   ├── backend.yaml           # Backend deployment & service
│   ├── frontend.yaml          # Frontend deployment & service
│   └── README.md              # Kubernetes documentation
├── .gitignore                 # Root gitignore
└── README.md                  # This file
```

## API Documentation

### Base URL
- **Local Development**: `http://localhost:8081`
- **Kubernetes**: `http://calculator-backend:3001` (internal service)

### Endpoints

#### POST /calculate
Performs mathematical calculations on two numbers.

**Request:**
```json
{
  "num1": 10,
  "num2": 5,
  "operation": "add"
}
```

**Supported Operations:**
- `add` - Addition (num1 + num2)
- `subtract` - Subtraction (num1 - num2)
- `multiply` - Multiplication (num1 × num2)
- `divide` - Division (num1 ÷ num2)

**Success Response:**
```json
{
  "result": 15
}
```

**Error Response:**
```json
{
  "error": "Cannot divide by zero"
}
```

## Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
# Test API endpoints
curl -X POST http://localhost:8081/calculate \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5, "operation": "add"}'
```

## CI/CD Pipeline

### GitHub Actions Workflow
The project includes a comprehensive CI/CD pipeline implemented with GitHub Actions that automatically builds and deploys the application.

#### Pipeline Features
- **Automated Builds**: Triggers on every push to main branch and pull requests
- **Multi-Architecture Support**: Builds container images for multiple platforms
- **Container Registry**: Automatically publishes images to GitHub Container Registry (GHCR)
- **Version Tagging**: Supports semantic versioning with automatic tag-based releases
- **Security**: Uses GitHub's built-in GITHUB_TOKEN for secure authentication

#### Workflow Steps
1. **Code Checkout**: Retrieves the latest source code
2. **Docker Buildx Setup**: Configures multi-platform Docker builds
3. **Registry Authentication**: Securely logs into GitHub Container Registry
4. **Image Tagging**: Automatically generates appropriate tags based on branch/tag
5. **Frontend Build**: Builds and pushes React frontend container image
6. **Backend Build**: Builds and pushes Express.js backend container image

#### Published Images
- **Frontend**: `ghcr.io/dharshansr/calculator-frontend:latest`
- **Backend**: `ghcr.io/dharshansr/calculator-backend:latest`
- **Tagged Versions**: `ghcr.io/dharshansr/calculator-frontend:v1.0.0`

#### Using Published Images
```bash
# Pull and run the latest images
docker pull ghcr.io/dharshansr/calculator-frontend:latest
docker pull ghcr.io/dharshansr/calculator-backend:latest

# Run with Docker Compose (update your docker-compose.yml)
version: '3.8'
services:
  frontend:
    image: ghcr.io/dharshansr/calculator-frontend:latest
    ports:
      - "80:80"
  backend:
    image: ghcr.io/dharshansr/calculator-backend:latest
    ports:
      - "8081:8081"
```

## Configuration

### Environment Variables

#### Backend
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 8081 | Backend server port |

#### Frontend
| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `/calculate` | Backend API endpoint |

### Kubernetes Resource Limits

#### Backend Pod Resources
- **CPU Request**: 100m
- **CPU Limit**: 500m
- **Memory Request**: 128Mi
- **Memory Limit**: 256Mi

#### Frontend Pod Resources
- **CPU Request**: 100m
- **CPU Limit**: 250m
- **Memory Request**: 128Mi
- **Memory Limit**: 256Mi

## Deployment Strategies

### Development Environment
- Local development with `npm start`
- Hot reloading enabled
- Development dependencies included

### Production Environment
- Multi-stage Docker builds
- Optimized React production builds
- Nginx for static file serving
- Resource-limited containers

### Kubernetes Production
- Horizontal Pod Autoscaling ready
- Service discovery configured
- Resource quotas enforced
- Health checks implemented

## Troubleshooting

### Common Issues

1. **Backend Connection Error**
   ```bash
   # Check if backend is running
   kubectl get pods -l app=calculator-backend
   kubectl logs deployment/calculator-backend
   ```

2. **Frontend Not Loading**
   ```bash
   # Check frontend service
   kubectl get service calculator-frontend
   kubectl describe service calculator-frontend
   ```

3. **Build Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Rebuild containers
   docker build --no-cache -t calculator-frontend .
   ```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- Follow React best practices
- Write unit tests for new features
- Update documentation for API changes
- Ensure Docker builds pass
- Test Kubernetes deployments

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React team for the amazing frontend framework
- Express.js for the lightweight backend framework
- Docker and Kubernetes communities
- Open source contributors

---

**Made with ❤️ by [DharshanSR](https://github.com/DharshanSR)**

For more information, check out the individual README files in the `backend/`, `frontend/`, and `k8s/` directories.

## Version History & Releases

### v1.0.0 (Current Release) - Production Ready
**Released**: June 2025

#### Features
- ✅ Complete microservices architecture implementation
- ✅ React 19.1.0 frontend with modern hooks and concurrent features
- ✅ Express.js 4.18.2 backend with RESTful API
- ✅ Full Docker containerization support
- ✅ Production-ready Kubernetes manifests
- ✅ Minikube local development environment
- ✅ Comprehensive error handling and validation
- ✅ Multi-stage Docker builds for optimization
- ✅ Resource limits and health checks
- ✅ Horizontal pod autoscaling ready
- ✅ **Automated CI/CD pipeline with GitHub Actions**
- ✅ **Container image publishing to GitHub Container Registry**
- ✅ **Automated builds on push and pull requests**

#### Package Versions
- **Frontend Dependencies**:
  - React: 19.1.0 (Latest stable with concurrent features)
  - React DOM: 19.1.0
  - React Scripts: 5.0.1 (Webpack 5 support)
  - Testing Library React: 16.3.0
  - Web Vitals: 2.1.4

- **Backend Dependencies**:
  - Node.js: 18.x Alpine (LTS version)
  - Express: 4.18.2 (Latest stable)
  - CORS: 2.8.5

- **Infrastructure**:
  - Docker: Multi-stage builds
  - Kubernetes: 1.25+ compatible
  - Nginx: Alpine latest
  - **GitHub Actions: Automated CI/CD pipeline**
  - **GitHub Container Registry: Image hosting and distribution**

#### Improvements in v1.0.0
- Enhanced security with proper CORS configuration
- Optimized Docker images with Alpine Linux
- Kubernetes resource management and limits
- Production-ready logging and monitoring
- Comprehensive testing setup
- **Automated CI/CD pipeline with GitHub Actions**
- **Container image publishing to GitHub Container Registry (GHCR)**
- **Automated builds triggered on push and pull requests**
- **Multi-environment deployment support with proper tagging**

### Upcoming Releases

#### v1.1.0 (Planned)
- Advanced mathematical operations (power, square root, etc.)
- Calculator history and memory functions
- Enhanced UI with themes and accessibility
- Prometheus metrics integration

#### v1.2.0 (Planned)
- Scientific calculator mode
- Persistent calculation history
- User authentication and sessions
- Advanced Kubernetes features (HPA, VPA)
- Performance optimizations