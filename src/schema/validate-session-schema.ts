import { body, check } from "express-validator";

const Schema = [   
  body('email').isEmail().normalizeEmail().withMessage('Email deve ser válido'),
  check('password', 'A senha deve ter mais de 5 caracteres e conter um número')
    .isLength({ min: 3 })
    .matches(/\d/)
    .withMessage('Deve conter um número'),
]

export {Schema as ValidateSessionSchema}