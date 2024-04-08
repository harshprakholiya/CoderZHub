import mongoose from 'mongoose';
let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true)
    if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');

    if (isConnected) {
        return;
        
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'coderZHub'
        })
        isConnected = true;
    } catch ( error ) {
        console.log('error connecting to database', error);
    }
}