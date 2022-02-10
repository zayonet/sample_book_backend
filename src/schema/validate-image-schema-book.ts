import { NextFunction,Response,Request } from "express";
import AppError from "../errors/AppError";

const Schema = (req: Request, res: Response, next: NextFunction) => { 

    if(!req.file){
      throw new AppError('Não adicionou a imagem do livro! Precisa adicionar', 400)
    }

    const formats = ['image/jpeg', 'image/png', 'image/jpg'];
    if(!formats.includes(req.file.mimetype)){
      throw new AppError('Formato errado! Precisa ser do tipo imagem', 400)
    }

    next()
  }

export {Schema as ValidateImageBookSchema}

