import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';

const CastModal = (props) => {
    return (
        <View>
            <Modal isVisible={props.visibleFlag}

                onBackdropPress={() => props.changeModalFlag()}
            >
                <Image
                    style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${props.selectedCast?.profile_path}` }}
                />
            </Modal>
        </View>
    )
}

export { CastModal }

const styles = StyleSheet.create({
    modal: {
        borderRadius: 10,
        backgroundColor: '#212121',
        height: Dimensions.get("window").height * 0.40,
        width: Dimensions.get("window").width * 0.6,
        position: 'absolute',
        opacity: 0.9,
        top: '14%',
        right: '3%',
        padding: 5
    },
    image: {
        width: Dimensions.get("window").width * 0.99,
        height: Dimensions.get("window").height * 0.6,
        borderRadius: 8,
        padding: 5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',

    },
})