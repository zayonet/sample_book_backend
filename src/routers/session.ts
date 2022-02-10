import { Router } from 'express';
import SessionController from '../controller/SessionController';
import { validateRequestSchema } from '../middlewares/validate-request-schema';
import { ValidateSessionSchema } from '../schema/validate-session-schema';

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post('/', ValidateSessionSchema, validateRequestSchema, sessionController.create);

export default sessionRoutes;