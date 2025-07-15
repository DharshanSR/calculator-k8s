#!/bin/bash

# Calculator App Cleanup Script
# This script removes the application from Kubernetes

echo "🧹 Cleaning up Calculator App deployment..."

# Delete Kubernetes resources
echo "❌ Removing Kubernetes deployments and services..."
kubectl delete -f k8s/backend.yaml --ignore-not-found=true
kubectl delete -f k8s/frontend.yaml --ignore-not-found=true

# Remove Docker images (optional)
read -p "🗑️  Do you want to remove Docker images as well? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    eval $(minikube docker-env)
    echo "🐳 Removing Docker images..."
    docker rmi calculator-backend:v1.1.0 calculator-frontend:v1.1.0 2>/dev/null || true
    echo "✅ Docker images removed"
fi

echo "✅ Cleanup complete!"
