import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { MediaPlay } from '../components'

const Fragman = (props) => {
    const movieKey = props.route.params.movieKey;

    return (
        <SafeAreaView>
            <MediaPlay movieKey={movieKey} />
        </SafeAreaView>
    )
}

export { Fragman };