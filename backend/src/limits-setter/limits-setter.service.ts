import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITokenRequests, LimitsStore } from './store/limitsStore';

function limitsException(message) {
  return new HttpException(message, HttpStatus.FORBIDDEN);
}

@Injectable()
export class LimitsService {
  constructor(private limitsStore: LimitsStore) {}
  // ip limit setter method
  async setIpLimit(token: string, limit) {
    const request: ITokenRequests = {
      token,
      time: new Date(),
    };
    // checking if user doesnt break request limit
    if (this.limitsStore.checkRequestJWT(request)) {
      // if he does not, creating a new request action
      this.limitsStore.setRequestJWT(request);
      // setting a new ip limit
      this.limitsStore.setLimitIP(Number(limit.limit));
      //returning a new limit
      return JSON.stringify(limit);
    } else {
      // else, returning time left until next request is available
      throw limitsException(`${this.limitsStore.getTimeLeftJWT(request)}`);
    }
  }
  // token limit setter method
  async setTokenLimit(token: string, limit) {
    const request: ITokenRequests = {
      token,
      time: new Date(),
    };
    // checking if user doesnt break request limit
    if (this.limitsStore.checkRequestJWT(request)) {
      // if he does not, creating a new request action
      this.limitsStore.setRequestJWT(request);
      // setting a new jwt limit
      this.limitsStore.setLimitJWT(Number(limit.limit));
      //returning a new limit
      return JSON.stringify(limit);
    } else {
      // else, returning time left until next request is available
      throw limitsException(`${this.limitsStore.getTimeLeftJWT(request)}`);
    }
  }
}
