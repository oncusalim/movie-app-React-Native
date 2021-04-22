import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const ModalCardTv = (props) => {


    const selectedTrend = (apiUrl, header) => {
        props.changeModalFlag();
        props.navigation.navigate("TrendPage", { apiUrl, header, mediaType: "tv" })
    }

    return (
        <View>

            <Modal isVisible={props.visibleFlag}

                onBackdropPress={() => props.changeModalFlag()}
            >
                <View style={styles.modal}>

                    <TouchableOpacity style={styles.button}
                        onPress={() => selectedTrend("https://api.themoviedb.org/3/tv/popular?api_key=", "Popular")}
                    >
                        <Text style={styles.text}>Popular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => selectedTrend("https://api.themoviedb.org/3/tv/top_rated?api_key=", "Top Rated")}
                    >
                        <Text style={styles.text}>Top Rated</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => selectedTrend("https://api.themoviedb.org/3/tv/latest?api_key=", "Latest")}
                    >
                        <Text style={styles.text}>Latest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => selectedTrend("https://api.themoviedb.org/3/tv/airing_today?api_key=", "Airing Today")}
                    >
                        <Text style={styles.text}>Airing Today</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => selectedTrend("https://api.themoviedb.org/3/tv/on_the_air?api_key=", "On the Air")}
                    >
                        <Text style={styles.text}>On the Air</Text>
                    </TouchableOpacity>

                </View>



            </Modal>
        </View>
    )
}

export { ModalCardTv }

const styles = StyleSheet.create({
    modal: {
        borderRadius: 10,
        backgroundColor: '#212121',
        height: 'auto',
        width: Dimensions.get("window").width * 0.7,
        position: 'absolute',
        opacity: 0.9,
        top: '14%',
        right: '3%',
        padding: 5
    },
    button: {
        backgroundColor: '#424242',
        margin: 10,
        padding: 8,
        borderRadius: 8,
        width: '80%',
        alignSelf: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f5f5f5',
        alignSelf: 'center'
    }
})