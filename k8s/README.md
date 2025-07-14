# Kubernetes Configuration for Calculator App

This repository contains comprehensive Kubernetes manifests for deploying a distributed Calculator Application consisting of a React-based frontend and an Express.js backend service. The application is designed to run in a containerized Kubernetes environment with proper service discovery, resource management, and scalability considerations.

## Architecture Overview

The Calculator App follows a microservices architecture pattern with the following components:

### Application Components

#### Frontend Service
The frontend component is a single-page React application that provides:
- Interactive user interface for mathematical operations
- Input fields for numerical values
- Operation selection (Addition, Subtraction, Multiplication, Division)
- Real-time communication with the backend service
- Error handling and user feedback mechanisms
- Responsive design for various screen sizes

**Technical Specifications:**
- **Framework**: React.js with modern ES6+ features
- **Web Server**: Nginx serving static content
- **Container Port**: 80 (HTTP)
- **Build Process**: Multi-stage Docker build for optimized production images
- **Communication**: RESTful API calls to backend service

#### Backend Service
The backend component is a RESTful API server built with Express.js that provides:
- Mathematical computation engine
- Input validation and sanitization
- JSON-based request/response handling
- Error handling and logging
- Health check endpoints
- Stateless operation for horizontal scaling

**Technical Specifications:**
- **Framework**: Express.js with Node.js runtime
- **Container Port**: 3001
- **API Endpoints**: POST `/calculate` for arithmetic operations
- **Request Format**: JSON with operands and operation type
- **Response Format**: JSON with computation results
- **Error Handling**: Comprehensive error responses with appropriate HTTP status codes

## File Structure and Manifests

This directory contains the following Kubernetes configuration files:

| File | Purpose | Resources Defined |
|------|---------|-------------------|
| `frontend.yaml` | Frontend deployment and service configuration | Deployment, Service, ConfigMap (if applicable) |
| `backend.yaml` | Backend deployment and service configuration | Deployment, Service, ConfigMap (if applicable) |

### Deployment Specifications

Each deployment manifest includes:
- **Replica Management**: Configurable number of pod replicas for high availability
- **Resource Constraints**: CPU and memory requests/limits for proper cluster resource allocation
- **Health Checks**: Liveness and readiness probes (when implemented)
- **Environment Configuration**: Environment-specific variables and configurations
- **Image Pull Policies**: Optimized for different deployment scenarios

## Prerequisites and Requirements

Before deploying the Calculator App, ensure the following prerequisites are met:

### Kubernetes Cluster Requirements
- **Kubernetes Version**: 1.19+ (recommended 1.21+)
- **Cluster Resources**: Minimum 2 CPU cores and 4GB RAM available
- **Storage**: Default storage class configured for persistent volumes (if needed)
- **Network Policy**: CNI plugin supporting network policies (optional but recommended)

### Container Images
The application requires pre-built Docker images available in the GitHub Container Registry:
- **Frontend Image**: `ghcr.io/dharshansr/calculator-frontend`
- **Backend Image**: `ghcr.io/dharshansr/calculator-backend`

### Required Tools
- `kubectl` CLI tool configured to communicate with your Kubernetes cluster
- Docker (for local image building and testing)
- Git (for cloning and version control)

## Deployment Instructions

### Standard Deployment Process

#### Step 1: Prepare the Environment
```bash
# Verify kubectl configuration
kubectl cluster-info

# Verify node readiness
kubectl get nodes

# Create namespace (optional but recommended)
kubectl create namespace calculator-app
kubectl config set-context --current --namespace=calculator-app
```

#### Step 2: Deploy Backend Service
```bash
# Apply backend deployment and service
kubectl apply -f backend.yaml

# Verify backend deployment
kubectl get deployment calculator-backend
kubectl get pods -l app=calculator-backend
```

#### Step 3: Deploy Frontend Service
```bash
# Apply frontend deployment and service
kubectl apply -f frontend.yaml

# Verify frontend deployment
kubectl get deployment calculator-frontend
kubectl get pods -l app=calculator-frontend
```

#### Step 4: Verify Complete Deployment
```bash
# Check all pods are running
kubectl get pods

# Check services are exposed
kubectl get services

# View deployment status
kubectl get deployments

# Check for any issues
kubectl describe pods
```

### Accessing the Application

#### Local Development Access
For local development and testing purposes:

```bash
# Port forward frontend service to local machine
kubectl port-forward service/calculator-frontend 8080:80

# Access the application
# Open browser and navigate to: http://localhost:8080
```

#### Production Access Considerations
For production deployments, consider implementing:
- **Ingress Controller**: For external access with proper domain routing
- **Load Balancer**: Cloud provider load balancer for production traffic
- **TLS Termination**: SSL/TLS certificates for secure HTTPS connections

## Networking and Service Discovery

### Internal Service Communication

The application components communicate using Kubernetes' built-in DNS service discovery:

#### Frontend to Backend Communication
- **DNS Name**: `calculator-backend.default.svc.cluster.local` (or `calculator-backend` within the same namespace)
- **Protocol**: HTTP
- **Port**: 3001
- **Endpoint**: `/calculate`
- **Request Method**: POST

#### Service Definitions

**Frontend Service:**
- **Type**: ClusterIP (internal) or LoadBalancer (external access)
- **Port**: 80 (HTTP traffic)
- **Target Port**: 80 (Nginx container port)
- **Selector**: Matches frontend deployment pods

**Backend Service:**
- **Type**: ClusterIP (internal only)
- **Port**: 3001
- **Target Port**: 3001 (Express.js container port)
- **Selector**: Matches backend deployment pods

### Network Security Considerations
- Backend service is only accessible within the cluster (ClusterIP)
- Frontend service can be exposed externally based on requirements
- Network policies can be implemented for additional security isolation

## Resource Management and Performance

### Resource Allocation Strategy

Each deployment includes carefully configured resource requests and limits:

```yaml
resources:
  requests:
    cpu: "100m"        # Minimum CPU allocation
    memory: "128Mi"     # Minimum memory allocation
  limits:
    cpu: "500m"        # Maximum CPU allocation
    memory: "256Mi"     # Maximum memory allocation
```

### Performance Considerations
- **CPU Requests**: Ensures guaranteed CPU allocation for scheduling
- **Memory Requests**: Prevents out-of-memory issues during startup
- **CPU Limits**: Prevents resource contention in shared environments
- **Memory Limits**: Protects against memory leaks and runaway processes

### Scaling Configuration
- **Horizontal Pod Autoscaler (HPA)**: Can be configured for automatic scaling based on CPU/memory usage
- **Vertical Pod Autoscaler (VPA)**: Can be used for automatic resource recommendation and adjustment
- **Manual Scaling**: Use `kubectl scale` for immediate replica adjustment

## Container Image Management

### Image Repository Strategy
All container images are stored in GitHub Container Registry (GHCR):

- **Registry**: `ghcr.io`
- **Organization**: `dharshansr`
- **Image Naming Convention**: `calculator-[component]`
- **Tagging Strategy**: Semantic versioning (e.g., v1.0.0, v1.1.0)

### Image Pull Configuration
```yaml
imagePullPolicy: IfNotPresent  # Development environments
imagePullPolicy: Always        # Production environments
```

### Image Security Considerations
- Images are scanned for vulnerabilities during CI/CD pipeline
- Base images are regularly updated for security patches
- Minimal base images (Alpine Linux) used to reduce attack surface

## Local Development and Testing

### Minikube Setup for Local Development

```bash
# Start Minikube with sufficient resources
minikube start --cpus=2 --memory=4096 --disk-size=20g

# Enable necessary addons
minikube addons enable ingress
minikube addons enable metrics-server

# Deploy all manifests
kubectl apply -f .

# Wait for deployments to be ready
kubectl wait --for=condition=available --timeout=300s deployment/calculator-frontend
kubectl wait --for=condition=available --timeout=300s deployment/calculator-backend

# Set up port forwarding
kubectl port-forward service/calculator-frontend 8080:80

# Application accessible at: http://localhost:8080
```

### Development Workflow
1. **Code Changes**: Make changes to application code
2. **Image Build**: Build new container images with updated code
3. **Image Push**: Push images to container registry
4. **Deployment Update**: Update Kubernetes deployments with new image tags
5. **Testing**: Verify functionality through port-forwarding or ingress

## Monitoring and Observability

### Health Checks and Probes
When implemented, the deployments include:

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3001
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 3001
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Logging Strategy
- **Application Logs**: Structured JSON logging to stdout/stderr
- **Log Aggregation**: Compatible with ELK stack, Fluentd, or similar
- **Log Levels**: Configurable log levels (DEBUG, INFO, WARN, ERROR)

### Metrics Collection
- **Prometheus Integration**: Application metrics exposed for Prometheus scraping
- **Custom Metrics**: Business logic metrics (calculation counts, error rates)
- **System Metrics**: Resource usage, response times, throughput

## Future Enhancements and Roadmap

### Immediate Improvements
- [ ] **Ingress Configuration**: Implement ingress rules for external access with proper domain routing
- [ ] **Health Probes**: Add comprehensive liveness and readiness probes for better reliability
- [ ] **Configuration Management**: Implement ConfigMaps and Secrets for environment-specific configurations
- [ ] **Persistent Storage**: Add persistent volumes for any stateful requirements

### Intermediate Enhancements
- [ ] **Database Integration**: Connect to persistent database (PostgreSQL, MongoDB) for calculation history
- [ ] **Helm Charts**: Package deployments as Helm charts for easier management and templating
- [ ] **Horizontal Pod Autoscaling**: Implement HPA based on CPU/memory metrics
- [ ] **Network Policies**: Define network policies for micro-segmentation and security

### Advanced Features
- [ ] **Service Mesh Integration**: Implement Istio or Linkerd for advanced traffic management
- [ ] **GitOps Workflow**: Implement ArgoCD or Flux for automated deployment pipelines
- [ ] **Monitoring Stack**: Deploy Prometheus, Grafana, and Alertmanager for comprehensive monitoring
- [ ] **Security Scanning**: Implement Falco or similar for runtime security monitoring
- [ ] **Multi-Environment Support**: Use Kustomize for managing dev, staging, and production environments

### Operational Excellence
- [ ] **Backup and Recovery**: Implement backup strategies for any persistent data
- [ ] **Disaster Recovery**: Document and test disaster recovery procedures
- [ ] **Performance Testing**: Implement load testing and performance benchmarking
- [ ] **Documentation**: Comprehensive operational runbooks and troubleshooting guides

## Troubleshooting Guide

### Common Issues and Solutions

#### Pods Not Starting
```bash
# Check pod status and events
kubectl describe pod <pod-name>

# Check logs for errors
kubectl logs <pod-name>

# Verify image availability
kubectl get events --sort-by=.metadata.creationTimestamp
```

#### Service Discovery Issues
```bash
# Test internal DNS resolution
kubectl exec -it <frontend-pod> -- nslookup calculator-backend

# Verify service endpoints
kubectl get endpoints calculator-backend

# Test connectivity
kubectl exec -it <frontend-pod> -- curl http://calculator-backend:3001/health
```

#### Resource Constraints
```bash
# Check node resources
kubectl top nodes

# Check pod resource usage
kubectl top pods

# Describe node for detailed resource allocation
kubectl describe node <node-name>
```

## License and Contributing

This project is released under the MIT License. Contributions are welcome through pull requests with appropriate testing and documentation updates.