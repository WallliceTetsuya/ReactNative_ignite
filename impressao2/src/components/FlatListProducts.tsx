import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default (props) => {
  return (
    <View style={styles.container}>
      <View style={{width: '70%', justifyContent: 'center'}}>
        <Text style={styles.product}> {props.data.item.title} </Text>
        <Text style={styles.valueProduct}> R$ {props.data.item.value} </Text>
      </View>

      <View style={styles.addOrRemove}>
        <Icon.Button
          name="minus-circle"
          onPress={() => props.remover(props.data.item)}
          disabled={props.data.item.qtde === 0}
          size={20}
          backgroundColor="transparent"
        />

        <Text style={styles.textQtde}> {props.data.item.qtde || '0'} </Text>

        <Icon.Button
          name="plus-circle"
          onPress={() => props.adicionar(props.data.item)}
          size={20}
          backgroundColor="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal : 5,
    flex: 1,
  },
  textQtde: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginEnd: 10,
  },
  product: {
    color:'#FFF9',
    fontSize: 25,
  },
  valueProduct: {
    color:'#555',
    fontSize: 18,
  },
  addOrRemove: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
