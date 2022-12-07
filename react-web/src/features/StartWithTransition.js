import React from 'react';
import { useState, useTransition } from 'react';

const dummyData = Array(8000).fill(1);

const NonUrgentUI = ({value, isPending}) => {
  const backgroundStyle = {backgroundColor: value % 2 === 0 ? 'red' : 'green'};
  return (
    <div>
      <p>Non urgent update value: {isPending ? 'PENDING' : value}</p>
      <div style={{...styles.container, ...backgroundStyle}}>
        {dummyData.map((_, index) => (
          <div key={index} style={styles.item} />
        ))}
      </div>
    </div>
  );
};

const StartWithTransition = () => {
  const [value, setValue] = useState(1);
  const [nonUrgentValue, setNonUrgentValue] = useState(1);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const newValue = value + 1;
    setValue(newValue);
    startTransition(() => {
      setNonUrgentValue(newValue);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Increment value</button>
      <p>Value: {value}</p>
      <NonUrgentUI value={nonUrgentValue} isPending={isPending} />
    </div>
  );
};

export default StartWithTransition;

const styles = {
  container: { height: 100, width: 100},
  item: { width: 10, height: 10 },
};
