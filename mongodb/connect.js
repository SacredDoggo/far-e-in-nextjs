import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if(mongoose.connection.readyState === 0) mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));
}

export default connectDB;