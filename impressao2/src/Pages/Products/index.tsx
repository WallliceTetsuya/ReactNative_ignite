import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FlatListProducts from '../../components/FlatListProducts';
import FlatListSeparator from '../../components/FlatListSeparator';
import htmlTiquet from '../../Print/printEtiqueta';
import RNPrint from 'react-native-print';
import {getObject} from '../../Storage';


export default (props) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [imageBase64, setImageBase64] = useState('');


  async function printHTML(carrinho) {
    const html = await htmlTiquet(carrinho, imageBase64);
    RNPrint.print({
      html,
    })
      .then(() => {
        setCarrinho([]);
        // falta limpar a quantidade de produtos
      })
      .catch(err => {
        alert(err);
      });
  };

  const calculaTotal = () => {
    setTotal(carrinho.reduce((acc, product) => acc + product.preco, 0));
  };

  const productsFilter = products.filter(product => {
    return product.nome.toLowerCase().includes(searchFilter.toLowerCase());
  });

  function addItem(item: any) {
    carrinho.push(item);

    products
      .filter(product => product.id === item.id)
      .map(product => {
        product.qtde = product.qtde + 1;
      });
    
    setCarrinho(oldState => [... oldState]);
  }

  function removeItem(item: any) {
    const itemCarrinho = carrinho.find(product => product.id === item.id);

    products
      .filter(product => product.id === item.id)
      .map(product => {
        product.qtde = product.qtde - 1;
      });

    if (itemCarrinho) {
      carrinho.splice(carrinho.indexOf(itemCarrinho), 1);
      setCarrinho(oldState => [... oldState]);
    }
  }

  function mergeCarrinho(productsMerge) {
    carrinho.map(item => {
      const product = productsMerge.find(product => product.id === item.id);
      if (product) {
        product.qtde = item.qtde;
      }
    });

    return productsMerge;
  }

  function alimentarDados(){
    getObject('products')
      .then(response => {
        if (response) {
          setProducts(response);
        }
      })
      .catch(err => {
        alert(err);
      });

    getObject('event')
      .then(response => {
        if (response) {
          setImageBase64(response.empresa.logo);
        }
      }
    ).catch(err => {
        alert(err);
    }
    );
  }

  useEffect(() => {
    calculaTotal();
  }, [removeItem, addItem]);



  useEffect(() => {
    alimentarDados();
  }, [props]);

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 15,flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TextInput
            style={styles.inputFilter}
            placeholder="Buscar"
            placeholderTextColor="#555"
            onChangeText={setSearchFilter}
          />
        </View>
        <View style={{justifyContent: 'center'}} >
          <Icon
            name="cog"
            size={20}
            color="#555"
            style={{marginRight: 10}}
            onPress={() => props.setModalVisible(true)}
          />
        </View>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          style={{marginVertical: 10}}
          data={productsFilter}
          renderItem={item => (
            <FlatListProducts
              adicionar={addItem}
              remover={removeItem}
              data={item}
            />
          )}
          ItemSeparatorComponent={FlatListSeparator}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, marginStart: 15}}>
          <Text style={styles.totalLabel}> Total </Text>
          <Text style={styles.totalValue}> R$ {total.toFixed(2)} </Text>
        </View>
        <View>
          <Icon.Button
            name="print"
            onPress={() => printHTML(carrinho)}
            size={25}
            backgroundColor="transparent"
            color={carrinho.length === 0 ? 'black' : '#fff'}
            disabled={carrinho.length === 0}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFilter: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 100,
    marginHorizontal: 20,
  },
  totalLabel: {
    color: '#555',
    fontSize: 15,
  },
  totalValue: {
    color: '#FFF',
    fontSize: 25,
  },
});
