import React from 'react';
import { useState, useEffect, useCallback, useMemo, createElement } from 'react';
import './Music.css';

const sseUri =
  'https://coderadio-admin-v2.freecodecamp.org/api/live/nowplaying/sse?cf_connect=%7B%22subs%22%3A%7B%22station%3Acoderadio%22%3A%7B%7D%2C%22global%3Atime%22%3A%7B%7D%7D%7D';
const sse = new EventSource(sseUri);




function Music(){

    //const [currSong, setCurrSong] = useState({});
    const [songID, setSongID] = useState(""); //Current SongID
    const [title, setTitle] = useState(""); //Current Song Title
    const [album, setAlbum] = useState(""); //Current Album

    const jsonUri = `https://coderadio-admin-v2.freecodecamp.org/api/nowplaying_static/coderadio.json`;

    useEffect(() => {
        const fetchData = async () => {

            const jsonResponse = await fetch(jsonUri);
            const res = await jsonResponse.json();
           
            console.log(res);
           //console.log({"Fetch Response": res});
         const {listeners, live, now_playing, playing_next, song_history, station} = res;
        
         
        //const test = JSON.parse(res);
        //console.log({"JSON Parse": test});
         //setCurrSong(JSON.parse(res));
        //console.log(playing_next);
        //console.log({"Current Song" :currSong});
        setTitle(now_playing.song.text);
        setAlbum(now_playing.song.album);
        setSongID(now_playing.song.id);
        }

         fetchData();

        sse.onmessage = event => {
            const data = JSON.parse(event.data);
            const np = data?.pub?.data?.np || null;
            if (np) {
                if (np.now_playing.song.id !== songID) {
                    setTitle(np.now_playing.song.text);
                    setAlbum(np.now_playing.song.album);
                    setSongID(np.now_playing.song.id);
                }
            }
        }
        


        
    },[songID, title, album, jsonUri]);




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