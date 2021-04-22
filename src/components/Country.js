import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectCountryModal } from './SelectCountryModal';
import { useDispatch, useSelector } from 'react-redux';


const Country = (props) => {

    const [country, setCountry] = useState("US");
    const [modalFlag, setModalFlag] = useState(false);
    const dispatch = useDispatch();
    const myCountry = useSelector(state => state.country)

    const getCountry = async () => {
        let getData = await AsyncStorage.getItem('@myCountry')


        if ((getData == null) || (getData == undefined)) {
            await AsyncStorage.setItem('@myCountry', "US")
            dispatch({ type: "COUNTRY_SET", payload: country })

        }
        else {
            setCountry(getData)
            dispatch({ type: "COUNTRY_SET", payload: getData })

        }
    }
    const setDataCountry = async (value) => {
        await AsyncStorage.setItem('@myCountry', value)
        dispatch({ type: "COUNTRY_SET", payload: value })
    }

    useEffect(() => {
        getCountry()
        //setDataCountry("")
        //AsyncStorage.removeItem('@myCountry')
    }, [])

    return (
        <View style={styles.container}>
            <SelectCountryModal visibleFlag={modalFlag}
                changeCountryModalFlag={() => setModalFlag(false)}
                onSelectCountry={(item) => { setCountry(item.iso_3166_1); setModalFlag(false); setDataCountry(item.iso_3166_1) }}
            />
            <TouchableOpacity onPress={() => setModalFlag(true)}>

                <Image
                    style={styles.image}
                    source={{ uri: `https://flagcdn.com/48x36/${country?.toLowerCase()}.png` }}

                />
            </TouchableOpacity>
        </View>
    )
}

export { Country }

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,


    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    image: {
        width: Dimensions.get("window").width / 10,
        height: Dimensions.get("window").height / 25
    }
})