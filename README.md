## Final Project
# Good Vibes Only: A Spotify Playlist Streamer

Good Vibes Only is a Spotify streaming app that is centered around the playlists that users have curated. It allows users to play music exclusively through their own playlists, thus giving each user a personalized listening experience that does not introduce any music that the user isn't already familiar with.

IMPORTANT: You must be logged in to the official Spotify client/app on any device and have played a song on it for full functionality of this application.

Good Vibes Only was built using the Next.js framework in conjunction with TailwindCSS, interacting with the official Spotify API along through the third-party spotify-web-api-node:

https://github.com/thelinmichael/spotify-web-api-node

The project was then deployed to Heroku.

# Heroku URL

https://spotify-app-final.herokuapp.com/

# User Stories

A User should be able to:

- Login to the application using their Spotify account
- Logout using the button in the top left corner, which redirects the user to the login page
- In the sidebar, see a list of all playlists that the user has created, or added to their library
- View the user's profile picture and name in the top right corner
- View the corresponding tracklist when the playlist is clicked on
- Play any track by clicking on it
- Pause the track by clicking the "pause" button, and resume playback by clicking the "play" button
- View the currently playing track's name, artist, and album image in the Player component
- Adjust the volume of playback by using the slider or the buttons.

# Wireframe(s)

![alt text](https://user-images.githubusercontent.com/43020545/171634849-a854cf63-0bd1-495f-bf32-8ceaf71d80f6.png)


# Stretch Goal(s)

- Next/Previous Track
- Shuffle/Repeat tracks
- Search Function