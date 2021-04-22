import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

const SavedFavory = (props) => {

    const movieId = props.data;
    const mediaType = props.mediaType;
    const [favoryStatus, setFavoryStatus] = useState(false)
    const [visibleFlag, setVisibleFlag] = useState(false)
    const dispatch = useDispatch();
    const refreshParameter = useSelector(state => state.favoriteRefresh)

    const addFavory = async (item) => {
        let getData = await AsyncStorage.getItem('@mystorage')
        getData = (getData == null) ? [] : JSON.parse(getData);
        const updateData = [...getData, { id: item, type: mediaType }];

        await AsyncStorage.setItem('@mystorage', JSON.stringify(updateData))
        dispatch({ type: 'FAVORITE_REFRESH', payload: updateData })
        setVisibleFlag(false);
        setFavoryStatus(true)

    }

    const removeFavory = async (item) => {
        let getData = await AsyncStorage.getItem('@mystorage')
        getData = (getData == null) ? [] : JSON.parse(getData);
        let mydata = [];

        getData.map((value) => {
            if (value.id !== item) mydata.push(value)
        })
        AsyncStorage.setItem('@mystorage', JSON.stringify(mydata))
        console.log(mydata)
        dispatch({ type: 'FAVORITE_REFRESH', payload: mydata })
        setVisibleFlag(false);
        setFavoryStatus(false)
    }
    const getStatus = async (item) => {
        let getData = await AsyncStorage.getItem('@mystorage')
        getData = (getData == null) ? [] : getData;
        getData.indexOf(item) > -1 ? setFavoryStatus(true) : setFavoryStatus(false)
    }


    const changeStatus = () => {
        !favoryStatus ? addFavory(movieId) : removeFavory(movieId)
    }

    const SavedAlert = () => {
        return (
            <Modal isVisible={visibleFlag}
                onSwipeComplete={() => setVisibleFlag(false)}

                onBackdropPress={() => setVisibleFlag(false)}
            >
                <View style={styles.modal}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => { setVisibleFlag(false); changeStatus(); }}
                    >
                        {!favoryStatus ? <Text style={{ fontSize: 13 }}>Add to Favory List  ✔︎ </Text> :
                            <Text style={{ fontSize: 13 }}>Remove from Favory List  ✔︎ </Text>}
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    useEffect(() => {
        //AsyncStorage.setItem('@mystorage', "") ------delete for developer
        getStatus(movieId)
    }, [refreshParameter])

    return (
        <TouchableOpacity
            onPress={() => { setVisibleFlag(true); SavedAlert(); }}>
            <Icon name="bookmark" size={35} color={favoryStatus ? "black" : "#bdbdbd"} />
            <SavedAlert />
        </TouchableOpacity>
    )
}

export { SavedFavory }

const styles = StyleSheet.create({
    modal: {
        borderRadius: 3,
        backgroundColor: 'white',
        height: Dimensions.get("window").height * 0.1,
        width: Dimensions.get("window").width * 0.8,
        position: 'absolute',
        opacity: 0.7,
        top: '50%',
        alignSelf: 'center',
        padding: 5,
        justifyContent: 'center'
    },
    buttonContainer: {
        backgroundColor: '#e0e0e0',
        padding: 5,
        alignSelf: 'center',
        justifyContent: 'center'
    }
})