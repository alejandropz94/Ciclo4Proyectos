const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect('mongodb+srv://admin:admin123@gestionproyectos.qhfsr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        console.log("Conexion Exitosa");
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la DB');
        
    }
};

module.exports = {
    dbConnection
}