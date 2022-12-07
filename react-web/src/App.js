import './App.css';
import StartWithTransition from './features/StartWithTransition';
import StartTransitionWithSupense from './features/StartTransitionWithSuspense';
import { useEffect } from 'react';
import { data } from './data';
import WithDeferredValue from './features/WithDeferredValue';

function App() {
  useEffect(() => {
    let score = 0;

    const allSizes = {};
    const withChildKeys = {};
    let lastKey = '';
    let lastCommand = '';
    const dirMap = {};

    let lastDirKey = '';
    data.forEach(element => {
      if (element.includes(' cd ') && !element.includes(' ..')) {
        const key = element.split(' ')[2];
        dirMap[key] = {};
        lastDirKey = key;
      } else if (!element.includes(' ls') && !element.includes(' ..')) {
        const key = element.split(' ')[2];
        console.log('element ', element);
        dirMap[lastDirKey] = {
          ...dirMap[lastDirKey],
          [key]: element.includes('dir') ? {} : element.split(' ')[0],
        };
      }
    });

    console.log('dirMap ', dirMap);

    // data.forEach(element => {
    //   if (element.includes(' ls')) {
    //     lastCommand = element;
    //   }

    //   if (element.includes('dir ')) {
    //     if (lastCommand.includes(' ls')) {
    //       const key = element.split(' ')[1];
    //       withChildKeys[lastKey] = `${
    //         withChildKeys[lastKey] ? withChildKeys[lastKey] + ',' + key : key
    //       }`;
    //     }
    //   }

    //   if (!element.includes(' ls') && !element.includes(' cd ')) {
    //     const size = element.split(' ')[0];

    //     if (!isNaN(Number(size))) {
    //       allSizes[lastKey] += Number(size);
    //     }
    //   } else if (element.includes(' cd ')) {
    //     lastCommand = '';
    //     if (!element.includes('..')) {
    //       const key = element.split(' ')[2];
    //       allSizes[key] = 0;
    //       lastKey = key;
    //     }
    //   }

    //   if (element.includes('..')) {
    //     console.log(' lastKey :: ', lastKey);
    //   }
    // });

    // Object.entries(withChildKeys).forEach(element => {
    //   const items = element[1].split(',');
    //   items.forEach(_el => {
    //     if (allSizes[_el]) {
    //       allSizes[element[0]] += allSizes[_el];
    //     }
    //   });
    // });

    // Object.values(allSizes).forEach(el => {
    //   if (el <= 100000) {
    //     score += el;
    //   }
    // });

    // console.log('allSizes ', allSizes);
    // console.log('score :: ', score);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      {/* <ConcurrentStartTransition /> */}
      {/* <StartTransitionWithSupense /> */}
      <WithDeferredValue />
      </header>
    </div>
  );
}

export default App;
