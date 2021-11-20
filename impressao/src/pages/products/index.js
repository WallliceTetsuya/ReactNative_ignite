import React from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput,Text, SafeAreaView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';



function PageProducts(){
    return(
        <SafeAreaView style={{width:'100%'}} >
            <View  style={styles.container}> 
                <View style={{width:'65%', justifyContent:'center'}}>
                    <Text style={styles.descricao} >dasdas</Text>
                    <Text style={styles.descricao} >dasdas</Text>
                </View>
              
                <View style={{width:'35%', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                      
                <Icon.Button tyle={styles.button} name="plus-circle" size={25}  backgroundColor='transparent' solid/>
                
                <TextInput 
                    style={styles.input}
                    placeholder='0'
                    placeholderTextColor='#555' 
                    // onChangeText={setNewSkill}
                />

                <Icon.Button tyle={styles.button} name="minus-circle"  size={25} backgroundColor='transparent'  solid/>
                </View>


            </View>
           
        </SafeAreaView>
        
    )
} 



export default PageProducts;


const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      paddingHorizontal:10
    },
    input: {
        backgroundColor:'#1F1E25',
        color: '#FFF',
        fontSize: 20,
        flex:1,
        textAlign:'center'
    },
    descricao:{
        color:'#555' 
    }
});

