import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';

const SearchGenreModal = (props) => {
    const genres = useSelector(state => state.filmCategories)

    const selectedGenre = (name, id) => {
        props.changeGenreModalFlag();
        props.genreValue(name, id);
    }
    const renderGenres = (item) => {
        return (
            <TouchableOpacity style={styles.button}
                onPress={() => selectedGenre(item.name, item.id)}>
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>

            <Modal isVisible={props.visibleFlag}

                onBackdropPress={() => props.changeGenreModalFlag()}
            >
                <View style={styles.modal}>
                    <FlatList
                        keyExtractor={(_, i) => i.toString()}
                        data={genres}
                        renderItem={({ item }) => renderGenres(item)}
                    />





                </View>
            </Modal>
        </View>
    )
}

export { SearchGenreModal }

const styles = StyleSheet.create({
    modal: {
        borderRadius: 10,
        backgroundColor: '#212121',
        height: Dimensions.get("window").height * 0.7,
        width: Dimensions.get("window").width * 0.8,
        position: 'absolute',
        opacity: 0.9,
        top: '14%',
        right: '3%',
        padding: 5
    },
    button: {
        backgroundColor: '#424242',
        margin: 6,
        padding: 4,
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