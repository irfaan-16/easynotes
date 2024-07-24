import client from "@/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const dbClient = await client();
      await dbClient.connect();
        const database = dbClient.db("easynotes");
      
      try {
        const userExists = await database.collection("users").findOne({
          email: user?.email,
        });

        if (!userExists) {
          await database.collection("users").insertOne({
            name: user?.name?.toLowerCase(),
            email: user?.email,
            avatar: user?.image,
          });
        }
        return true;
        
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
   const dbClient = await client();
      await dbClient.connect();
      const database = dbClient.db("easynotes");
      
      const userExists = await database.collection("users").findOne({
        email: session?.user?.email,
      });
      session.user.mongoDbID = userExists._id ;
      return session;
      
    },
  },
});

export { handler as GET, handler as POST };