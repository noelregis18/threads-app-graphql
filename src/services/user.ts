import {createHmac,randomBytes} from "node:crypto" 
import JWT from "jsonwebtoken"
import {prismaClient} from "../lib/db"
const JWT_SECRET="$uperM@n@123"
export interface CreateUserPayload {
    firstName:string
    lastName?:string
    email:string
    password:string
}
export interface GetUserTokenPayLoad {
    email:string;
    password:string;
}
class UserService{
   
    private static generateHash(salt:string,password:string){
        const hashedPassword=createHmac("sha256",salt).update(password).digest("hex");
        return hashedPassword;
    }
    public static getUserIdbyString(id:string){
        return prismaClient.user.findUnique({where:{id}});
    }
public static createUser(payload:CreateUserPayload){
    const {firstName,lastName,email,password}=payload
    const salt=randomBytes(32).toString("hex");
    const hashedPassword =createHmac('sha256',salt).update(password).digest('hex')

    return prismaClient.user.create({
        data:{
            firstName,
            lastName,
            email,
            salt,
            password:hashedPassword,
        }
    })
}
private static GetUserByEmail(email:string){
return prismaClient.user.findUnique({where:{email}})
}
public static async getUserToken(payload:GetUserTokenPayLoad){
    const {email,password}=payload;
    const user=await UserService.GetUserByEmail(email);
    if(!user)throw new Error('user not found');
    const userSalt=user.salt
    const userHashPassword=UserService.generateHash(userSalt,password);
    if(userHashPassword!==user.password){
        throw new Error('Incorrect Password');
    }
    const token=JWT.sign({id:user.id,email:user.email},JWT_SECRET)
    return token;
} 
public static decodeJWTToken(token:string){
    return JWT.verify(token,JWT_SECRET);
}
}
export default UserService;