import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Tracks from "./Tracks";
import { shuffle } from "lodash";

const color = [
  "from-red-500",
  "from-orange-500",
  "from-yellow-500",
  "from-green-500",
  "from-blue-500",
  "from-indigo-500",
  "from-purple-500",
];

function Tracklist() {
  const { data: session } = useSession();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [colors, setColors] = useState(null);
  const spotifyWebApi = useSpotify();

  useEffect(() => {
    if (spotifyWebApi.getAccessToken()) {
      spotifyWebApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((error) => console.log("Something went wrong!", error));
    }
  }, [spotifyWebApi, playlistId]);

  useEffect(() => {
    setColors(shuffle(color).pop());
  }, []);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide text-white">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center text-white bg-black space-x-3 opacity-80 
                            hover:opacity-70 rounded-full p-1 pr-4"
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b 
to-black ${colors} h-80 text-white padding-8 w-full`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Tracks />
      </div>
    </div>
  );
}

export default Tracklist;
