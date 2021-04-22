import React, { useState, useCallback, useRef } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { View, FlatList, Button, Text, Alert, Dimensions } from 'react-native';
import { YOUTUBE_KEY } from '@env'


const MediaPlay = (props) => {
    const [playing, setPlaying] = useState(false);
    const [page, setPage] = useState(0);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const renderMovie = (data) => {

        return (
            <View>
                {page == data.index ?

                    <View>
                        <YoutubePlayer
                            height={300}
                            play={playing}
                            videoId={data.item.key}
                            onChangeState={onStateChange}
                        />
                        <View style={{ width: Dimensions.get("window").width / 3, alignSelf: 'center' }}>
                            <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
                        </View>
                    </View>

                    : null}

            </View>
        )
    }



    return (
        <View>

            <FlatList
                keyExtractor={(_, i) => i.toString()}
                data={props.movieKey}
                renderItem={(data) => renderMovie(data)}

            />
            <Text style={{ alignSelf: 'center' }}> {page + 1 + ' / ' + props.movieKey.length}</Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {page !== 0 ? <Button title="Previous" onPress={() => setPage(page - 1)} /> : null}
                <View style={{ margin: 10 }}></View>
                {props.movieKey.length > (page + 1) ? <Button title="Next" onPress={() => setPage(page + 1)} /> : null}



            </View>
        </View>
    )
}

export { MediaPlay };