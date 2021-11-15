import React from "react";
import { 
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

export default ({skill}) => {
    return (
        <TouchableOpacity style={styles.buttonSkill}>
            <Text style={[styles.textSkill]}>
                {skill}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonSkill:{
        backgroundColor: '#1F1E25',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical:5
    },
    textSkill:{
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold'
    }
})
