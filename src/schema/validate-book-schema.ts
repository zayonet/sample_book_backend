import { body, check } from "express-validator";

const Schema = [
  check('title', 'Precisa preencher o campo título')
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage('O título deve ter mais de 3 caracteres'),
  check('price', 'A preço deve ter mais de 1 caracteres e conter um número')
    .isLength({ min: 1 })
    .withMessage('Mínimo é 1 número'),
  check('user_id', 'Parece que o ID do usuario não foi adicionado').notEmpty(),
  check('author', 'Precisa preencher o campo author').notEmpty(),
  check('publishing_company', 'Precisa preencher o campo editor').notEmpty(),
]

export { Schema as validateBookSchemaFields }