import { Inscription } from './inscription.js'

export const resolverInscripcion = {
    Query: {
        getAllInscripciones: async () => {
            const inscriptions = await Inscription.find().populate("proyecto").populate("usuario");
            return inscriptions;
        }
    },
    Mutation: {
        crearInscripcion: async (_, { input }) => {
            const newInscription = new Inscription(input);
            await newInscription.save();
            return newInscription;
        },
        borrarInscripcion: async (_, { _id }) => {
            const deletedInscription = await Inscription.findByIdAndDelete(_id);
            return deletedInscription;
        },
        actualizarInscripcion: async (_, { _id, input }) => {
            const updatedInscription = await Inscription.findByIdAndUpdate(_id, input, { new: true });
            return updatedInscription;
        }
    }

}