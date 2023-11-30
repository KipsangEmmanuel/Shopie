import { v4 } from 'uuid'
import mssql from 'mssql'
import { sqlConfig } from '../config/sqlConfig'
import Connection from '../services/dbConnect'
import { Request, Response } from 'express'

const dbhelper = new Connection

export const createProduct = async (req: Request, res: Response) => {
    try {
        const id = v4();

        const { product_id, product_name, description, price, image } = req.body

        dbhelper.execute('createProduct', {
            product_id:id, product_name, description, price, image
        })

        return res.status(200).json({
            message: 'Product created successfully'
        })
         
        
    } catch (error) {
        return res.json({
            error: error
        })
        
    }
}

export const fetchProducts = async(req:Request, res:Response) => {
    try {

        const pool = await mssql.connect(sqlConfig)

        const products = (await pool.request().execute('fetchAllProducts')).recordset

        return res.status(200).json({
            products: products
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
        
    }
}

export const fetchOneProduct = async(req: Request, res:Response) => {
    try {
        let {product_id} = req.params

        const pool = await mssql.connect(sqlConfig)

        const product = (await pool.request().input('product_id', product_id).execute('getSingleProduct'))

        return res.json({
            product: product
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
        
    }
}

export const deleteProduct = async(req:Request, res:Response)=>{
    try {
        let {product_id} = req.params
        console.log('Deleting product with ID:', product_id);

        const pool = await mssql.connect(sqlConfig)
        const product = (await pool.request().input('product_id', product_id).execute('deleteProduct')).rowsAffected

        if((product[0]) == 1) {
            return res.status(200).json({
                message: "Product deleted successfully"
            })
        }else{
            return res.status(400).json({
                error: "No product with the given Id"
            })        }
        
    } catch (error) {
        res.json({
            error: "Server not running"
        })
    }
}


export const UpdateProductControllers = async (req: Request, res: Response) => {
    try {
      const {product_name, description, price, image } = req.body;
      const {product_id} =req.params
      if (! product_id) {
        return res
          .status(400)
          .json({ error: "product not found" });
      }
      const pool = await mssql.connect(sqlConfig);
  
      const updatedProduct = await pool.request().input("product_id",
      mssql.VarChar(100),product_id).input("product_name",mssql.VarChar(200),product_name).input("description", mssql.VarChar(800), description).input("price",
      mssql.Int,price).input("image", mssql.VarChar(500),image).execute("updateProduct");
  
  
      if (updatedProduct.returnValue === 0) {
        return res.status(200).json({
          success: true,
          message: "Product updated successfully",
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to update product",
        });
      }
    } catch (error) {
      return res.json({
        error: error,
      });
    }
  };
