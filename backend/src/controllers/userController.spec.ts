import mssql from 'mssql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { deleteUser, loginUser, registerUser } from './userController';
import { Request, Response } from 'express'

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
                password: "@Hashedpass123"
                
            }

        }

        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("@Hashedpass123" as never)

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await registerUser(req as Request, res as any)
        
        expect(res.json).toHaveBeenCalledWith({message: 'User Registered Successfully!'})
        expect(res.status).toHaveBeenCalledWith(200)
        expect(mockedInput).toHaveBeenCalledWith('password', mssql.VarChar, '@Hashedpass123')
        expect(mockedInput).toHaveBeenCalledWith('username', mssql.VarChar, 'Test Test')
        expect(mockedInput).toHaveBeenCalledWith('email', mssql.VarChar, 'test@gmail.com')
    })
})

describe("Testing Login Functionality", () => {

    let res: any

    beforeEach(() => {
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })


    it('Returns an error if email or password is empty', async () => {
        const req = {
            body: {
                email: '',
                password: ''
            }
        }

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith( {"error": "\"email\" is not allowed to be empty"})
    })

    it('returns an error if email or password is missing', async () => {
        const req = {
            body: {
                
            }
        }

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({"error": "\"email\" is required"})
    })


    it("Returns an error if email is not in the database", async () => {
        const req = {
            body: {
                email: "incorrect@email.com",
                password: "12152454"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: []})
        } as never)

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({error: "User not found"})
    })

    it("successfully logs in user and returns a token", async() => {

        let expectedUser = {
            username: "Emmanuel Kipsang",
            email: "emmqnuelkipsqng@gmail.com",
            password: "@Emmanuel123"
        }

        const req = {
            body: {
                email: expectedUser.email,
                password: "@Correctpass123"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: [expectedUser]})
        } as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)

        jest.spyOn(jwt, 'sign').mockReturnValueOnce("generate-token-snmdsjdfnnlkjljfdg" as never)

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Logged in Successfully",
            token: "generate-token-snmdsjdfnnlkjljfdg"
        })


    })


})