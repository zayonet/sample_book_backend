import { sign } from "jsonwebtoken";

export function generateToken() {
  
const token = sign({}, process.env.APP_SECRET as string, { expiresIn: '1h', });
return token;

};