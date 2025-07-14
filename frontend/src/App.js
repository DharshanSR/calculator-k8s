import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = async () => {
    setError('');
    setResult(null);

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setError('Please enter valid numbers');
      return;
    }

    try {
      const res = await fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num1: n1, num2: n2, operation }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data.result);
      } else {
        setError(data.error || 'Error calculating');
      }
    } catch (err) {
      setError('Network error: Could not connect to backend');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>🧮 Calculator</h2>

      <input
        type="number"
        value={num1}
        onChange={e => setNum1(e.target.value)}
        placeholder="Number 1"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <input
        type="number"
        value={num2}
        onChange={e => setNum2(e.target.value)}
        placeholder="Number 2"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      <select
        value={operation}
        onChange={e => setOperation(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      >
        <option value="add">Add (+)</option>
        <option value="subtract">Subtract (-)</option>
        <option value="multiply">Multiply (×)</option>
        <option value="divide">Divide (÷)</option>
      </select>

      <button
        onClick={calculate}
        style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}
      >
        Calculate
      </button>

      {result !== null && <p style={{ marginTop: '15px' }}><strong>Result:</strong> {result}</p>}
      {error && <p style={{ marginTop: '15px', color: 'red' }}><strong>Error:</strong> {error}</p>}
    </div>
  );
}

export default App;
