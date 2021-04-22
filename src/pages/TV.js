import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { SearchPanel, Menu, MovieContainer, ModalCardTv, Country, Language } from '../components'
import MovieCategories from '../components/MovieCategories'

const TV = (props) => {
    const myCategoryName = useSelector(state => state.myCategoryName)
    const [modalFlag, setModalFlag] = useState(false)
    const country = useSelector(state => state.country)
    const language = useSelector(state => state.language)

    // React.useLayoutEffect(() => {
    //   props.navigation.setOptions({
    //   title: myCategoryName=='' ? 'FAVORITES' : myCategoryName.toString().toUpperCase(),
    //    });
    //  }, [myCategoryName]);

    const selectedTrend = (apiUrl, header) => {
        props.navigation.navigate("TrendPage", { apiUrl, header, mediaType: 'tv' })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#424242', flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}><SearchPanel navigation={props.navigation} myPlaceHolder="Search on TV"
                        mediaType="tv"
                    /></View>

                    <View style={{ flex: 1 }}><Menu modalAction={() => setModalFlag(true)} /></View>


                    <ModalCardTv visibleFlag={modalFlag}
                        changeModalFlag={() => setModalFlag(false)}
                        navigation={props.navigation} />
                </View>


                <View>
                    <MovieCategories language={language.iso_639_1} mediaType="tv" />
                </View>
                <MovieContainer router={props.navigation} country={country} language={language.iso_639_1} mediaType="tv" />

            </View>
        </SafeAreaView>
    )
}

export { TV };

const styles = StyleSheet.create({
    category: {
        padding: 7,
        borderRadius: 3,
        backgroundColor: "#6a1b9a",
        marginLeft: 3,
        marginBottom: 5,
        marginTop: 5,
    },
    selectedItem: {
        padding: 9,
        borderRadius: 3,
        backgroundColor: "#7b1fa2",
        marginLeft: 3,
        marginBottom: 3,
        marginTop: 3,
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    }
})