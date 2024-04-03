import {Request} from 'express'; 
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
//Will be inheriting from Request interface from express
export interface AuthRequest extends Request{
    user?: DecodedIdToken; 
}