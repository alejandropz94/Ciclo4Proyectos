import {gql} from "apollo-server-express"

const tiposAvance= gql`
type Avance {
    fecha:Date!
    descripcion:String!
    observaciones:[String]
    proyecto:Proyecto!
    creador:Usuario!
}

type Query{
    Avances:[Avance]
}

type Mutation{
    crearMutation(
    fecha:Date!
    descripcion:String!
    proyecto:Proyecto!
    creador:Usuario!
}
    )
}
`

export {tiposAvance}