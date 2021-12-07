import { Advance } from './advance.js'

export const resolverAvance = {
    Query: {
        getAllAvances: async () => {
            const advances = await Advance.find().populate("proyecto").populate("creador");
            return advances;
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

export {resolverAvance}