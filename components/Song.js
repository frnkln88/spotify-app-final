import React from 'react'
import useSpotify from "../hooks/useSpotify"
import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"

// convert millisecond duration to Minutes and Seconds

function minutesAndSeconds(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

function Song({ order, track }) {
    const spotifyWebApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyWebApi.play({
            uris: [track.track.uri],
        })
    }
  return (
    <div className="grid grid-cols-2 text-gray-500 py-2 px-1 text-sm hover:bg-gray-900 cursor-pointer"
    onClick={() => playSong()}>
        <div className="flex items-center space-x-4">
            <p>{order + 1}</p>
            <img
            className="h-10 w-10"
            src={track.track.album.images[0].url}
            alt=""
            />
            <div>
                <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>
                <p className="w-40">{track.track.artists[0].name}</p>
            </div>
        </div>

        <div className="flex items-center justify-between md:ml-0 ml-auto">
            <p className="w-40 hidden md:inline truncate">{track.track.album.name}</p>
            <p>{minutesAndSeconds(track.track.duration_ms)}</p>
        </div>
    </div>
  ); 
}

export default Song;