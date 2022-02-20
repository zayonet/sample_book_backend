import { buildDevLogger } from './development_logs';
import { buildProductLogger } from './production_logs'; let logger: any = null;
if (process.env.NODE_ENV !== 'production') { logger = buildDevLogger(); } else { logger = buildProductLogger(); }


export default logger; 