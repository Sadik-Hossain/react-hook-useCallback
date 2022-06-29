import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState(0);
  const [num1] = useState(4);
  const [num2] = useState(5);

  //* protibar useState change e notun kore sum function create hcce, jodio num1,num2 er value same thakce

  // const sum = () => num1 + num2;
  //* usecallback takes a dependency like useEffect
  //* adding referential equality with useCallback
  //* useCallback memorize the function
  //* the reason you usually see use callback used is because a func. is going into a dependency array

  const sum = useCallback(() => num1 + num2, [num1, num2]);

  // useEffect(() => {
  //   console.log(`New sum value:${sum()}`);
  //   setResult(sum());
  // }, [sum]);
  //* useEffect relies on sum function, any time sum function changes useEffect will run

  //* sum er value primitive howay, react smart bole infinite loop atkay

  //* kintu array ba obj non-primitive er khetre infinte loop create hoy

  //* eijnno useCallback use kora hoy dependency function er jnno
  const buildArray = useCallback(
    () => {
      return [num1, num2];
    },
    //* dependency of callback
    [num1, num2]
  );

  useEffect(
    () => {
      console.log(`New array :${buildArray()}`);
      setResult(buildArray());
    },
    //* fuction as a dependency of useEffect
    [buildArray]
  );

  //* we didnt change sum, we just typed in input but its a new sum function, likewise the value was same nothing changed
  return (
    <main className="App">
      <input
        type="text"
        placeholder="input"
        value={userInput}
        // * every time we use useState it will re-render the component
        onChange={(e) => setUserInput(e.target.value)}
      />
      <h1>Output: {userInput || "--"}</h1>
    </main>
  );
}

export default App;
