import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(req: any): Promise<string>;
    signup(req: any): Promise<string>;
}