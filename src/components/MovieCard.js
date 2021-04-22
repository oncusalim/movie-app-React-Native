import React from 'react';
import { View, Text, Dimensions, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { VoteAverage } from '../components';


const MovieCard = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card}
                onPress={() => props.showDetail()}
            >
                <ImageBackground
                    style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${props.data.poster_path}` }} >

                    <VoteAverage voteScore={props.data.vote_average} dimension={25} textSize={15} />
                </ImageBackground>

                <View style={styles.info}>

                    <Text style={{ fontWeight: 'bold', color: '#ffb300' }} numberOfLines={1}>
                        {props.data.title ? props.data.title : props.data.name}</Text>
                    <Text style={{ color: '#e0e0e0' }}>{props.data.release_date ? props.data.release_date : props.data.first_air_date}</Text>

                </View>
            </TouchableOpacity>
        </View>
    )
}

export { MovieCard }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width * 0.48,
        borderRadius: 4,
        marginLeft: 3,
        marginTop: 3,



    },
    image: {
        width: Dimensions.get("window").width * 0.478,
        height: Dimensions.get("window").height * 0.3,
        borderBottomWidth: 0.5,
        alignItems: 'flex-end',
        padding: 3,
        margin: 1,
        borderRadius: 4,

    },
    info: {
        padding: 5,
        borderRadius: 9,
        alignItems: 'center',

    },
    card: {
        width: Dimensions.get("window").width * 0.48,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#757575'
    }
})