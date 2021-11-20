import React,{useState} from 'react';
import {View, StyleSheet, TextInput,Text, FlatList, SafeAreaView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const DATA = [
    {id:	1,	title:	'Skol1',	value:	'7,5'},
    {id:	2,	title:	'RedBull1',	value:	'8'},
    {id:	3,	title:	'Skol2',	value:	'8,5'},
    {id:	4,	title:	'RedBull2',	value:	'9'},
    {id:	5,	title:	'Skol3',	value:	'9,5'},
    {id:	6,	title:	'RedBull3',	value:	'10'},
    {id:	7,	title:	'Skol4',	value:	'10,5'},
    {id:	8,	title:	'RedBull4',	value:	'11'},
    {id:	9,	title:	'Skol5',	value:	'11,5'},
    {id:	10,	title:	'RedBull5',	value:	'12'}
  ];

  

const Item = ({ title,value }) => (
    
    <View  style={styles.container} > 
        <View style={{width:'60%', justifyContent:'center'}}>
            <Text style={styles.product} >{title}</Text>
            <Text style={styles.valueProduct} >R$ {value}</Text>
        </View>

        <View style={{width:'40%', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Icon.Button tyle={styles.button} name="plus-circle" size={20} backgroundColor='transparent' solid/>
            
            <TextInput 
                style={styles.input}
                placeholder='0'
                placeholderTextColor='#555' 
                // onChangeText={setNewSkill}
            />

            <Icon.Button tyle={styles.button} name="minus-circle"  size={20} backgroundColor='transparent'  solid/>
        </View>
    </View>
  );
  

function PageProducts(){
    const [searchFilter, setSearchFilter] = useState('')
    const DATAFilter = DATA.filter((DATA) => DATA.title.toLowerCase().includes(searchFilter.toLowerCase()))

    const renderItem = ({ item }) => (
        <Item title={item.title} value={item.value}/>
    );

    
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
                />
            </View>
        
            <View style={{flex:1,justifyContent:'center'}}>
                <Text>Total</Text>
            </View>
        </View>
    )
} 

export default PageProducts;


const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      paddingHorizontal:10,
    },
    input: {
        backgroundColor:'#1F1E25',
        color: '#FFF',
        fontSize: 20,
        flex:1,
        textAlign:'center',
        borderRadius:100,
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

