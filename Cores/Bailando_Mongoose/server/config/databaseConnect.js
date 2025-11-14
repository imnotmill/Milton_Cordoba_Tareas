import { connect } from 'mongoose';

const connectToDb = async () => {
    try {
        const BD = process.env.BD;
        if (!BD) {
            throw new Error('BD connection string is not defined in process.env.BD');
        }
        await connect(BD);
        console.log('The DB is Connected');
    } catch (e) {
        console.error('Error connecting to the DB:', e);
        process.exit(1);
    }
};

export default connectToDb;