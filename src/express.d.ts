import { IUserInterface } from './interfaces/UserInterface';

declare global {
    namespace Express {
        interface Request {
            user?: IUserInterface
        }
    }
}