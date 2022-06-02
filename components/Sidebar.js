import { MusicNoteIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { ReplyIcon } from "@heroicons/react/solid";

function Sidebar() {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const spotifyWebApi = useSpotify();

  useEffect(() => {
    if (spotifyWebApi.getAccessToken()) {
      spotifyWebApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyWebApi]);

  return (
    <div
      className="text-gray-400 p-5 text-s border-r scrollbar-hide border-gray-800 
                    overflow-y-scroll h-screen sm:max-w-[12rem] lg:max-2-[15rem] hidden md:inline-flex pb-35"
    >
      <div className="space-y-3">
        <img
          className="h-13 w-13"
          src="https://i.imgur.com/prUHWg4.png"
          alt=""
        />
        <hr className="border-t-[0.3px] border-gray-700" />
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 hover:text-white"
        >
          <ReplyIcon className="h-5 w-5" />
          <p>Log Out</p>
        </button>

        <hr className="border-t-[0.2px] border-gray-700" />

        <button className="flex items-center space-x-2 text-gray">
          <MusicNoteIcon className="h-5 w-5" />
          <p>My Playlists</p>
        </button>
        <hr className="border-t-[0.1px] border-black" />

        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
