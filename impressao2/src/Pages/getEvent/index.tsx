import React, {useEffect, useState} from 'react';
import {Alert, Pressable, Image, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {setObject,getObject} from '../../Storage';
import {getInfo, getProducts, getColaboradores} from '../../Api';
import md5 from 'md5';


export default (props) => {

  const [chave, setChave] = useState('ECP-191585');
  const [eventData, setEventData] = useState({
    empresa: {
      logo: '',
    },
    evento: {
      nome: '',
      artista: '',
      data: '',
    },
  });

  const [user, setUser] = useState('douglas');
  const [pass, setPass] = useState('xvzfxvzf#1234!');

  async function importEvent() {

    Alert.alert('Aguarde', 'Importando evento...');

    await getInfo(chave)
      .then(r => {
        setObject('event', r.data);

        getProducts(r.data.evento.id_evento)
          .then(response => {
            const productList = response.data.produtos;
            setObject('products', productList);
          })
          .catch(err => {
            alert(err);
          });

        getColaboradores(r.data.evento.id_evento)
          .then(response => {
            const colaboradorList = response.data.colaboradores;
            setObject('colaboradores', colaboradorList);
          })
          .catch(err => {
            alert(err);
          });


        getObject('colaboradores')
          .then(response => {
            // procurar login

            const colaborador = response.find(
              colaborador => colaborador.login === user,
            );
            if (colaborador) {
              const passMd5 = md5(pass);

              if (colaborador.senha == passMd5) {
                // login ok
                setObject('user', colaborador);
                Alert.alert('Sucesso', 'Evento importado com sucesso');

                // props.navigation.navigate('Home');
              } else {
                // login errado
                Alert.alert('Erro', 'Login ou senha incorretos');
              }
            } else {
              // login errado
              Alert.alert('Erro', 'Login ou senha incorretos');
            }
          })
          .catch(err => {
            alert(err);
          });
      })
      .catch(err => {
        alert(err);
      });

  };
  
  useEffect(() => {
    getObject('event')
      .then(r => {
        if (r) {
          setEventData(r);
          
        }
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconClose}>
        <Icon
          name="times"
          size={30}
          color="red"
          style={styles.icon}
          onPress={() => props.setModalVisible(false)}
        />
      </View>
      {/* <View style={styles.copoConfig} >
        <View style={{flex: 1}}>
          <TextInput
            style={styles.inputFilter}
            placeholder="Chave"
            value={chave}
            placeholderTextColor="#555"
            onChangeText={text => setChave(text)}
          />
        </View>
        <View style={{justifyContent: 'center'}} >
          <Icon
            name="download"
            size={20}
            color="#555"
            style={{marginRight: 10}}
            onPress={() => importEvent()}
          />
        </View>
      </View> */}
      <View style={styles.copoConfig} >
        <View style={{flex: 1}}>
          <TextInput
            style={styles.inputFilter}
            placeholder="Usuário"
            placeholderTextColor="#555"
            onChangeText={text => setUser(text)}
            value={user}
          />
          <TextInput
            style={styles.inputFilter}
            placeholder="Senha"
            placeholderTextColor="#555"
            onChangeText={text => setPass(text)}
            value={pass}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.inputFilter}
            placeholder="Chave"
            value={chave}
            placeholderTextColor="#555"
            onChangeText={text => setChave(text)}
          />
       
          <Pressable style={styles.button} onPress={() => importEvent()}>
            <Text style={styles.login}>Login / Importar</Text>
          </Pressable>

        </View>
      </View>
      <View style={{marginBottom: 20,alignItems:'center'}} >
        <Image source={{uri: `data:image/jpeg;base64,${eventData.empresa.logo}`}} 
          style={styles.logo} 
        />
        <Text style={styles.title}>Evento: {eventData.evento.nome}</Text>
        <Text style={styles.title}>Artista: {eventData.evento.artista}</Text>
        <Text style={styles.title}>Data: {eventData.evento.data}</Text>
        <Text style={styles.title}>Estoque: {eventData.empresa.bloqueia_estoque == 1 ? 'Bloqueado' : 'Desbloqueado'}</Text>
      </View>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121015',
  },
  iconClose: {
    
    color: '#FFF',
    fontSize: 40,
    marginTop: 20,
    marginEnd: 20,
    width:'100%',
    alignItems: 'flex-end'
  },
  copoConfig: {
    flexDirection: 'row'
  },
  inputFilter: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 100,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  logo: {
    width: 66, 
    height: 58,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 10,
  },
  detalhesEvento: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#30256e',
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 100,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    color: '#FFF',
    textAlign: 'center',
  },
  
});
