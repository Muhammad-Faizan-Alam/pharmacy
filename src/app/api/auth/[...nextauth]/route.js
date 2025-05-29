import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
// import CredentialsProvider from "next-auth/providers/credentials"; // if using email/pass

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };