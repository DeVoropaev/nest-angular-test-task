// IP request interface
export interface IRequests {
  ip: string;
  time: Date;
}
// JWT request interface
export interface ITokenRequests {
  token: string;
  time: Date;
}

export class LimitsStore {
  // arrays of requests
  private requestsIP: Array<IRequests>;
  private requestsJWT: Array<ITokenRequests>;
  //current limits
  private limitIP: number;
  private limitJWT: number;

  constructor() {
    // creating default values of limits
    this.limitIP = 100;
    this.limitJWT = 200;
    this.requestsIP = [];
    this.requestsJWT = [];
  }

  // limit checker method
  checkRequestIP(request: IRequests) {
    // refreshing the array of requests and deleting ones that are
    // older than one hour
    this.requestsIP = this.requestsIP.filter(
      (currReq) =>
        currReq.time.getTime() - new Date().getTime() < 60 * 60 * 1000,
    );
    // getting all requests of current user
    const allRequests: Array<IRequests> = this.requestsIP.filter(
      (currReq) => currReq.ip === request.ip,
    );
    // returning a boolean value of comparing length of user array and ip limit
    const res: boolean = allRequests.length >= this.limitIP ? false : true;
    return res;
  }
  // jwt checker method (the same as ip checker)
  checkRequestJWT(request: ITokenRequests): boolean {
    this.requestsJWT = this.requestsJWT.filter(
      (currReq) =>
        currReq.time.getTime() - new Date().getTime() < 60 * 60 * 1000,
    );

    const allRequests: Array<ITokenRequests> = this.requestsJWT.filter(
      (currReq) => currReq.token === request.token,
    );

    const res: boolean = allRequests.length >= this.limitJWT ? false : true;
    return res;
  }
  // new request setters
  setRequestIP(request: IRequests): void {
    this.requestsIP = [...this.requestsIP, request];
  }
  setRequestJWT(request: ITokenRequests): void {
    this.requestsJWT = [...this.requestsJWT, request];
  }
  // new limits setters
  setLimitIP(limit: number): void {
    this.limitIP = limit;
  }
  setLimitJWT(limit: number): void {
    this.limitJWT = limit;
  }
  // getters of remaining time
  getTimeLeftIP(request: IRequests): number {
    // getting all requests of single user
    const allRequests: Array<IRequests> = this.requestsIP.filter(
      (currReq) => currReq.ip === request.ip,
    );
    // getting his earliest request
    const firstRequest = allRequests[0];
    // calculating
    const timeLeft =
      firstRequest.time.getTime() + 60 * 60 * 1000 - new Date().getTime();
    return timeLeft;
  }
  getTimeLeftJWT(request: ITokenRequests): number {
    const allRequests: Array<ITokenRequests> = this.requestsJWT.filter(
      (currReq) => currReq.token === request.token,
    );
    const firstRequest = allRequests[0];
    const timeLeft =
      firstRequest.time.getTime() + 60 * 60 * 1000 - new Date().getTime();
    return timeLeft;
  }
}
