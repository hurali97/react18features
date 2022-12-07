/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import StartTransitionWithSupense from './src/features/StartTransitionWithSuspense';
import WithDeferredValue from './src/features/WithDeferredValue';
import StartWithTransition from './src/features/StartWithTransition';

const App: () => Node = () => {
  const [enabledState, setEnabledState] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderSections = () => {
    switch (enabledState) {
      case 'with-suspense':
        return <StartTransitionWithSupense />;
      case 'with-deferred':
        return <WithDeferredValue />;
      case 'with-transition':
        return <StartWithTransition />;

      default:
        break;
    }
  };

  const onPress = stateToEnable => {
    if (enabledState) {
      setEnabledState('');
    } else {
      setEnabledState(stateToEnable);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button
        title="Start With Transition"
        onPress={() => onPress('with-transition')}
      />
      <Button
        title="Start Transition With Suspense"
        onPress={() => onPress('with-suspense')}
        color="green"
      />
      <Button
        title="With Deferred Value"
        onPress={() => onPress('with-deferred')}
        color="red"
      />
      <View style={styles.container}>{renderSections()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

export default App;
