#!/bin/bash

# Enhanced Calculator App Deployment Script
# This script builds Docker images and deploys the application to Minikube

set -e

echo "🚀 Starting Calculator App Deployment..."

# Configure Docker to use Minikube's Docker daemon
echo "📦 Configuring Docker environment..."
eval $(minikube docker-env)

# Build backend image
echo "🔨 Building backend Docker image..."
cd backend
docker build -t calculator-backend:v1.1.0 .
cd ..

# Build frontend image  
echo "🎨 Building frontend Docker image..."
cd frontend
docker build -t calculator-frontend:v1.1.0 .
cd ..

# Deploy to Kubernetes
echo "☸️  Deploying to Kubernetes..."
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml

# Wait for deployments to be ready
echo "⏳ Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/calculator-backend
kubectl wait --for=condition=available --timeout=300s deployment/calculator-frontend

# Display deployment status
echo "📊 Deployment Status:"
kubectl get pods
echo ""
kubectl get services

echo ""
echo "✅ Deployment complete!"
echo "🌐 To access the application, run:"
echo "   kubectl port-forward service/calculator-frontend 8080:80"
echo "   Then open http://localhost:8080 in your browser"
echo ""
echo "🔍 To check backend health:"
echo "   kubectl port-forward service/calculator-backend 8081:3001"
echo "   Then visit http://localhost:8081/health"
