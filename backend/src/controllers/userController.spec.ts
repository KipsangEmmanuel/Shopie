import mssql from 'mssql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


describe("User Registration", () => {
    let res: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it("successfully registeres a user", async() => {
        const req = {
            body: {
                username: "Test Test",
                email: "test@gmail.com",
                password: "@HashedPass123"
                
            }

        }
        
    })
})