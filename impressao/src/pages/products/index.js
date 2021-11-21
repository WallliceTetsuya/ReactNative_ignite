import React,{useState,useEffect} from 'react';
import {View, StyleSheet, TextInput,Text, FlatList, SafeAreaView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

var DATA = [
    {id:	1,	title:	'Skol1',	value:	'7,5'},
    {id:	2,	title:	'RedBull1',	value:	'8'},
    {id:	3,	title:	'Skol2',	value:	'8,5'},
    {id:	4,	title:	'RedBull2',	value:	'9'},
    {id:	5,	title:	'Skol3',	value:	'9,5'},
    {id:	6,	title:	'RedBull3',	value:	'10'},
    {id:	7,	title:	'Skol4',	value:	'10,5'},
    {id:	8,	title:	'RedBull4',	value:	'11'},
    {id:	9,	title:	'Skol5',	value:	'11,5'},
    {id:	10,	title:	'RedBull5',	value:	'12'},
  ];

  

function PageProducts(){
    const [searchFilter, setSearchFilter] = useState('')
    const [carrinho, setCarrinho] = useState([])
    const [total, setTotal] = useState(0);

    const adicionar = (item) => {
        var criar = true;
        var array = item;

        carrinho.map((chave)=> {
            if (chave.id == array.id) {
                chave['qtde'] = chave.qtde + 1;
                setCarrinho(carrinho);
                criar = false;
            }
        })

        if(criar){
            array['qtde'] = 1 ;
            setCarrinho(oldState => [... oldState,array]);
        }
        
        setCarrinho(oldState => [... oldState]);

        setTotal()
    };

    const remover = (item) => {
        var array = item;

        var key = carrinho.keys();

        carrinho.map((chave)=> {

            keyAtual = key.next();

            if (chave.id == array.id) {
                chave['qtde'] = chave.qtde - 1;
                if (chave.qtde == 0) {
                    carrinho.splice(keyAtual.value, 1);
                }
                setCarrinho(carrinho);
            }
        })

        setCarrinho(oldState => [... oldState]);


    };

    useEffect(() => {
        var total = 0;
        carrinho.map((chave)=> {
            total += parseInt(chave.qtde) * parseFloat(chave.value.replace(',', '.'))  

        })

        setTotal(total.toString().replace('.',','));
    }, [remover,adicionar])


    const DATAFilter = DATA.filter((DATA) => DATA.title.toLowerCase().includes(searchFilter.toLowerCase()))

    const renderItem = ({ item }) => (
        <View  style={styles.container} > 
            <View style={{width:'70%', justifyContent:'center'}}>
                <Text style={styles.product} >{item.title}</Text>
                <Text style={styles.valueProduct} >R$ {item.value}</Text>
            </View>

            <View style={{width:'30%', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Icon.Button tyle={styles.button} name="plus-circle" onPress={() => adicionar(item)} size={20} backgroundColor='transparent' solid/>
                
                <Text style={styles.textQtde}>
                    {item.qtde || '0'}
                </Text>

                <Icon.Button tyle={styles.button} name="minus-circle"  onPress={() =>  remover(item)}  size={20} backgroundColor='transparent'  solid/>
            </View>
        </View>

        
    );

    
    const renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#CED0CE",
              marginVertical:8
            }}
          />
        );
      };



    return(
        <View style={{flex:1}}>
            <View style={{flex:2,justifyContent:'center'}}>
                <TextInput 
                     style={styles.inputFilter}
                     placeholder='Buscar'
                     placeholderTextColor='#555' 
                     onChangeText={setSearchFilter}
                />
            </View>
               

            <View style={{flex:10}} >
                <FlatList 
                    data={DATAFilter}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={renderSeparator}

                />
            </View>

            <View style={{flex:2,justifyContent:'center'}}>
                <Text style={{marginStart:15, color: '#555',fontSize: 15}} >Total </Text>
                <Text style={{marginStart:15, color: '#FFF',fontSize: 25}} >R$ {total}</Text>
            </View>
        </View>
    )
} 

export default PageProducts;


const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      paddingStart:10,
      flex:1
    },
    textQtde: {
        color: '#FFF',
        fontSize: 20,
        textAlign:'center',
        marginEnd:10,
    },
    inputFilter: {
        backgroundColor:'#1F1E25',
        color: '#FFF',
        fontSize: 20,
        textAlign:'center',
        borderRadius:100,
        marginHorizontal:20
    },
    product:{
        color:'#FFF9',
        fontSize:25
    },
    valueProduct:{
        color:'#555',
        fontSize:18

    }
});

