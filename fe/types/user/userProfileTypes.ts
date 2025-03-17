
interface userProfileTypes {
    _id?:string
    nameSurname:string
    email: string
    phoneNumber:string
    country:string
    password: string
    gender:string
    admin?:boolean
}

interface singleDeleteUserModel{
    id:string
}

interface multiDeleteUserModel{
    ids:[]
}