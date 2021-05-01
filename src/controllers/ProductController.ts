import { Request, Response } from 'express';
import Product from '../models/Product';

class ProductController{

  async store(req: Request, res: Response){
    const { filename } = req.file;
    const { name, description, price, location, status } = req.body;
    const { user_id } = req.headers;

    const product = await Product.create({
      user: user_id,
      thumbnail: filename,
      name,
      description,
      price,
      location,
      status,
    });

    return res.json(product);
  }

}

export default new ProductController();