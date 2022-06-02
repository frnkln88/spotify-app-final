import React, { useEffect, useState, useCallback } from 'react'
import { debounce } from "lodash"
import useSpotify from "../hooks/useSpotify"
import { useSession } from "next-auth/react"
import { useRecoilValue, useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import useSongInfo from "../hooks/useSongInfo"
import { HeartIcon, VolumeUpIcon as VolumeDownIcon, } from '@heroicons/react/outline'
import { RewindIcon, FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, VolumeUpIcon } from '@heroicons/react/solid'
import { playlistIdState } from "../atoms/playlistAtom";
import { playlistState } from "../atoms/playlistAtom";

function Player() {
    const spotifyWebApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(75);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyWebApi.getMyCurrentPlayingTrack()
            .then((data) => {
                console.log("Now playing: ", data.body?.item);
                setCurrentTrackId(data.body?.item?.id);

                spotifyWebApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }
    useEffect(() => {
        if (spotifyWebApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(75);
        }
    }, [currentTrackId, spotifyWebApi, session]);

    const handlePlayPause = () => {
        spotifyWebApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyWebApi.pause();
                setIsPlaying(false);
            } else {
                spotifyWebApi.play()
                setIsPlaying(true);
            }
        })
    }
    // const changeTrack = async (type) => {
    //     const response = await fetch(`https://api.spotify.com/v1/me/player/${type}`,{
    //         method: 'POST',
    //         headers: {
    //             Authorization: `Bearer ${spotifyWebApi.getAccessToken()}`,
    //             'Content-Type': 'application/json'
    //     },
    //     });
    // }
    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedChangeVolume(volume)
        }
    }, [volume])

    const debouncedChangeVolume = useCallback(
        debounce((volume) => {
            spotifyWebApi.setVolume(volume).catch((error) => { });
        }, 300), []
    )
    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-700 text-white 
    grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4">
                <img 
                    className="hidden md:inline h-10 w-10"
                    src={songInfo?.album.images?.[0]?.url}
                    alt="" /> 
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            <div className="flex items-center justify-evenly">
                {/* <HeartIcon className="button" /> */}
                {/* <RewindIcon
                 onClick={() =>  changeTrack("previous")}
                    className="button" /> */}
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                )}

                {/* <FastForwardIcon
                 onClick={() =>  changeTrack("next")}
                    className="button"
                /> */}
                {/* <ReplyIcon className="button" /> */}
            </div>

            <div className="flex items-center space-x-3 md:space=x=4 justify-end pr-2">
                <VolumeDownIcon onClick={() => volume > 0 &&
                    setVolume(volume - 5)} className="button" />
                <input onChange={e => setVolume(Number(e.target.value))}
                    className="w-14 md:w-28"
                    type="range" value={volume} min={0} max={100} />
                <VolumeUpIcon onClick={() => volume > 0 &&
                    setVolume(volume + 5)} className="button" />
            </div>
        </div>
    )
}

export default Player