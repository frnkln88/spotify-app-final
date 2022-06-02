import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyWebApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token) {
    try {
        spotifyWebApi.setAccessToken(token.accessToken);
        spotifyWebApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyWebApi.refreshAccessToken();
        console.log("REFRESHED TOKEN:", refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
        }
    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "Refresh Access Token Error!",
        };
    }
}
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
      signIn: '/login',
  },
  callbacks: {
      async jwt({ token, account, user }) {
          if (account && user) {
              return {
                  ...token,
                  username: account.providerAccountId,
                  accessToken: account.access_token,
                  refreshToken: account.refresh_token,
                  accessTokenExpires: account.expires_at * 1000,
                  

              };
          }
          if (Date.now() < token.accessTokenExpires) {
              console.log("Existing token is valid!");
              return token
          }

          console.log("Token expired! refreshing...");
          return await refreshAccessToken(token)
      },

      async session({ session, token }) {
          session.user.accessToken = token.accessToken;
          session.user.refreshToken = token.refreshToken;
          session.user.username = token.username;

          return session;
      }
  },
})