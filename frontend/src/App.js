import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [backendVersion, setBackendVersion] = useState('');

  useEffect(() => {
    // Fetch backend version on component mount
    fetch('/version')
      .then(res => res.json())
      .then(data => setBackendVersion(data.version))
      .catch(() => setBackendVersion('unknown'));
  }, []);

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
    <div className="calculator-container">
      <div className="calculator-card">
        <div className="header">
          <h2>🧮 Enhanced Calculator</h2>
          <div className="version-info">
            <span>Frontend: v1.1.0</span>
            <span>Backend: v{backendVersion}</span>
          </div>
        </div>

        <div className="input-group">
          <input
            type="number"
            value={num1}
            onChange={e => setNum1(e.target.value)}
            placeholder="Enter first number"
            className="number-input"
          />

          <input
            type="number"
            value={num2}
            onChange={e => setNum2(e.target.value)}
            placeholder="Enter second number"
            className="number-input"
          />

          <select
            value={operation}
            onChange={e => setOperation(e.target.value)}
            className="operation-select"
          >
            <option value="add">➕ Addition</option>
            <option value="subtract">➖ Subtraction</option>
            <option value="multiply">✖️ Multiplication</option>
            <option value="divide">➗ Division</option>
          </select>

          <button
            onClick={calculate}
            className="calculate-button"
            disabled={!num1 || !num2}
          >
            Calculate Result
          </button>
        </div>

        {result !== null && (
          <div className="result-display success">
            <strong>Result: {result}</strong>
          </div>
        )}
        
        {error && (
          <div className="result-display error">
            <strong>Error: {error}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
