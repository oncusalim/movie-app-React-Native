import React from 'react';
import { TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.text}>Find</Text>
        </TouchableOpacity>
    )
}

export { Button }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        width: Dimensions.get("window").width / 6,
        borderRadius: 8,
        padding: 12,
        margin: 5,
        alignItems: 'center',
    },
    text: {
        color: '#673ab7',
        fontSize: 16,
        fontWeight: 'bold',
    }
})
