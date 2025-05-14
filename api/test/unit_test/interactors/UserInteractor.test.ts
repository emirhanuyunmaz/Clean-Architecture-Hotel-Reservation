import { UserInteractor } from "../../../src/interactors/UserInteractor"
import { IToken } from "../../../src/interfaces/IToken"
import { IUserRepository } from "../../../src/interfaces/IUserRepository"


describe("Interactor: User" ,() => {
    let mockRepository : jest.Mocked<IUserRepository>
    let mockToken:jest.Mocked<IToken>
    let userUC:UserInteractor

    beforeEach(() => {
        mockRepository = {
            create:jest.fn().mockResolvedValue({
                _id:"1",
                nameSurname:"Emirhan Uyunmaz",
                email:"emirhanuyunmaz46@gmail.com",
                password:"123456789",
                phoneNumber:"05555555555",
                country:"Türkiye",
                emailIsValid:false,
                admin:false,
                gender:"Male"
            }),
            find:jest.fn().mockResolvedValue([
                {
                    _id:"1",
                    nameSurname:"Emirhan Uyunmaz",
                    email:"emirhanuyunmaz46@gmail.com",
                    password:"123456789",
                    phoneNumber:"05555555555",
                    country:"Türkiye",
                    emailIsValid:false,
                    admin:false,
                    gender:"Male"
                }
            ]),
            allUserList:jest.fn().mockResolvedValue(
                [{_id:"1",
                nameSurname:"Emirhan Uyunmaz",
                email:"emirhanuyunmaz46@gmail.com",
                password:"123456789",
                phoneNumber:"05555555555",
                country:"Türkiye",
                emailIsValid:false,
                admin:false,
                gender:"Male"}]
            ),
            update:jest.fn(),
            login:jest.fn(),
            findEmail:jest.fn(),
            searchUser:jest.fn(),
            emailCodeSave:jest.fn(),
            emailCodeVerify:jest.fn().mockResolvedValue(
                true
            ),
            checkCode:jest.fn().mockResolvedValue({
                email:"emirhanuyunmaz46@gmail.com",
            }),
            deleteCode:jest.fn().mockResolvedValue(
                true
            ),
            changePassword:jest.fn(),
            singleDeleteUser:jest.fn().mockResolvedValue(
                true
            ),
            multiDeleteUser:jest.fn().mockResolvedValue(
                true
            )
        } as jest.Mocked<IUserRepository>;
        mockToken = {
            createToken:jest.fn().mockResolvedValue("tokenData"),
            verifyToken:jest.fn().mockResolvedValue({id:"1",admin:false})
        } as jest.Mocked<IToken>
        userUC = new UserInteractor(mockRepository,mockToken)
    })

    it("Yeni kullanici oluşturulma işleminde repository.create cagrilir.",async () => {
        const dto = {
            _id:"1",
            nameSurname:"Emirhan Uyunmaz",
            email:"emirhanuyunmaz46@gmail.com",
            password:"123456",
            phoneNumber:"05555555555",
            country:"Türkiye",
            emailIsValid:false,
            admin:false,
            gender:"Male"
        }

        const result = await userUC.createUser(dto)
        expect(mockRepository.create).toHaveBeenCalledWith(dto)
        expect(result?._id).toBe("1")
    })

    it("Kayitli bir kullanici bulma isleminde repository.find",async() => {
        const dto = "1"

        const result = await userUC.findUser(dto)
        
        expect(mockRepository.find).toHaveBeenCalledWith(dto)
        expect(result?.at(0)?._id).toBe("1")
    })

    it("Tüm kullanici listesinin cekilmesi isleminde repository.allUserList cagrilir",async () => {
        const fakeUser = {
            _id: "1",
            nameSurname: "Emirhan Uyunmaz",
            email: "e@gmail.com",
            password: "123456",
            phoneNumber: "0555",
            country: "Türkiye",
            emailIsValid: false,
            admin: false,
            gender: "Male"
          };
        mockRepository.allUserList.mockResolvedValue([fakeUser]);
        const result = await userUC.allUserList()
        expect(result).toEqual([fakeUser]);
        expect(result?.length).toBe(1)
    })

    it("Kullanici guncelleme islemi icin repository.update cagrilir" ,async () => {
        const fakeUser = {
            _id: "1",
            nameSurname: "Emirhan Uyunmaz",
            email: "e@gmail.com",
            password: "123456",
            phoneNumber: "0555",
            country: "Türkiye",
            emailIsValid: false,
            admin: false,
            gender: "Male"
          };

        mockRepository.update.mockResolvedValue(fakeUser)
        const result = await userUC.updateUser("1",fakeUser)
        expect(result).toEqual(fakeUser)
    })

    it("Kullanici arama islemi icin repository.searchUser cagrilir.",async () => {
        const fakeUser = {
            _id: "1",
            nameSurname: "Emirhan Uyunmaz",
            email: "e@gmail.com",
            password: "123456",
            phoneNumber: "0555",
            country: "Türkiye",
            emailIsValid: false,
            admin: false,
            gender: "Male"
        };

        mockRepository.searchUser.mockResolvedValue([fakeUser])
        const result = await userUC.searchUser({searchText:"emir"})
        expect(result).toEqual([fakeUser])
    })

    it("Kullanici giris yapma islemi icin repository.login cagrilir.",async() => {
        const fakeUser = {
            _id: "1",
            nameSurname: "Emirhan Uyunmaz",
            email: "e@gmail.com",
            password: "123456",
            phoneNumber: "0555",
            country: "Türkiye",
            emailIsValid: false,
            admin: false,
            gender: "Male"
        };
        const fakeData = {
            email:"emirhanuyunmaz46@gmail.com",
            password:"123456789"
        } 
        mockRepository.login.mockResolvedValue(fakeUser)
        const result = await userUC.loginUser(fakeData)
        expect(result).toEqual("tokenData")

    })

    it("Email gonderilen kullanici code verisini kaydederken repository.emailCodeSave cagrilir.",async () => {
        const fakeData = {
            email:"emirhanuyunmaz46@gmail.com",
            code:"123456",
        }
        
        mockRepository.emailCodeSave.mockResolvedValue(fakeData)

        const result = await userUC.emailCodeSave(fakeData)
        expect(result?.code).toBe(fakeData.code)
        expect(result?.email).toBe(fakeData.email)
    })
    
    it("Email code kontrol edilmesi islemi icin repository.emailCodeVerify cagrilir.",async() => {
        const fakeData = {
            email:"emirhanuyunmaz46@gmail.com",
            code:"123456"
        }
        const result = await userUC.emailCodeVerify(fakeData)
        expect(result).toBe(true)

    })

    it("Email ve code dogurlaninca code verisi silinirmesi icin repository.deleteCode",async() => {
        const result = await userUC.deleteCode({code:"123456"})
        expect(result).toBe(true)
    })

    it("Gelen code gore email doğrulama islemi icin repository.checkCode cagrilir .",async () => {
        const result = await userUC.checkCode({code:"123456"})
        expect(result?.email).toBe("emirhanuyunmaz46@gmail.com")
    })

    it("Email'e ait sifre degistirme islemi icin repository.changePassword cagrilir ",async() => {
        const fakeData = {
            email:"emirhanuyunmaz46@gmail.com",
            password:"123456789",
        }
        mockRepository.changePassword.mockResolvedValue(fakeData)
        const result = await userUC.changePassword(fakeData)
        expect(result?.email).toBe(fakeData.email)
        expect(result?.password).toBe(fakeData.password)
    })

    it("Bir kullanici silme islemi icin repository.singleDeleteUser cagrilir ",async() => {
        const fakeData = {id:"123456789"}
        const result = await userUC.singleDeleteUser(fakeData)
        expect(result).toBe(true)
    })

    it("Birden cok kullanici silme islemi icin repository.multiDeleteUser cagrilir ",async() => {
        type model = {
            ids:[]
        }
        const fakeData:model = {ids:[]} 
        const result = await userUC.multiDeleteUser(fakeData)
        expect(result).toBe(true)
    })

})