import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../models';
import * as bcrypt from 'bcrypt';
import { IRequests, LimitsStore } from 'src/limits-setter/store/limitsStore';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private limitsStore: LimitsStore,
  ) {}

  async signin(dto: AuthDto) {
    const ip = dto.ip;

    const request: IRequests = {
      ip,
      time: new Date(),
    };
    // checking if user doesnt break the request limits
    if (this.limitsStore.checkRequestIP(request)) {
      // if everythings ok, creating a new request by ip
      this.limitsStore.setRequestIP(request);
      // checking if this username exists
      const user = await User.findOne({
        where: {
          login: dto.login,
        },
      });
      // if username dousnt exist or password doesnt fit, throwing an error
      if (!user || !bcrypt.compare(dto.password, user.password))
        throw new UnauthorizedException('Credentials incorrect!');
      // else, creating a token
      const token = this.signUser(user.id, user.login, 'user');
      // updating db
      await user.update({ token: token });
      // returning token
      return JSON.stringify(token);
    } else {
      // if user broke requests limit, throwing an error
      throw new UnauthorizedException(
        `${this.limitsStore.getTimeLeftIP(request)}`,
      );
    }
  }

  async signup(dto: AuthDto) {
    const ip = dto.ip;

    const request: IRequests = {
      ip,
      time: new Date(),
    };
    // checking if user doesnt break the request limits
    if (this.limitsStore.checkRequestIP(request)) {
      // if everythings ok, creating a new request by ip
      this.limitsStore.setRequestIP(request);
      // checking if this username already exists
      const user = await User.findOne({
        where: {
          login: dto.login,
        },
      });
      if (!!user) {
        // if user exists, throwing error
        throw new UnauthorizedException('User already exists1');
      } else {
        // else, creating a new user
        const newUser = await User.create({
          login: dto.login,
          password: await bcrypt.hash(dto.password, 4),
          token: '',
        });
        //returning token
        const token = this.signUser(newUser.id, newUser.login, 'user');
        await newUser.update({ token: token });
        return JSON.stringify(token);
      }
    } else {
      // else, throwing an error with time left until next request is available
      throw new UnauthorizedException(
        `${this.limitsStore.getTimeLeftIP(request)}`,
      );
    }
  }
  // token creator method
  signUser(uId: number, login: string, type: string) {
    return this.jwtService.sign({
      sub: uId,
      login,
      claim: type,
    });
  }
}
