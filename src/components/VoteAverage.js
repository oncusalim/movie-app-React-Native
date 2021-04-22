import React from 'react';
import {
    SafeAreaView, View, Text, StyleSheet,
    Dimensions, ScrollView, Image
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

const VoteAverage = (props) => {


    return (

        <ProgressCircle
            percent={props.voteScore * 10}
            radius={props.dimension}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#f3e5f5"
        >
            <Text style={{ fontSize: props.textSize }}>{props.voteScore}</Text>
        </ProgressCircle>

    )
}

export { VoteAverage };