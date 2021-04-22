import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieCategories, getTvCategories } from '../context'

const MovieCategories = props => {
    const dispatch = useDispatch();
    const selectedMovieCategory = useSelector(state => state.movieCategoryName)
    const selectedTvCategory = useSelector(state => state.tvCategoryName)
    const filmCategories = useSelector(state => state.filmCategories)
    const tvCategories = useSelector(state => state.tvCategories)
    const language = props.language;


    useEffect(() => {

        if (language !== undefined) {
            dispatch(getMovieCategories(language));
            dispatch(getTvCategories(language));
        }

    }, [language]);
    const mediaCategories = (props.mediaType == "movie") ? filmCategories : tvCategories;
    const selectedCategory = (props.mediaType == "movie") ? selectedMovieCategory : selectedTvCategory;
    return (

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {


                mediaCategories?.map(category => {
                    return (
                        <TouchableOpacity
                            onPress={() => dispatch({ type: `${props.mediaType}_CATEGORY_SELECT`, payload: { id: category.id, name: category.name, type: props.mediaType } })}
                            key={category.name}
                            style={selectedCategory !== category.name ? styles.item : styles.selectedItem} >
                            <Text style={styles.text}>{category.name}</Text>
                        </TouchableOpacity>
                    )

                })

            }
        </ScrollView>
    )
}


export default MovieCategories;


const styles = StyleSheet.create({
    item: {
        padding: 7,
        borderRadius: 3,
        backgroundColor: "#6a1b9a",
        marginLeft: 3,
        marginBottom: 5,
        marginTop: 5,
    },
    selectedItem: {
        padding: 9,
        borderRadius: 3,
        backgroundColor: "#7b1fa2",
        marginLeft: 3,
        marginBottom: 3,
        marginTop: 3,
    },
    text: {
        fontSize: 13,
        color: 'white',
        fontWeight: 'bold'
    }
})