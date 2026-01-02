interface CounterDisplayPage {
    count: number;
    status: string;
    onReset: () => void;
}

const CounterDisplay = ({ count, status, onReset }: CounterDisplayPage) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
      <h2>Counter Component</h2>
      <p>Count: <strong>{count}</strong></p>
      <p>System Status: <em>{status}</em></p>

      <button onClick={onReset}>
        Reset Counter
      </button>
    </div>
  );
};

export default CounterDisplay;