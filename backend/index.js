import express, { json } from 'express';
import cors from 'cors';
const app = express();
const port = 8081;

app.use(cors());
app.use(json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'calculator-backend',
    version: '1.1.0',
    timestamp: new Date().toISOString()
  });
});

// Version endpoint
app.get('/version', (req, res) => {
  res.json({ 
    version: '1.1.0',
    service: 'calculator-backend',
    description: 'Enhanced calculator with health checks'
  });
});

app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'num1 and num2 must be numbers' });
  }

  let result;
  switch(operation) {
    case 'add': result = num1 + num2; break;
    case 'subtract': result = num1 - num2; break;
    case 'multiply': result = num1 * num2; break;
    case 'divide':
      if (num2 === 0) return res.status(400).json({ error: 'Cannot divide by zero' });
      result = num1 / num2; break;
    default: return res.status(400).json({ error: 'Invalid operation' });
  }

  res.json({ result });
});

app.listen(port, () => {
  console.log(`Calculator backend running on port ${port}`);
});
