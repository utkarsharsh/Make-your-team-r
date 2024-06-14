import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      isverified?: boolean;
       email?: string;
      username?: string;
      github?:string;
      profileimage?:string;
      bio?:string;
    } & DefaultSession['user'];
  }

  interface User {
    _id?: string;
    isverified?: boolean;
     email?: string;
    username?: string;
    github?:string;
    profileimage?:string;
    bio?:string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    isverified?: boolean;
     email?: string;
    username?: string;
    github?:string;
    profileimage?:string;
    bio?:string;
  }
}