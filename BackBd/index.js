import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from "./schemas/projects.schema";
import dbConnection from './bd/db';
require('dotenv').config();

const app = express();
dbConnection();

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema: schema,
    context: {
        message: "test"
    }
}));

app.use("/", (req, res) => {
    res.json({ message: "Hola" });
});

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), () => {
    console.log("Sever on port: ", app.get('port'));
});