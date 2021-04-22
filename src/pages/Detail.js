import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView, View, Text, StyleSheet,
    Dimensions, ScrollView, ImageBackground, TouchableOpacity
} from 'react-native';
import { VoteAverage, Reviews, Runtime, SavedFavory, CastModal, ReklamInter } from '../components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_KEY } from "@env";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Details = (props) => {
    const movie = props.route.params.item;
    const mediaType = props.route.params.mediaType;
    const category = useSelector(state => state.filmCategories)
    const [genres, setGenres] = useState([]);
    const [movieKey, setMovieKey] = useState("");
    const [actressList, setActressList] = useState([]);
    const [directorList, setDirectorList] = useState([]);
    const [movieInfo, setMovieInfo] = useState("");
    const [castModalFlag, setCastModalFlag] = useState(false)
    const [selectedCast, setSelectedCast] = useState(null)
    const ref = useRef();

    const fetchData = async () => {
        if (mediaType == "movie") {
            const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`)
            setMovieKey(data.results)
            const data2 = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`)
            setMovieInfo(data2.data);
            const data3 = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`)
            setActressList(data3.data.cast);
            setDirectorList(data3.data.crew);
        } else {
            const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${API_KEY}`)
            setMovieKey(data.results)
            const data2 = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}?api_key=${API_KEY}`)
            setMovieInfo(data2.data);
            const data3 = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/credits?api_key=${API_KEY}`)
            setActressList(data3.data.cast);
            setDirectorList(data3.data.crew);
        }
    }


    useEffect(() => {

        let mygenres = "";


        category.map((value) => {
            if (movie?.genres == undefined) {
                if (movie?.genre_ids?.indexOf(value.id) > -1) {
                    mygenres += value.name + " ";
                }
            }
            else {
                movie.genres?.map(item => {
                    if (item.id == value.id) mygenres += value.name + " ";
                })
            }
        })
        setGenres(mygenres)
        fetchData();
    }, [movie.id])

    console.log("data3" + actressList.cast)
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <ReklamInter />
                <ImageBackground
                    style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path || movie?.poster_path}` }}>
                    <VoteAverage voteScore={movie?.vote_average} dimension={35} textSize={25} />
                </ImageBackground>
                <View style={styles.info}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SavedFavory data={movie?.id} mediaType={mediaType} />
                        <Text style={styles.voteCount}>Vote ({movie?.vote_count})</Text>

                    </View>
                    {movie?.title !== undefined ?
                        <Text style={styles.title}>{movie?.title}
                    ({movie?.release_date?.slice(0, 4)}) </Text> :
                        <Text style={styles.title}>{movie?.name}
                    ({movie?.first_air_date?.slice(0, 4)}) </Text>}

                    <Text style={styles.category}>• {genres}• <Runtime /></Text>
                    {mediaType == 'movie' ?
                        <Text style={styles.director}>Director: •{directorList.map((value, index) =>
                            value.job == "Director" ?

                                <TouchableOpacity key={index} onPress={() => { setCastModalFlag(true); setSelectedCast(value) }}>
                                    <Text style={styles.person}>{value.name}• </Text></TouchableOpacity> : null)}

                        </Text> : null}
                    <Text style={styles.cast}>Cast : {actressList.map((value, index) =>

                        index < 4 ?
                            <TouchableOpacity key={index} onPress={() => { setCastModalFlag(true); setSelectedCast(value) }}>
                                <Text style={styles.person}>{value.name + (index == 3 ? null : ", ")} </Text></TouchableOpacity> : null


                    )}
                    </Text>

                    <Text style={styles.infoText}>{movie?.overview !== "" ? movie?.overview : movieInfo?.overview}</Text>

                </View>
                {movieKey.length !== 0 ?
                    <TouchableOpacity

                        style={styles.fragmanLink}
                        onPress={() => props.navigation.navigate("Fragman", { movieKey })}
                    >
                        <Text style={styles.fragmanText}>Click for the trailers</Text>
                        <Icon name="video" size={30} color="black" />
                    </TouchableOpacity>
                    : null}
                {mediaType !== undefined ?
                    <Reviews movieId={movie.id} mediaType={mediaType} /> : null}
                <CastModal visibleFlag={castModalFlag}
                    changeModalFlag={() => setCastModalFlag(false)}
                    selectedCast={selectedCast} />


            </ScrollView>

        </SafeAreaView>
    )
}

export { Details };

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        borderRadius: 8,
        width: Dimensions.get('window').width * 0.99,

    },
    image: {
        width: Dimensions.get("window").width * 0.99,
        height: Dimensions.get("window").height * 0.6,
        borderRadius: 8,
        padding: 5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',

    },
    voteCount: {
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        margin: 8,
        alignSelf: 'center'
    },
    info: {
        margin: 1,
        padding: 5,

    },
    infoText: {
        fontSize: 16,

    },
    category: {
        alignSelf: 'center',
        margin: 5,
        fontSize: 19,
        fontWeight: 'bold',
    },
    backgroundVideo: {
        position: 'relative',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

    },
    fragmanLink: {
        flexDirection: 'row',
        backgroundColor: '#90caf9',
        padding: 5,
        margin: 15,
        width: Dimensions.get("window").width * 0.8,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around'
    },
    fragmanText: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    director: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10,


    },
    cast: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10,

    },
    person: {
        color: "#1b0000",
        fontSize: 14,
        textDecorationLine: 'underline',

    }
})