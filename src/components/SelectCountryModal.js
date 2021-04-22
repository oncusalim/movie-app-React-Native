import React, { useState, useEffect } from 'react';
import {
    View, TextInput, Text, TouchableOpacity,
    StyleSheet, Dimensions, FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_KEY } from '@env';

const SelectCountryModal = (props) => {

    const [countryList, setCountryList] = useState([]);
    const [typedCountry, setTypedCountry] = useState([]);


    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/configuration/countries?api_key=${API_KEY}`)
        setCountryList(data); setTypedCountry(data);

    }

    const searchAction = (value) => {
        const filteredValue = countryList.filter(item => {
            const text = value.toUpperCase();
            const itemCountry = item.english_name.toUpperCase();
            return itemCountry.indexOf(text) > -1;

        })
        console.log(value)

        setTypedCountry(filteredValue)
    }

    const renderSearchList = ({ item }) => {
        return (
            <TouchableOpacity style={styles.countryList}
                onPress={() => props.onSelectCountry(item)}
            >
                <Text style={styles.countryText}>{item.english_name}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        fetchData()

    }, [])

    console.log(typedCountry)
    return (
        <View>

            <Modal isVisible={props.visibleFlag}

                onBackdropPress={() => props.changeCountryModalFlag()}
            >
                <View style={styles.modal}>
                    <View style={styles.input}>
                        <TextInput
                            onChangeText={(value) => searchAction(value)}
                            placeholder="Type Your Region"
                        />
                    </View>
                    <View style={{ height: Dimensions.get("window").height * 0.55 }}>
                        <FlatList
                            keyExtractor={(_, i) => i.toString()}
                            data={typedCountry}
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

export { SelectCountryModal }

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
        borderRadius: 4,
    },

    countryList: {
        margin: 4,
        padding: 4,
        borderRadius: 4,
        backgroundColor: 'gray',
    },
    countryText: {
        fontSize: 13,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})