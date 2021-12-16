import mongoose from 'mongoose';

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.BD_Access2);
        //await mongoose.connect('mongodb://localhost/ciclo4');
        console.log("Conexion Exitosa");
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la DB');
        
    }
};

// module.exports = {
//     dbConnection
// }
export default dbConnection;