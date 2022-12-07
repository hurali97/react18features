import React, {memo, useDeferredValue, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const ListItem = ({children}) => {
  for (let i = 0; i < 100000; i++) {
    // Note: this is an INTENTIONALLY EMPTY loop
    //
    // It's meant to emulate what happens in a deep
    // component tree with calculations and other
    // work performed inside components that can't
    // trivially be optimized or removed.
  }
  return <Text>{children}</Text>;
};

const MySlowList = memo(({text}) => {
  let items = [];
  for (let i = 0; i < 80; i++) {
    items.push(
      <ListItem key={i}>
        Result #{i} for "{text}"
      </ListItem>,
    );
  }
  return (
    <>
      <Text>Results for "{text}":</Text>
      <View>{items}</View>
    </>
  );
});

const WithDeferredValue = () => {
  const [text, setText] = useState('hello');

  // This is a new feature in Concurrent Mode.
  // This value is allowed to "lag behind" the text input:
  const deferredText = useDeferredValue(text);

  const handleChange = txt => {
    setText(txt);
  };

  return (
    <View>
      <Text>React With Concurrency</Text>
      <View>
        <Text>Type into the input:</Text>
        <TextInput
          value={text}
          onChangeText={handleChange}
          style={styles.input}
        />
      </View>

      {/* Pass the "lagging" value to the list */}
      <MySlowList text={deferredText} />
    </View>
  );
};

export default WithDeferredValue;

const styles = StyleSheet.create({
  input: {borderWidth: 0.5, padding: 6, color: '#000', margin: 10},
});
