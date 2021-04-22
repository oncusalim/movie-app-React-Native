import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { API_KEY } from '@env';

const Runtime = (props) => {
    const [data, setData] = useState("");

    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/44896?api_key=${API_KEY}`)
        setData(data);
    }

    function mintoHours(value) {
        if (value < 60) return value + " min."
        else {
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            return hours + "h " + minutes + 'm';
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (

        <Text>{mintoHours(data.runtime)}</Text>

    )
}

export { Runtime }