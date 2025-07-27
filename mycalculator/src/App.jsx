import { useState } from 'react';

function App() {
  const [number, setNumber] = useState('');
  const [factorial, setFactorial] = useState(null);
  const [isPrime, setIsPrime] = useState(null);

  const handleCalculate = () => {
    const num = parseInt(number);

    // Factorial
    let fact = 1;
    for (let i = 1; i <= num; i++) fact *= i;

    // Prime check
    let prime = num > 1;
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        prime = false;
        break;
      }
    }

    setFactorial(fact);
    setIsPrime(prime);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>📐 Factorial & Prime Checker</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
        style={{ padding: '8px', marginBottom: '1rem', width: '100%' }}
      />
      <button onClick={handleCalculate} style={{ padding: '10px', width: '100%' }}>
        Calculate
      </button>
      {factorial !== null && <p>Factorial: {factorial}</p>}
      {isPrime !== null && <p>Prime: {isPrime ? 'Yes' : 'No'}</p>}
    </div>
  );
}

export default App;
