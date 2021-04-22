import React, { useState } from 'react';
import {
    View, Text, SafeAreaView, KeyboardAvoidingView,
    TextInput, StyleSheet, Dimensions, TouchableOpacity, Platform, ScrollView
} from 'react-native';
import { SearchPanel, SearchSortModal, SearchGenreModal, ReklamBanner } from '../components';

const SearchScreen = (props) => {
    const [advanceSelector, setAdvanceSelector] = useState(false);
    const [modalSortActive, setModalSortActive] = useState(false);
    const [modalGenreActive, setModalGenreActive] = useState(false);
    const [sortValue, setSortValue] = useState("");
    const [sortTextValue, setSortTextValue] = useState("Filter...                 ▼");
    const [genreTextValue, setGenreTextValue] = useState("Select a Genre...    ▼");
    const [releaseYear, setReleaseYear] = useState("");
    const [keywords, setKeywords] = useState("");
    const [genreValue, setGenreValue] = useState("")

    const getModal = (value) => {
        value == "popular" ? setModalSortActive(true) : setModalGenreActive(true)
    }

    function clearFunction() {
        setSortValue("");
        setReleaseYear("");
        setKeywords("");
        setSortTextValue("Filter...                 ▼")
        setGenreTextValue("Select a Genre...    ▼")
    }
    const searchAction = () => {
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=${sortValue}&page=1&primary_release_year=${releaseYear}&with_genres=${genreValue}&with_keywords=${keywords}&api_key=`
        props.navigation.navigate("TrendPage", { apiUrl, header: "RESULTS" })

    }
    return (

        <SafeAreaView style={{ backgroundColor: '#424242', flex: 1 }}>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >

                    <View style={{ backgroundColor: '#424242', flex: 1 }}>

                        {modalSortActive ?
                            <SearchSortModal changeSortModalFlag={() => setModalSortActive(!modalSortActive)}
                                visibleFlag={true}
                                sortValue={(value) => { setSortValue(value); setSortTextValue(value); }}
                            /> : null}
                        {modalGenreActive ?
                            <SearchGenreModal changeGenreModalFlag={() => setModalGenreActive(!modalGenreActive)}
                                visibleFlag={true}
                                genreValue={(name, id) => { setGenreValue(id); setGenreTextValue(name) }}
                            /> : null}
                        <View style={styles.container}>

                            <TouchableOpacity style={styles.searchButton} onPress={() => setAdvanceSelector(!advanceSelector)}><Text>Change Search Type</Text></TouchableOpacity>
                            {advanceSelector ?
                                <View>

                                    <SearchPanel navigation={props.navigation} myPlaceHolder="Search on Movies"
                                        mediaType="movie" />

                                </View> : null}

                            {!advanceSelector ?
                                <View style={{ flex: 1 }}>

                                    <TouchableOpacity style={styles.input} onPress={() => getModal("popular")}>
                                        <Text style={sortTextValue == "Filter...                 ▼" ?
                                            { color: 'gray', fontSize: 14 } : { fontSize: 14, color: '#37474f', fontWeight: 'bold' }}
                                            onPress={() => getModal("popular")}>{sortTextValue}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.input2}>

                                        <TextInput style={releaseYear == '' ? { fontSize: 14 } : { fontSize: 14, color: '#37474f', fontWeight: 'bold' }}
                                            placeholder="Release Year" value={releaseYear} onChangeText={(value) => { setReleaseYear(value) }} />

                                    </View>
                                    <TouchableOpacity style={styles.input} onPress={() => getModal("genre")}>
                                        <Text style={genreTextValue == "Select a Genre...    ▼" ?
                                            { color: 'gray', fontSize: 14 } : { fontSize: 14, color: '#37474f', fontWeight: 'bold' }}
                                            onPress={() => getModal("genre")}>{genreTextValue}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.input2}>
                                        <TextInput style={keywords == '' ? { fontSize: 14 } : { fontSize: 14, color: '#37474f', fontWeight: 'bold' }}
                                            placeholder="Keywords: family drama, romantic comedy" value={keywords} onChangeText={(value) => { setKeywords(value) }} />
                                    </View>
                                    <TouchableOpacity style={styles.searchButton} onPress={() => searchAction()}><Text>Search</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.searchButton} onPress={() => clearFunction()}><Text>Clear All</Text></TouchableOpacity>

                                </View> : null}

                        </View>

                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
            <View style={{ alignSelf: 'flex-end' }}><ReklamBanner /></View>
        </SafeAreaView>

    )
}

export { SearchScreen }


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#424242',
        flex: 1,
    },
    input: {
        backgroundColor: '#e5e5e5',
        width: Dimensions.get("window").width * 0.70,
        borderRadius: 3,
        padding: 9,
        marginTop: 10,
    },
    input2: {
        backgroundColor: '#e5e5e5',
        width: Dimensions.get("window").width * 0.70,
        borderRadius: 3,
        marginTop: 10,
    },
    searchButton: {
        alignSelf: 'center',
        backgroundColor: '#90caf9',
        marginTop: 10,
        padding: 8,
        borderRadius: 4
    }
})