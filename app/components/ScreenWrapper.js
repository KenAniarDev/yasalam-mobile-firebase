import React from 'react';
import { View, StyleSheet } from 'react-native';

const ScreenWrapper = ({ children, backgroundColor }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor ?? '#F4F4F4' },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
});

export default ScreenWrapper;
