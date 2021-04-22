import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectLanguageModal } from './SelectLanguageModal';
import { useDispatch } from 'react-redux';



const Language = (props) => {

    const [language, setLanguage] = useState("EN");
    const [modalFlag, setModalFlag] = useState(false);
    const dispatch = useDispatch();

    const getLanguage = async () => {
        let getData = await AsyncStorage.getItem('@myLanguage')
        if ((getData == null) || (getData == undefined)) {
            await AsyncStorage.setItem('@myLanguage', JSON.stringify({
                "iso_639_1": "en",
                "english_name": "English",
                "name": "English"
            }))
            dispatch({
                type: "LANGUAGE_SET", payload: {
                    "iso_639_1": "en",
                    "english_name": "English",
                    "name": "English"
                }
            })
        }
        else {
            setLanguage(JSON.parse(getData).iso_639_1.toUpperCase())
            dispatch({ type: "LANGUAGE_SET", payload: JSON.parse(getData) })
        }

    }
    const setDataLanguage = async (value) => {
        await AsyncStorage.setItem('@myLanguage', JSON.stringify(value))
        dispatch({ type: "LANGUAGE_SET", payload: value })
    }

    useEffect(() => {
        getLanguage()
        //setDataLanguage("")
        //AsyncStorage.removeItem('@myLanguage')

    }, [])

    return (
        <TouchableOpacity style={styles.container} onPress={() => setModalFlag(true)} >

            <SelectLanguageModal visibleFlag={modalFlag}
                onSelectLanguage={(item) => { setLanguage(item.iso_639_1.toUpperCase()); setModalFlag(false); setDataLanguage(item) }}
                changeLanguageModalFlag={() => setModalFlag(false)}
            />

            <Text style={styles.text}> {language} ▾ </Text>

        </TouchableOpacity>

    )
}

export { Language }

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 0.2,
        borderRadius: 1,
        borderColor: '#e0e0e0'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#e0e0e0',
        marginLeft: 3,
        marginRight: 3
    }
})