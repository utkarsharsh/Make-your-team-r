
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import axios from "axios"
import { dbconnect } from "@/dbConfig/dbConfig"
import UserModel from "@/models/UserSchema"
import { error } from "console"
import bcrypt from "bcryptjs"

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: "Username", type: "text"  },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await dbconnect();
        if(!credentials){
            throw new Error('Incomplete informations');
           return null
        }
         try{
         const user=await  UserModel.findOne({
             username:credentials.username
           });
          
           if(user===null){
            
            throw new Error('No user found with this username');
            return null
           }
           if(!(user?.isverfied)){
            throw new Error('You are not verified please verify your account');
            return null
           }
           const ispasswordcorrect=bcrypt.compareSync(credentials.password, user.password);
          if(ispasswordcorrect){
            return user;
          }
          else {
            throw new Error("Username or password is Incorrect");
            return null
          }
         }
         catch (err){
            throw err 
            return null
         }  
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); 
        token.isverified = user.isverified;
        token.github=user.github;
        token.profileimage=user.profileimage
        token.bio=user.bio
        token.email=user.email
        token.username = user.username;
      }
      console.log(token);
      return token;
    },
    async session({ session,token,user}) {
      if (token) {
        session.user._id = user._id?.toString(); 
        session.user.isverified = user.isverified;
        session.user.github=user.github;
        session.user.profileimage=user.profileimage
        session.user.bio=user.bio
        session.user.email=user.email
        session.user.username = user.username;
      }
      console.log(session);
      return session;
    },
  },
  secret: "12121212",
  session: {
    strategy: 'jwt',
  },
 

}
export default NextAuth(authOptions)