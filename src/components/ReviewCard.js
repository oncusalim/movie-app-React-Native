import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReviewCard = (props) => {

    return (
        <View style={styles.container}>

            <Text style={styles.author}>Review by {props.data.author}</Text>
            <Text style={styles.rating}>Author-Rating:
            {props.data.author_details.rating == undefined ? props.data.rating : props.data.author_details.rating}
            </Text>
            <Text style={styles.content} >{props.data.content}</Text>
            <Text style={styles.date}>{props.data.updated_at}</Text>

        </View>
    )
}

export { ReviewCard }

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 5,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'justify',

    },
    author: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5,
    },
    content: {

        fontSize: 16,

    }, rating: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 15,
    }

})