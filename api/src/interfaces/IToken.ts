
type tokenType = {
    id:String,
    admin:Boolean
};

export interface IToken {
    createToken({id,admin}:tokenType):String;
    verifyToken(token:string):tokenType;
}