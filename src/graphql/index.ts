import { ApolloServer } from "@apollo/server";
index {User} from "./user";
async function createApolloGraphqlServer(){
    const gqlServer = new ApolloServer({
        typeDefs:`
        type Query {
       ${User.queries}
       hello:String
        }
        type Mutation {
            ${User.mutations}
            hello:String
        }
            `,
        resolvers:{
            Query:{
              //  hello:()=>`Hey there , I am a graphql server`,
              //  say:(_,{name}:{name:string})=>`Hey ${name},How are you?`
              ...User.resolvers.queries,
            },
            Mutation:{
                .../User.resolvers.mutations,
               /* createUser :async(_,{firstName,lastName,email,password}:{firstName:string;lastName:string;email:string;password:string})=>
                    await prismaClient.user.create({
                        data:{
                            email,
                            firstName,
                            lastName,
                            password,
                            salt:"Random_salt",
                        },
                    });
                    return true;*/
            },
        },
      });
     
     
     await gqlServer.start();
}
export defaultcreateApolloGraphqlServer;