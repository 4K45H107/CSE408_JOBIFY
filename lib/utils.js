const {default: mongoose} = require('mongoose');  

const connection = {};

export const connetToDb = async () => {
    try {
        console.log('connecting to database');
        if(connection.isConnected){
            console.log('Using existing connection');
            return;
        }
        const db = await mongoose.connect(process.env.DATABASE_URL);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to database');
    } 
}