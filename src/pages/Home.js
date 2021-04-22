import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { SearchPanel, Menu, MovieContainer, ModalCard, Country, Language } from '../components'
import MovieCategories from '../components/MovieCategories'

const Home = (props) => {
  const movieCategoryName = useSelector(state => state.movieCategoryName)
  const [modalFlag, setModalFlag] = useState(false)
  const country = useSelector(state => state.country)
  const language = useSelector(state => state.language)

  useEffect(() => {
    console.log("home" + language)
  }, [language])

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: movieCategoryName == '' ? 'FAVORITES' : movieCategoryName.toString().toUpperCase(),
    });
  }, [movieCategoryName]);
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: '#424242' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <SearchPanel navigation={props.navigation}
            myPlaceHolder="Search a Movie" mediaType="movie" />
          <Country />
          <Language />
          <Menu modalAction={() => setModalFlag(true)} />
          <ModalCard visibleFlag={modalFlag}
            changeModalFlag={() => setModalFlag(false)}
            navigation={props.navigation} />
        </View>
        {language?.iso_639_1 !== undefined ?
          <View>
            <MovieCategories language={language?.iso_639_1} mediaType="movie" />
          </View> : null}
        {language?.iso_639_1 !== undefined && country !== undefined ?

          <MovieContainer router={props.navigation} country={country} language={language?.iso_639_1} mediaType="movie" />

          : null}
      </View>

    </SafeAreaView>
  )
}

export { Home };