import React from 'react';
import { View, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Menu = (props) => {
    return (
        <TouchableOpacity style={{ alignSelf: 'flex-end' }}
            onPress={() => props.modalAction()}
        >
            <Icon name="menu" size={50} color="#e0e0e0" />
        </TouchableOpacity>
    )
}

export { Menu }

