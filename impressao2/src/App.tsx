import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Products from './Pages/Products';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Products />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
  },
});
