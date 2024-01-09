import { useState } from "react";

const Count = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Current Count is {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Count Up</button>
    </div>
  );
};

export default Count;
