import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

const SearchSortModal = (props) => {


    const selectedSort = (value) => {
        props.changeSortModalFlag();
        props.sortValue(value);
    }

    return (
        <View>

            <Modal isVisible={props.visibleFlag}

                onBackdropPress={() => props.changeSortModalFlag()}
            >
                <View style={styles.modal}>
                    <ScrollView>
                        <TouchableOpacity style={styles.button}
                            onPress={() => selectedSort("popularity.asc")}>
                            <Text style={styles.text}>Popularity Ascent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => selectedSort('popularity.desc')}>
                            <Text style={styles.text}>Popularity Descent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => selectedSort('release_date.asc')}>
                            <Text style={styles.text}>Release Date Ascent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => selectedSort('release_date.desc')}
                        >
                            <Text style={styles.text}>Release date Descent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => selectedSort('vote_average.asc')}
                        >
                            <Text style={styles.text}>Vote Avarage Ascent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => selectedSort('vote_average.desc')}
                        >
                            <Text style={styles.text}>Vote Avarage Descent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => selectedSort('vote_count.asc')}
                        >
                            <Text style={styles.text}>Vote Count Ascent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => selectedSort('vote_count.desc')}
                        >
                            <Text style={styles.text}>Vote Count Descent</Text>
                        </TouchableOpacity>
                    </ScrollView>




                </View>
            </Modal>
        </View>
    )
}

export { SearchSortModal }

const styles = StyleSheet.create({
    modal: {
        borderRadius: 10,
        backgroundColor: '#212121',
        height: Dimensions.get("window").height * 0.6,
        width: Dimensions.get("window").width * 0.8,
        position: 'absolute',
        opacity: 0.9,
        top: '14%',
        right: '3%',
        padding: 2,

    },
    button: {
        backgroundColor: '#424242',
        margin: 6,
        padding: 4,
        borderRadius: 3,
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