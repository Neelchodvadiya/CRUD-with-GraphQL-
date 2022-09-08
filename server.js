
const express = require("express");

const {graphqlHTTP} = require('express-graphql');
const port  = process.env.PORT || 8000

require("./src/db/connection");
const schema  = require("./src/schemas/schema");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))


app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})


// # mutation{
//     #   CreateUser(name:"neel",age:20){
//     #     name 
//     #     age
//     #     id
//     #   }
//     # }
//     # query{
//     #   getAllUser{
//     #     name
//     #     id
//     #     age
//     #   }
//     # }
//     # mutation{
//     #   UpdateUser(id:"user id",name:"username",age:user age){
//     #     name
//     #     age
//     #   }
//     # }
//     # mutation{
//     #   DeleteUSer(id:"user id"){
//     #     name
//     #   }
//     # }