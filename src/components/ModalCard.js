import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const ModalCard = (props) => {


    const selectedTrend = (apiUrl, header) => {
        props.changeModalFlag();
        props.navigation.navigate("TrendPage", { apiUrl, header, mediaType: "movie" })
    }

    return (
        <View>

            <Modal isVisible={props.visibleFlag}

                onBackdropPress={() => props.changeModalFlag()}
            >
                <View style={styles.modal}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => selectedTrend('https://api.themoviedb.org/3/trending/movie/week?api_key=', 'Trends of all week')}>
                        <Text style={styles.text}>Trends of all week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => selectedTrend('https://api.themoviedb.org/3/trending/movie/day?api_key=', 'Trends of this day')}>
                        <Text style={styles.text}>Trends of this day</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => selectedTrend('https://api.themoviedb.org/3/movie/popular?api_key=', 'Popular Movies')}>
                        <Text style={styles.text}>Popular Movies</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => selectedTrend('https://api.themoviedb.org/3/movie/top_rated?api_key=', 'Top Rated Movies')}
                    >
                        <Text style={styles.text}>Top Rated Movies</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => selectedTrend('https://api.themoviedb.org/3/movie/now_playing?api_key=', 'Now Playing')}
                    >
                        <Text style={styles.text}>Now Playing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => selectedTrend('https://api.themoviedb.org/3/movie/upcoming?api_key=', 'Upcoming Movies')}
                    >
                        <Text style={styles.text}>Upcoming Movies</Text>
                    </TouchableOpacity>


                </View>
            </Modal>
        </View>
    )
}

export { ModalCard }

const styles = StyleSheet.create({
    modal: {
        borderRadius: 10,
        backgroundColor: '#212121',
        height: 'auto',
        width: Dimensions.get("window").width * 0.8,
        position: 'absolute',
        opacity: 0.9,
        top: '14%',
        right: '3%',
        padding: 5
    },
    button: {
        backgroundColor: '#424242',
        margin: 7,
        padding: 8,
        borderRadius: 8,
        width: '80%',
        alignSelf: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#f5f5f5',
        alignSelf: 'center'
    }
})