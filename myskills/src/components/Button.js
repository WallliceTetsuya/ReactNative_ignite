
import React from "react";
import { 
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";



export default () => {
    return (
        <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.7}
            // onPress={handleAddNewSkill} 
        >

            <Text style={styles.buttonText} >Add</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button:{
        backgroundColor:'#A370F7',
        padding:20,
        borderRadius:10,
        alignItems:'center',
        marginTop: 20
    },
    buttonText:{
        color:"#FFF",
        fontSize: 17,
        fontWeight: 'bold'
    }
})
