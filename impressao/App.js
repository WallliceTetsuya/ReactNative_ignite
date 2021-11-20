 import React, { Component } from 'react';
 import {
   Button,
   SafeAreaView,
   StyleSheet,
   Text,
   View
 } from 'react-native';
 
 import RNPrint from 'react-native-print';

 import PageProducts from './src/pages/products';
 export default class App extends Component {
 
   async printHTML() {
     await RNPrint.print({
       html: `<h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>`
     })
   }
 
   render() {
     return (
       <SafeAreaView style={styles.container}>
         
         {/* <Button onPress={this.printHTML} title="Print HTML" /> */}
         
          <PageProducts/>
    
       </SafeAreaView>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#121015',
   },
 });