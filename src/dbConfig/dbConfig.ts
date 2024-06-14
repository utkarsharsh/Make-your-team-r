import * as mongoose from "mongoose";
import { connect } from 'mongoose';
    
type ConnectionObject = {
    isConnected?: number;
  };
  const connection: ConnectionObject = {};
 export async function dbconnect() {
   if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
   }
    
    try {
         const db=  await  mongoose.connect(`${process.env.NEXT_PUBLIC_MONGO_URI}`,{});
        const connections = mongoose.connection;
        connection.isConnected = db.connections[0].readyState;
        connections.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connections.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}
