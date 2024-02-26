import mongoose from 'mongoose';
let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true)
    if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');

    if (isConnected) {
        return console.log('using existing database connection');
        
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'coderZHub'
        })
        isConnected = true;
        console.log('new database connection');
    } catch ( error ) {
        console.log('error connecting to database', error);
    }
}