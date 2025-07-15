#!/bin/bash

# Script to generate GitHub Actions compatible kubeconfig for minikube
# Run this on your minikube machine

echo "Generating GitHub Actions compatible kubeconfig..."

# Get the current context
CONTEXT=$(kubectl config current-context)
CLUSTER=$(kubectl config view -o jsonpath="{.contexts[?(@.name == '$CONTEXT')].context.cluster}")
USER=$(kubectl config view -o jsonpath="{.contexts[?(@.name == '$CONTEXT')].context.user}")

# Get server URL
SERVER=$(kubectl config view -o jsonpath="{.clusters[?(@.name == '$CLUSTER')].cluster.server}")

# Get certificate data (base64 encoded)
CA_DATA=$(kubectl config view --raw -o jsonpath="{.clusters[?(@.name == '$CLUSTER')].cluster.certificate-authority-data}")
CLIENT_CERT_DATA=$(kubectl config view --raw -o jsonpath="{.users[?(@.name == '$USER')].user.client-certificate-data}")
CLIENT_KEY_DATA=$(kubectl config view --raw -o jsonpath="{.users[?(@.name == '$USER')].user.client-key-data}")

# Create new kubeconfig with embedded certificates
cat << EOF > github-actions-kubeconfig.yaml
apiVersion: v1
kind: Config
clusters:
- cluster:
    certificate-authority-data: $CA_DATA
    server: $SERVER
  name: $CLUSTER
contexts:
- context:
    cluster: $CLUSTER
    user: $USER
  name: $CONTEXT
current-context: $CONTEXT
users:
- name: $USER
  user:
    client-certificate-data: $CLIENT_CERT_DATA
    client-key-data: $CLIENT_KEY_DATA
EOF

echo "Generated github-actions-kubeconfig.yaml"
echo "Now run this command to get the base64 encoded config for GitHub secrets:"
echo ""
echo "cat github-actions-kubeconfig.yaml | base64 -w 0"
echo ""
echo "Copy the output and update your MINIKUBE_KUBE_CONFIG secret in GitHub"
