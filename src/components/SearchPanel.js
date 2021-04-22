import React, { useState } from 'react';
import { View, TextInput, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchPanel = (props) => {
    const [searchValue, setSearchValue] = useState("")
    refInput = React.useRef();


    const searchAction = (value) => {
        const apiUrl = `https://api.themoviedb.org/3/search/${props.mediaType}?query=${value}&api_key=`;
        props.navigation.navigate("TrendPage", { apiUrl, header: `"${value}"` })
        refInput.current.clear();
    }

    return (

        <View style={styles.container}>
            <View style={{ justifyContent: 'center' }}>
                <Icon name="movie-search" size={30} color="#7b1fa2" />
            </View>
            <TextInput

                ref={refInput}
                autoCompleteType="off"
                clearTextOnFocus={true}
                placeholder={props.myPlaceHolder}
                keyboardType="web-search"
                keyboardAppearance="dark"
                style={{ marginLeft: 7, fontSize: 13, color: '#424242' }}
                onChangeText={(value) => setSearchValue(value)}
                maxLength={30}
                onSubmitEditing={() => searchAction(searchValue)}
            />
        </View>


    )
}

export { SearchPanel }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#e5e5e5',
        width: Dimensions.get("window").width * 0.55,
        borderRadius: 4,
        margin: 5,

    },
    buttonContainer: {
        backgroundColor: '#e5e5e5',
        width: Dimensions.get("window").width / 6,
        borderRadius: 8,
        padding: 12,
        margin: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#673ab7',
        fontSize: 16,
        fontWeight: 'bold',
    }

})
