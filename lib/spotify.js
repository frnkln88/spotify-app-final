import SpotifyWebApi from "spotify-web-api-node";

const scope = [
  "playlist-read-collaborative",
  "playlist-read-private",
  "streaming",
  "user-library-read",
  "user-modify-playback-state",
  "user-top-read",
  "user-read-currently-playing",
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-read-recently-played",
].join(",");

const params = {
  scope: scope,
};

const paramToString = new URLSearchParams(params);

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + paramToString.toString();

const spotifyWebApi = new SpotifyWebApi({
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
});

export default spotifyWebApi;

export { LOGIN_URL };
