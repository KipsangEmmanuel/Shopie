import { Request, Response } from "express";
import {v4} from 'uuid'
import mssql from 'mssql'

describe("Testing Product", () => {

    let res:any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it("getting a single product", async()=> {
        const req = {
            params: {
                product_id: 'my-product-id'
            }
        }

        let expectedProduct = {
            product_id: "",
            product_name: "",
            description: "",
            price: "",
            image: ""
        }
    })

})