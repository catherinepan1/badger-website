/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css';
import {Button} from './Button.jsx';
import { addEmail } from './firebase-db.js';

function App() {
  function testButtonClick(){
    console.log("HI!!");
  }
  async function testEmail(){
    return addEmail("example@example.com");
  }

  /*
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )*/
 return (
  <>
    <h1>testing</h1>
    <Button message={"hello there!"} onButtonClick={testEmail} isAsync={true}></Button>
    <Button message={"not async!"} onButtonClick={testButtonClick} isAsync={false}></Button>
  </>
 )
}

export default App
