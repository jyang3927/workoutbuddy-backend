import {Request} from 'express'; 
//Will be inheriting from Request interface from express
export interface AuthRequest extends Request{
    userId?: string; 
}