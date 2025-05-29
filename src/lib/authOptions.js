import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  providers: [
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
    // CredentialsProvider({...}) // for email/password
  ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/signin", // optional custom sign-in page
//   },
};