import { createConnection } from 'typeorm';
import logger from '../logs';

createConnection().catch(error => logger.error(error));
