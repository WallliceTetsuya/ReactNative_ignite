import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FlatListProducts from '../../components/FlatListProducts';
import FlatListSeparator from '../../components/FlatListSeparator';
import RNPrint from 'react-native-print';
import {getInfo, getProducts} from '../../Api';

export default () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const calculaTotal = () => {
    setTotal(
      carrinho.reduce(
        (acc, product) =>
          acc + parseFloat(product.value.replace(',', '.')) * product.qtde,
        0,
      ),
    );

  };

  const productsFilter = products.filter(product => {
    return product.nome.toLowerCase().includes(searchFilter.toLowerCase());
  });

  async function printHTML() {
    const ano = new Date().getFullYear();
    const dia_mes =
      (new Date().getDate() < 10
        ? '0' + new Date().getDate()
        : new Date().getDate()) +
      '/' +
      (new Date().getMonth() + 1 < 10
        ? '0' + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1);

    const semana = new Array("Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado");
    const dia_semana = semana[new Date().getDay()];

    var html = '<html><body>';
    html += '<table>';

    carrinho.forEach(product => {
      for (let i = 0; i < product.qtde; i++) {
        html += ` <tr>
                    <th style="width: 40%;">
                      <h1 style="margin-bottom: 0px;font-family: system-ui;">
                        <img src="https://showmanager.moldar.net/eventos/1339/logo">
                      </h1>
                    </th>
                    <th style="color: gray;">
                      <h1 style="margin-bottom: 0px;" ><i>${ano}</i></i></h1>
                      <h6 style="margin: 0;">${dia_semana} ${dia_mes} </h6>
                    </th>
                  </tr>
                  `;
        html += ` <tr>
                    <td style="padding-top: 10px;border-bottom: 1px solid;" colspan="2" align="center" ><h3><b>${product.nome}</b></h3></td>
                  </tr>`;
      }
    });
    html += '</table>';
    html += '</body></html>';

    await RNPrint.print({
      html,
    })
      .then(() => {
        console.log('Printed');
      })
      .catch(err => {
        console.log(err);
      });
  }

  function addItem(item: any) {
    const itemCarrinho = carrinho.find(product => product.id === item.id);

    if (itemCarrinho) {
      itemCarrinho.qtde++;
    } else {
      item.qtde = 1;
      carrinho.push(item);
    }

    setCarrinho(oldState => [... oldState]);
  }

  function removeItem(item: any) {
    const itemCarrinho = carrinho.find(product => product.id === item.id);

    if (itemCarrinho) {
      if (itemCarrinho.qtde > 1) {
        itemCarrinho.qtde--;
      } else {
        item.qtde = 0;
        carrinho.splice(carrinho.indexOf(itemCarrinho), 1);
      }
    }

    setCarrinho(oldState => [... oldState]);

  }

  useEffect(() => {
    // merge products and carrinho
    calculaTotal();
  }, [removeItem, addItem]);

  useEffect(() => {
    getInfo('ECP-191585').then(r => {
      getProducts(r.data.evento.id_evento).then(response => {
        console.log(response.data.produtos);
        const productList = response.data.produtos;
        setProducts(productList);
      });
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 10}}>
        <TextInput
          style={styles.inputFilter}
          placeholder="Buscar"
          placeholderTextColor="#555"
          onChangeText={setSearchFilter}
        />
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
            onPress={() => printHTML()}
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
