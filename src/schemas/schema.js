const UserDemo = require('../models/usermodel')
const {GraphQLObjectType,GraphQLInt,GraphQLString,GraphQLList,GraphQLSchema,GraphQLNonNull, GraphQLID} = require('graphql');
const UserType = new GraphQLObjectType({
    name:'UserDemo',
    fields:()=>({
      id:{
        type:GraphQLID

      },
      name:{type:GraphQLString},
      age:{type:GraphQLInt}
  
    })
  })

  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUser:{
            type:new GraphQLList(UserType),
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            age: { type: GraphQLInt },
            resolve(parent,args){
                return UserDemo.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:"mutation",
    fields:{
        CreateUser:{
            type:UserType,
            args:{
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    age: {  type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: async(parent,args)=>{
                try {
                    let user = new UserDemo({
                        name:args.name,
                        age:args.age
                    })
                    return await user.save()
                } catch (error) {
                    console.log(error)
                }
                
            }
        },
        UpdateUser:{
          type:UserType,
          args:{
                id:{type:GraphQLID},
                name: { type: GraphQLString},
                age: {  type: GraphQLInt },
           },
           resolve:async(parent,args)=>{
            try {
                let abc = await UserDemo.findByIdAndUpdate({_id:args.id},{name:args.name,age:args.age},{new:true})
                return abc;
            } catch (error) {
              console.log(error)
            }
           }
        },
        DeleteUSer:{
          type:UserType,
          args:{
            id:{type:GraphQLID}
          },
          resolve: async(parent,args)=>{
            let abc= await UserDemo.findByIdAndDelete({_id:args.id});
            return args.id
          }
        }

    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});
 