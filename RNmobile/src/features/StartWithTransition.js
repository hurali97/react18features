import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const dummyData = Array(1000).fill(1);

const NonUrgentUI = ({value, isPending}) => {
  const backgroundStyle = {backgroundColor: value % 2 === 0 ? 'red' : 'green'};
  return (
    <View>
      <Text>Non urgent update value: {isPending ? 'PENDING' : value}</Text>
      <View style={[styles.container, backgroundStyle]}>
        {dummyData.map((_, index) => (
          <View key={index} style={styles.item} />
        ))}
      </View>
    </View>
  );
};

const StartWithTransition = () => {
  const [value, setValue] = React.useState(1);
  const [nonUrgentValue, setNonUrgentValue] = React.useState(1);
  const [isPending, startTransition] = React.useTransition();

  const handleClick = () => {
    const newValue = value + 1;
    setValue(newValue);
    startTransition(() => {
      setNonUrgentValue(newValue);
    });
  };

  return (
    <View>
      <Button onPress={handleClick} title="Increment value" />
      <Text>Value: {value}</Text>
      <NonUrgentUI value={nonUrgentValue} isPending={isPending} />
    </View>
  );
};

export default StartWithTransition;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flexWrap: 'wrap'},
  item: {width: 10, height: 10},
});
