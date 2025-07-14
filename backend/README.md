# Calculator Backend API

A simple REST API backend for a calculator application built with Node.js and Express.

## Overview

This backend service provides a REST API endpoint for performing basic mathematical calculations. It supports addition, subtraction, multiplication, and division operations.

## Features

- ✅ Basic arithmetic operations (add, subtract, multiply, divide)
- ✅ Input validation and error handling
- ✅ CORS enabled for cross-origin requests
- ✅ JSON request/response format
- ✅ Docker containerization
- ✅ Kubernetes deployment ready

## Technology Stack

- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Container**: Docker
- **Orchestration**: Kubernetes

## API Endpoints

### POST /calculate

Performs a mathematical calculation on two numbers.

**Request Body:**
```json
{
  "num1": 10,
  "num2": 5,
  "operation": "add"
}
```

**Supported Operations:**
- `add` - Addition
- `subtract` - Subtraction
- `multiply` - Multiplication
- `divide` - Division

**Response:**
```json
{
  "result": 15
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **The API will be available at:**
   ```
   http://localhost:8081
   ```

### Testing the API

You can test the API using curl:

```bash
# Addition
curl -X POST http://localhost:8081/calculate \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5, "operation": "add"}'

# Subtraction
curl -X POST http://localhost:8081/calculate \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5, "operation": "subtract"}'

# Multiplication
curl -X POST http://localhost:8081/calculate \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5, "operation": "multiply"}'

# Division
curl -X POST http://localhost:8081/calculate \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5, "operation": "divide"}'
```

## Docker

### Build the Docker image:
```bash
docker build -t calculator-backend .
```

### Run the container:
```bash
docker run -p 8081:8081 calculator-backend
```

## Kubernetes Deployment

The backend can be deployed to Kubernetes using the configuration in the `k8s/` directory:

```bash
kubectl apply -f ../k8s/backend.yaml
```

## Error Handling

The API handles the following error cases:

- **Invalid input types**: Returns 400 if `num1` or `num2` are not numbers
- **Division by zero**: Returns 400 when attempting to divide by zero
- **Invalid operation**: Returns 400 for unsupported operations

## Project Structure

```
backend/
├── Dockerfile          # Docker configuration
├── index.js            # Main application file
├── package.json        # Node.js dependencies and scripts
└── README.md          # This file
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 8081 | Port number for the server |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the MIT License.