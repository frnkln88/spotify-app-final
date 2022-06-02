import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import spotifyWebApi from '../lib/spotify'

function useSpotify() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            if (session.error === "Refresh Access Token Error!") {
                signIn();
            }

            spotifyWebApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);
  return (
    spotifyWebApi
  )
}

export default useSpotify