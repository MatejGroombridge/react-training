import { useState, useEffect } from 'react'
import CounterDisplay from './CounterDisplay';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1); 
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>React Lesson 1</h1>
      <CounterDisplay onReset={handleReset} count={count} status="Active" />
    </div>
  )
}

export default App