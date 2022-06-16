import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { LimitsStore } from 'src/limits-setter/store/limitsStore';
export declare class AuthService {
    private jwtService;
    private limitsStore;
    constructor(jwtService: JwtService, limitsStore: LimitsStore);
    signin(dto: AuthDto): Promise<string>;
    signup(dto: AuthDto): Promise<string>;
    signUser(uId: number, login: string, type: string): string;
}
