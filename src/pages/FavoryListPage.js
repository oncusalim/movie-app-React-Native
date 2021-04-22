import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Image, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_KEY } from "@env";
import { MovieCard } from '../components'
import { useSelector } from 'react-redux';


const FavoryListPage = (props) => {

    const [favorites, setFavorites] = useState([])
    const [movieData, setMovieData] = useState([])
    const refreshParameter = useSelector(state => state.favoriteRefresh)
    const language = useSelector(state => state.language)
    const [mediaTypeList, setMediaTypeList] = useState([]);

    const getFavoryList = async () => {
        let getData = await AsyncStorage.getItem('@mystorage')
        console.log("storedan gelen :--" + getData)
        setFavorites(JSON.parse(getData))
    }

    const fetchData = (item) => {
        console.log("item -" + item)
        let dizi = [];
        let oldData = [];
        item?.length > 0 ?
            item.map((value) => {
                console.log("value :---" + `https://api.themoviedb.org/3/${value.type}/${value.id}?api_key=${API_KEY}&language=${language.iso_639_1}`)
                axios.get(`https://api.themoviedb.org/3/${value.type}/${value.id}?api_key=${API_KEY}&language=${language.iso_639_1}`)
                    .then(({ data }) => { oldData = [...oldData, data]; setMovieData(oldData); dizi.push(value.type); setMediaTypeList(dizi) })
                    .catch(err => console.log(err))

            })
            : setMovieData([])


    }


    const renderFunction = (item, index) => {
        console.log(mediaTypeList)
        return (
            <MovieCard data={item}
                showDetail={() => props.navigation.navigate('Details', { item, mediaType: mediaTypeList[index] })} />


        )

    }

    useEffect(() => {

        fetchData(favorites)
    }, [favorites])

    useEffect(() => {
        getFavoryList()
    }, [refreshParameter])

    console.log(movieData)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#424242', flex: 1 }}>
                {movieData.length < 1 ?
                    <ScrollView>
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <Text style={{ fontSize: 13, alignSelf: 'center', top: "10%", margin: 10, color: 'white' }}> You have not any favorite movie...</Text>
                            </View>

                            <View>
                                <Image
                                    style={{
                                        width: Dimensions.get("window").width * 0.7,
                                        height: Dimensions.get("window").height * 0.7,
                                        margin: 10, alignSelf: "center"
                                    }}
                                    source={require('../../images/addFavory.png')}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    :

                    <FlatList

                        keyExtractor={(_, i) => i.toString()}
                        data={movieData}
                        renderItem={({ item, index }) => renderFunction(item, index)}
                        numColumns={2}


                    />
                }
            </View>
        </SafeAreaView>
    )
}

export { FavoryListPage }