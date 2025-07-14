# GitHub Workflows

This directory contains GitHub Actions workflows and automation for the Calculator App project.

## Workflows

### CI/CD Pipeline (`ci-cd.yaml`)

This workflow automatically builds and deploys the calculator application when changes are pushed to the repository.

#### Triggers
- **Push to main branch**: Builds and pushes images with `main` tag
- **Push tags** (format `v*.*.*`): Builds and pushes images with the version tag
- **Pull requests**: Builds images for testing (without pushing)

#### What it does
1. **Checkout code**: Gets the latest code from the repository
2. **Set up Docker Buildx**: Prepares advanced Docker build capabilities
3. **Login to GHCR**: Authenticates with GitHub Container Registry
4. **Set image tags**: Determines appropriate tags based on branch/tag name
5. **Build and push images**: Creates Docker images for both frontend and backend

#### Container Images
- **Frontend**: `ghcr.io/dharshansr/calculator-frontend`
- **Backend**: `ghcr.io/dharshansr/calculator-backend`

#### Image Tagging Strategy
- `latest`: Always points to the most recent build from main branch
- `main`: Latest build from main branch
- `v1.0.0`: Specific version tags when releases are created
- Branch names: For feature branches (sanitized, `/` becomes `-`)

## Container Registry

Images are stored in GitHub Container Registry (GHCR) and are publicly accessible:
- Frontend: https://github.com/DharshanSR/calculator-k8s/pkgs/container/calculator-frontend
- Backend: https://github.com/DharshanSR/calculator-k8s/pkgs/container/calculator-backend

## Usage

### Manual Workflow Trigger
You can manually trigger the workflow from the GitHub Actions tab if needed.

### Creating a Release
To create a versioned release:
1. Create and push a tag: `git tag v1.0.0 && git push origin v1.0.0`
2. The workflow will automatically build and push images with the `v1.0.0` tag

### Local Development
For local development and testing, you can build the images manually:

```bash
# Build frontend
docker build -t calculator-frontend ./frontend

# Build backend  
docker build -t calculator-backend ./backend
```

## Kubernetes Deployment

The built images are designed to work with the Kubernetes manifests in the `/k8s` directory. After the workflow runs, you can deploy using:

```bash
kubectl apply -f k8s/
```

## Troubleshooting

### Common Issues
- **Authentication errors**: Ensure GITHUB_TOKEN has package write permissions
- **Build failures**: Check Dockerfile syntax in frontend/backend directories
- **Tag issues**: Verify tag format matches `v*.*.*` pattern for releases

### Monitoring
- Check the Actions tab for workflow run status
- View build logs for detailed error information
- Monitor container registry for successful image pushes
