import { Avances } from "./advance";

const resolverAvance ={
    Query:{
        Avances: async (parent,args)=>{
            const avances = await Avances.find()
            return avances
        }
    },
    Mutation:{
        crearAvance: async (parents,args)=>{
            const avanceCreado=Avances.create({
                fecha:args.fecha,
                descripcion:args.descripcion,
                proyecto:args.proyecto,
                creador:args.creador,
             });
            return avanceCreado
        },
    },
}

export {resolverAvance}