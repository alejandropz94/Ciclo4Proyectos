import { resolverUsuario } from "../models/usuario/resolver.js"
import { resolverProyecto } from "../models/proyecto/resolver.js"
import { resolverAvance } from "../models/avance/resolver.js";
import { resolverInscripcion } from "../models/inscrpcion/resolver.js"

export const resolvers = [resolverUsuario, resolverProyecto, resolverAvance, resolverInscripcion];
