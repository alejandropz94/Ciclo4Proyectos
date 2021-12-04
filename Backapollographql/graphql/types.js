import { gql } from "apollo-server-express";
import {tiposUsuario} from "../models/usuario/tipos.js";
import { typeDefs } from "../models/proyecto/tipos.js";


export const tipos = [tiposUsuario, typeDefs];