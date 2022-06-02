import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";

function useSongInfo() {
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);
  const spotifyWebApi = useSpotify();
  
  // retrieves the ID of the current track and returns song information
  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyWebApi.getAccessToken()}`,
            },
          }
        ).then((r) => r.json());
        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [currentIdTrack, spotifyWebApi]);

  return songInfo;
}

export default useSongInfo;
