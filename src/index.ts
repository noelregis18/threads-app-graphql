import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user";
async function init() {
    const app=express();
    const PORT= Number(process.env.PORT)||8000;
     app.use(express.json());
 app.get("/",(req,res)=>{
    res.json({message:"Server is up and running"});
 });
 app.use("/graphql",expressMiddleware(await createApolloGraphqlServer(),{
    context:async ({req})=>{
        const token=req.header["token"]
        try{
            const user=UserService.decodeJWTToken(token);
            return {user};

        }catch(error){
            return {};
        }
            
        
    },
 }));
 app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));
}
init();