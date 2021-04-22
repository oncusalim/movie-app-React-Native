import React, { useState, useEffect } from 'react';
import {
    View, TextInput, Text, TouchableOpacity,
    StyleSheet, Dimensions, FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_KEY } from '@env';
import language from '../language.json';

const SelectLanguageModal = (props) => {

    const [languageList, setLanguageList] = useState(language);
    const [typedLanguage, setTypedLanguage] = useState(language);


    const searchAction = (value) => {
        const filteredValue = languageList.filter(item => {
            const text = value.toUpperCase();
            const itemLanguage = item.english_name.toUpperCase();
            return itemLanguage.indexOf(text) > -1;

        })


        setTypedLanguage(filteredValue)
    }

    const renderSearchList = ({ item }) => {
        return (
            <TouchableOpacity style={styles.countryList}
                onPress={() => props.onSelectLanguage(item)}
            >
                <Text style={styles.languageText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }



    console.log(typedLanguage)
    return (
        <View>

            <Modal isVisible={props.visibleFlag}

                onBackdropPress={() => props.changeLanguageModalFlag()}
            >
                <View style={styles.modal}>
                    <View style={styles.input}>
                        <TextInput
                            onChangeText={(value) => searchAction(value)}
                            placeholder="Type Your Language"
                        />
                    </View>
                    <View style={{ height: Dimensions.get("window").height * 0.55 }}>
                        <FlatList
                            keyExtractor={(_, i) => i.toString()}
                            data={typedLanguage}
                            renderItem={(data) => renderSearchList(data)}
                            autoCompleteType="off"
                            clearTextOnFocus={true}


                        />
                    </View>

                </View>
            </Modal>
        </View>
    )
}

export { SelectLanguageModal }

const styles = StyleSheet.create({
    modal: {
        borderRadius: 3,
        backgroundColor: 'white',
        height: Dimensions.get("window").height * 0.7,
        width: Dimensions.get("window").width * 0.7,
        position: 'absolute',
        opacity: 0.9,
        top: '14%',
        right: '3%',
        padding: 5,
        alignItems: 'center',
    },

    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center'
    },
    input: {
        backgroundColor: 'gray',
        width: Dimensions.get("window").width / 2,
        margin: 5,
        borderRadius: 3,
    },

    countryList: {
        margin: 4,
        padding: 4,
        borderRadius: 4,
        backgroundColor: 'gray',
    },
    languageText: {
        fontSize: 15,
        fontWeight: 'bold',

    }
})