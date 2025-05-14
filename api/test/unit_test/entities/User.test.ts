import { User } from "../../../src/entities/User"


describe("Entity: User",() => {
    it("Geçerli isim ve email ile oluşturulmalı.",() => {
        const u = new User({admin:false,country:"Türkiye",email:"emir@gmail.com",emailIsValid:false,gender:"Male",nameSurname:"Emirhan Uyunmaz",password:"123456789",phoneNumber:"05555555555"})
        expect(u.nameSurname).toBe("Emirhan Uyunmaz")
        
    })
})