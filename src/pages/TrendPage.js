import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { API_KEY } from "@env"
import axios from 'axios';
import { MovieCard } from '../components';
import { useSelector } from 'react-redux';


const TrendPage = (props) => {
    const [movieList, setMovieList] = useState([]);
    const { apiUrl, header, mediaType } = props.route.params;
    const [page, setPage] = useState(1);
    const [activityInd, setActivityInd] = useState(true)

    const language = useSelector(state => state.language)
    const country = useSelector(state => state.country)

    const fetchData = async () => {
        const { data } = await axios(apiUrl + API_KEY + `&page=${page}&language=${language.iso_639_1}&region=${apiUrl.indexOf('upcoming' || 'nowplaying') ? country : null}`)
        setMovieList(movieList.concat(data.results))
        setActivityInd(false)

    }
    function renderFunction({ item }) {
        return (
            <MovieCard data={item}
                showDetail={() => props.navigation.navigate('Details', { item, country, mediaType })} />
        );

    }

    const handleLoadMore = () => {
        ((movieList?.length % 20) == 0) ? setPage(page + 1) : null;
    }

    const renderFooter = () => {
        return (

            <View>{activityInd ?
                (<ActivityIndicator size="large" />) : null}
            </View>

        )
    }
    useEffect(() => {
        if (page !== 1) {
            setActivityInd(true); fetchData();
        } else null;

    }, [page])


    useEffect(() => {
        setActivityInd(true)
        props.navigation.setOptions({
            title: header.toString().toUpperCase(),
        });
        fetchData();

    }, [])


    return (

        <View style={{ backgroundColor: '#424242' }}>
            <FlatList
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                keyExtractor={(_, i) => i.toString()}
                data={movieList}
                renderItem={(data) => renderFunction(data)}
                numColumns={2}
                initialNumToRender={20}
            />
        </View>

    )
}

export { TrendPage }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        width: Dimensions.get("window").width / 2,
        borderRadius: 8,
        padding: 12,
        margin: 5,

    },

})
