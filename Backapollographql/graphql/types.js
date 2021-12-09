import { gql } from "apollo-server-express";
import { tiposUsuario } from "../models/usuario/tipos.js";
import { tiposProyecto } from "../models/proyecto/tipos.js";
import { tiposAvance } from "../models/avance/tipos.js"
import { tiposInscripcion } from "../models/inscrpcion/tipos.js"
import { tiposAutenticacion } from "./auth/tipos.js";


export const tipos = [tiposUsuario, tiposProyecto, tiposAvance, tiposInscripcion, tiposAutenticacion];
