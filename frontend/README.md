# Calculator App - Frontend

A simple React frontend for a basic calculator application that performs arithmetic operations by communicating with a backend API.

## Overview

This is a React-based calculator interface that allows users to perform basic math operations (addition, subtraction, multiplication, division). The frontend sends calculation requests to a backend service and displays the results.

## Features

- Clean calculator interface with number and operation buttons
- Support for basic arithmetic operations (+, -, *, /)
- Real-time calculation results from backend API
- Error handling for invalid operations
- Responsive design for different screen sizes

## Technology Stack

- **React** - Frontend framework
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling
- **Fetch API** - HTTP requests to backend

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm start

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
# Create production build
npm run build

# Build files will be in the 'build' directory
```

## API Integration

The frontend communicates with the backend using a simple POST request:

```javascript
// Example API call
const response = await fetch(`/calculate`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    operation: '+',
    operand1: 5,
    operand2: 3
  })
});

const result = await response.json();
```

## Project Structure

```
src/
├── App.js              # Main application component
├── App.css             # Application styles
├── index.js            # Entry point
└── components/         # React components
```

## Docker

Build and run with Docker:

```bash
# Build image
docker build -t calculator-frontend .

# Run container
docker run -p 3000:80 calculator-frontend
```

## Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App (not recommended)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
