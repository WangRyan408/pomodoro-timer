import React from 'react';
import { useState, useEffect, useCallback, useMemo, createElement } from 'react';
import './Music.css';







function Music(){

    const [currSong, setCurrSong] = useState({});
    const [title, setTitle] = useState("");
    const [album, setAlbum] = useState("");

    const jsonUri = `https://coderadio-admin-v2.freecodecamp.org/api/nowplaying_static/coderadio.json`;

    useEffect(() => {
        const fetchData = async () => {

            const jsonResponse = await fetch(jsonUri);
            const res = await jsonResponse.json();

           console.log(res);
         const {listeners, live, now_playing, playing_next, song_history, station} = res;

        console.log(playing_next);
        setTitle(playing_next.song.text);
        setAlbum(playing_next.song.album);

        }

        fetchData();
    },[title, album, jsonUri]);




    return(
        <div id="music-box">
            <div id="music-header">
                <h2>Album: {title}</h2>
                <h2>Currently Playing: {album}</h2>
            </div>
            
            <audio src="https://coderadio-admin-v2.freecodecamp.org/listen/coderadio/radio.mp3" controls></audio>
        </div>
    );
}




















export default Music;