import React, { useState } from "react";
import { 
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput, 
    Platform
} from "react-native";

import Button from "../components/Button";
import SkillCard from "../components/SkillCard";

export function Home(){

    const [newSkill, setNewSkill] = useState();
    const [mySkill, setMySkill] = useState([]);

    function handleAddNewSkill() {
        setMySkill(oldState => [... oldState,newSkill]);
    }

    return (
      <SafeAreaView style={styles.container} >
        <Text style={styles.title} >Welcome, Wallice</Text>

        <TextInput 
            style={styles.input}
            placeholder='New skill'
            placeholderTextColor='#555' 
            onChangeText={setNewSkill}
        />

        <Button/>

        <Text style={[styles.title,{marginVertical: 40}]}>
            My Skill
        </Text>


        {
            mySkill.map(skill => (
               <SkillCard/>
            ))
        }


      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#121015',
        paddingHorizontal:30,
        paddingVertical:70
    },
    title: {
        color:'#FFF',
        fontSize:24,
        fontWeight:'bold'
    },
    input: {
        backgroundColor:'#1F1E25',
        color: '#FFF',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop:30,
        borderRadius:10
    }
})
