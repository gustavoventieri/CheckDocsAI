import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>click me</button>
      <button onClick={() => console.log(count)}>show count</button>
    </>
  );
}

export default App;
