import { CreateUserPayload } from "../../services/user";

const queries={
  getUserToken:async(_:any,payload:{email:string,password:string})  
  const token=await UserService.getUserToken({
    email:payload.email,
    password:payload.password,
  });
  return token;
};
const mutations={
  createUser:async(_:any,payload:CreateUserPayload)=>{
  const rest=await UserService.createUser(payload);
  return rest.id;
},
};

export const revolvers={queries,mutations};