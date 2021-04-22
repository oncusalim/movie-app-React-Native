import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { API_KEY } from '@env'
import { ReviewCard } from './ReviewCard'

const Reviews = (props) => {
    const [review, setReview] = useState([])
    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${props.mediaType}/${props.movieId}/reviews?api_key=${API_KEY}`)
        setReview(data.results)

    }

    const renderReview = (item) => {
        return (
            <ReviewCard data={item} />
        )
    }
    const SeperatorComponent = () => {
        return (
            <View style={{ borderBottomWidth: 1 }}></View>
        )
    }
    useEffect(() => {
        fetchData();
    }, [props.mediaType])
    console.log("data result : " + `https://api.themoviedb.org/3/${props.mediaType}/${props.movieId}/reviews?api_key=${API_KEY}`)
    return (

        <View style={{ borderTopWidth: 2 }}>
            {review.length !== 0 ?
                <View style={styles.container}>

                    <Text style={styles.header}>Reviews
                </Text>
                </View> : null}
            <FlatList
                keyExtractor={(_, i) => i.toString()}
                data={review}
                renderItem={({ item }) => renderReview(item)}
                ItemSeparatorComponent={SeperatorComponent}

            />
        </View>

    )
}

export { Reviews }

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        padding: 5,
        alignSelf: 'center',
        borderBottomWidth: 1,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',

    }
})