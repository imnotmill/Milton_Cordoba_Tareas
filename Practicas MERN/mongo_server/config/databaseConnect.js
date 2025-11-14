import {connect} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const BD = process.env.BD;

const connectToDb = async () => {
    try {
        await connect(BD)
        console.log('The DB in Connected')
    }catch(e){
        console.log(`Error connecting to the DB: ${e}`)
    }
}

export default connectToDb;