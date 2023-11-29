export interface updateUser {
    _id: string;
    username: string;
    email: string;
  }
  
export interface user extends updateUser {
    password: string;
    role: string;
}


// export interface ExtendedUser extends Request {
//     info?: updateUser;
// }

export interface checkDetailsUser {
  _id: string;
  username: string;
  email: string;
  role:string
}
export interface Products {
  product_id: string;
  product_name: string;
  description: string;
  price: number;
  image?: string;
}
