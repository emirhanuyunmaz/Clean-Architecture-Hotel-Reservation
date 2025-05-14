import { Model, Types } from "mongoose"
import { UserRepository } from "../../../src/repositories/userRepository"
import { User } from "../../../src/entities/User"
import { UserModel } from "../../../src/models/UserModel";
jest.mock('../../../src/entities/User');

describe("Repository: UserRepository",() => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    const repository:UserRepository = new UserRepository();
    const dto : UserModel = {
        _id:"123",
        nameSurname: 'Test User',
        email: 'test@example.com',
        password: 'pwd',
        phoneNumber: '0555',
        country: 'TR',
        emailIsValid: true,
        admin: false,
        gender: 'Male',
    }
    const fakeData:{email:string;password:string;} = {email:"test@gmail.com",password:"pwd"}

    it("Kullanıcı oluşturma işlemi",async () => {
        (User.create as jest.Mock).mockResolvedValue(dto)

        const result = await repository.create(dto)

        expect(User.create).toHaveBeenCalledWith(dto)
        expect(result).toEqual(dto)

    })

    it("Tek Kullanici silme işlemi",async() => {
        const fakeId = new Types.ObjectId().toString();
        (User.deleteOne as jest.Mock).mockResolvedValue({deleteCount:1})
        const result = await repository.singleDeleteUser({id:fakeId})
        expect(result).toEqual(true)
    })

    it("Çok Kullanici silme işlemi",async() => {
        const fakeId1 = new Types.ObjectId().toString();
        const fakeId2 = new Types.ObjectId().toString();
        
        (User.deleteMany as jest.Mock).mockResolvedValue({deleteCount:2})
        const result = await repository.multiDeleteUser({idList:[fakeId1,fakeId2]})
        expect(result).toEqual(true)
    })

    it("Kullanıcı arama işlemi",async () => {
        (User.find as jest.Mock).mockResolvedValue([dto])
        const result = await repository.searchUser({searchText:"Test"})
        expect(result).toEqual([dto])        

    })

    it("Tüm kullanıcıların listesi",async () => {
        (User.find as jest.Mock).mockResolvedValue([dto])
        const result = await repository.allUserList()
        expect(result).toEqual([dto])
    })

    it("Kullanıcı güncelleme işlemi",async () => {
        (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(dto)
        const result = await repository.update("123",dto)
        expect(result).toEqual(dto)
    })
    
    it("Kullanıcı bulma işlemi",async () => {
        (User.findById as jest.Mock).mockResolvedValue(dto)
        const result = await repository.find("123")
        expect(result).toEqual(dto)
    })
    
    it("Kullanıcı giriş işlemi",async () => {
        (User.findOne as jest.Mock).mockResolvedValue(dto)
        const result = await repository.login({email:"test@gmail.com",password:"psw"})
        expect(result).toEqual(dto)
    })

    it("Kullanıcı email bulma işlemi",async () => {
        (User.findOne as jest.Mock).mockResolvedValue(dto)
        const result = await repository.findEmail({email:"test@gmail.com"})
        expect(result).toEqual(dto)
    })

    it("Kullanıcı parola değiştirme işlemi",async () => {
        (User.findOneAndUpdate as jest.Mock).mockResolvedValue(fakeData)
        const result = await repository.changePassword(fakeData)
        expect(result).toEqual(fakeData)
    })

})