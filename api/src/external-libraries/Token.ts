import { IToken } from "../interfaces/IToken";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { injectable } from "inversify";

dotenv.config();

@injectable()
export class Token implements IToken{
    createToken({ id, admin }: { id: String; admin: Boolean; }): String {        
        const token = jwt.sign({id:id , admin:admin}, process.env.SECRET_KEY as string,{ expiresIn: '30d' });
        return token
    }
    verifyToken(token:string): { id: String; admin: Boolean; } {
        var decoded = jwt.verify(token , process.env.SECRET_KEY as string);
        return decoded as { id: String; admin: Boolean; }
    }

}