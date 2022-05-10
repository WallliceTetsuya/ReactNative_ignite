import React, {useState} from 'react';
import {Modal, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Products from './Pages/Products';
import Config from './Pages/getEvent';


export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Modal visible={modalVisible} animationType="fade" transparent={false}>
        <Config setModalVisible={setModalVisible} />
      </Modal>
      <Products setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
  },
});
