import './App.css';
import StartWithTransition from './features/StartWithTransition';
import StartTransitionWithSupense from './features/StartTransitionWithSuspense';
import WithDeferredValue from './features/WithDeferredValue';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <StartWithTransition />
      {/* <StartTransitionWithSupense />
      <WithDeferredValue /> */}
      </header>
    </div>
  );
}

export default App;
