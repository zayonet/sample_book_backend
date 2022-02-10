import { body, check } from "express-validator";

const Schema = [  
  check('name', 'Precisa preencher o campo nome')
    .exists({ checkFalsy:true })
    .isLength({ min: 3 })
    .withMessage('O nome deve ter mais de 3 caracteres'), 
  body('email').isEmail().normalizeEmail().withMessage('Email deve ser válido'),
  check('password', 'A senha deve ter mais de 5 caracteres e conter um número')
    .isLength({ min: 3 })
    .matches(/\d/)
    .withMessage('Deve conter um número'),
]


const SchemaUpdate = [
  check('password', 'Precisa confirmar a sua senha')
    .isLength({ min: 3 })
    .withMessage('A senha deve ter mais de 5 caracteres e conter um número')
    .matches(/\d/)
    .withMessage('A senha deve conter um número pelo menos'),
]

export {Schema as ValidateUserSchemaOnRegistering, SchemaUpdate as ValidateUserSchemaOnUpdating}