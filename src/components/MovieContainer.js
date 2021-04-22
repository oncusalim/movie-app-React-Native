import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { API_KEY } from "@env"
import axios from 'axios';
import { MovieCard } from './MovieCard';
import { useSelector } from 'react-redux';
import { ReklamInter } from '../components';


const MovieContainer = (props) => {
    const [movieList, setMovieList] = useState([]);
    const [category, setCategory] = useState("");
    const movieCategory = useSelector(state => state.movieCategory);
    const tvCategory = useSelector(state => state.tvCategory);
    const myCategory = (props.mediaType == 'movie' ? movieCategory : tvCategory)
    const [page, setPage] = useState(1);
    const [activityInd, setActivityInd] = useState(true)
    const flatListRef = React.useRef()


    const fetchData = async (myCategory) => {
        const { data } =
            ((myCategory == undefined) || (myCategory == "")) ? await axios(`https://api.themoviedb.org/3/trending/${props.mediaType}/week?api_key=${API_KEY}&page=${page}&language=${props.language}`)
                : await axios(`https://api.themoviedb.org/3/discover/${props.mediaType}?api_key=${API_KEY}&with_genres=${myCategory}&page=${page}&language=${props.language}&region=${props.country}`)

        setMovieList(movieList.concat(data.results))
        setActivityInd(false)



    }
    const renderFunction = ({ item }) => {
        return (
            <MovieCard data={item}
                showDetail={() => props.router.navigate('Details', { item, mediaType: props.mediaType })} />
        )

    }

    useEffect(() => {
        ((myCategory !== "") && (myCategory !== null)) ? flatListRef.current.scrollToIndex({ animated: true, index: 0 }) : null;
        setPage(1);
        setActivityInd(true)
        setMovieList(movieList.splice(0, movieList.length));
        props.language !== undefined ? fetchData(myCategory) : null;
        console.log('container' + props.language)
    }, [myCategory, props.language])

    useEffect(() => {
        if (page !== 1) {
            setActivityInd(true); fetchData(myCategory);
        } else null;

    }, [page])

    const handleLoadMore = () => {
        setPage(page + 1);

    }

    const renderFooter = () => {
        return (

            <View>{activityInd ?
                (<ActivityIndicator size={20} />) : null}
            </View>

        )
    }

    return (

        <View>
            { page !== 1 ? <ReklamInter /> : null}
            <FlatList
                ref={flatListRef}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                keyExtractor={(_, i) => i.toString()}
                data={movieList}
                renderItem={(data) => renderFunction(data)}
                numColumns={2}

            />
        </View>

    )
}

export { MovieContainer }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        width: Dimensions.get("window").width / 2,
        borderRadius: 8,
        padding: 12,
        margin: 5,

    },

})
