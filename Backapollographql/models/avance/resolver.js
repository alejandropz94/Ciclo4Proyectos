import { Advance } from './advance.js'
import mongoose from 'mongoose';

export const resolverAvance = {
    Query: {
        getAllAvances: async () => {
            const advances = await Advance.find().populate("proyecto").populate("creador");
            return advances;
        },
        getAvanceByCreador: async (_, { _id }) => {
            const advances = await Advance.find({creador: mongoose.Types.ObjectId(_id)}).populate("creador").populate("proyecto");
            return advances;
        },
        getAvance: async (_, { _id }) => {
            const advance = await Advance.findById(_id).populate("proyecto").populate("creador");
            return advance;
        }          
    },
    Mutation: {
        crearAvance: async (_, { input }) => {
            const newAdvance = new Advance(input);
            await newAdvance.save();
            return newAdvance;
        },
        borrarAvance: async (_, { _id }) => {
            const deletedAdvance = await Advance.findByIdAndDelete(_id);
            return deletedAdvance;
        },
        actualizarAvance: async (_, { _id, input }) => {
            const updatedAdvance = await Advance.findByIdAndUpdate(_id, input, { new: true });
            return updatedAdvance;
        }
    }

}