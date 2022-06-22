import { useEffect, useState, useId } from "react";

import { fib } from "wasm/release";

const MAX_SAFE_FIB = 92;

const isNN = (value: any) => value === null || isNaN(Number(value));

const Input: React.FC<{ value: number; onChange: React.EventHandler<any> }> = ({
  value,
  onChange,
}) => {
  const id = useId();

  return (
    <label
      className="container flex flex-col justify-start items-center gap-3"
      htmlFor={id}
    >
      <span className="text-blue-50 font-bold">N-th Fibonacci</span>
      <input
        className="container p-2 rounded-sm outline-none"
        type="number"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        min={0}
        max={Number.MAX_SAFE_INTEGER}
        step={1}
      />
    </label>
  );
};

const App = () => {
  const [num, setNum] = useState<number>(0);
  const [result, setResult] = useState<any>(0);

  useEffect(() => {
    if (isNN(num)) return;
    const res =
      num > MAX_SAFE_FIB ? "WASM can't handle bigger integers" : fib(num);
    setResult(res);
  }, [num]);

  const resultColors =
    !isNN(result) && result > 0
      ? "bg-green-500 shadow-green-900"
      : "bg-red-500 shadow-red-900";

  return (
    <div className="font-sans flex flex-col justify-center gap-6 p-6 bg-slate-900 shadow-md shadow-black rounded-lg">
      <Input value={num} onChange={(e) => setNum(e.target.value)} />
      <div
        className={`container text-white text-lg p-2 rounded-sm shadow-md flex flex-row flex-wrap justify-between gap-2 ${resultColors}`}
      >
        {isNN(result) ? null : <span>Result:</span>}
        <span>{`${result}`}</span>
      </div>
      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="text-center font-mono text-sm text-blue-300 hover:text-white"
      >
        {"< GitHub >"}
      </a>
    </div>
  );
};

export default App;
