import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { IAppState } from '../app.component';

export interface IForm {
  login: string,
  password: string,
}

@Injectable({providedIn: "root"})
export class RequestService {

  public isRegistred: Boolean = !!localStorage.getItem('token');
  public showCredentialsIncorrect: boolean;
  public showUserAlreadyExists: boolean;
  public timeLeft: number;

  constructor(
    private router: Router
  ) {
    this.showCredentialsIncorrect = false;
    this.showUserAlreadyExists = false;
    this.timeLeft = 0;
  }

  async sendAuthRequest(path: string, payload: IForm): Promise<void> {
    const res = fetch(`/auth/${path}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.text();    
    })
    .then((tkn) => {
      const data = JSON.parse(tkn);
      
      if(!data.hasOwnProperty('message')) {
        localStorage.setItem('token', data);
        this.setRegistred(true);
        this.router.navigate(['home']);
      } else if(data.message === 'Credentials incorrect!') {
        this.showCredentialsIncorrect = true;
      } else if(data.message === 'User already exists1') {
        this.showUserAlreadyExists = true;
      } else {
        const date = data.message;
        alert(`
        You have broken the limit of requests! 
        You can try again in ${(Number(date) / 60 / 1000).toFixed(0)} minutes!
        `);
      }
    })
    .catch(error => {
      throw(error);
    });
  }

  async sendSetLimitRequest(path: string, payload: number): Promise<void> {
    const reqBody = {
      limit: payload,
    }

    fetch(`/setlimits/${path}`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.text();
    }).then((res) => {
      const response = JSON.parse(res);
      if(response.hasOwnProperty('message')) {
        const date = response.message;
        alert(`
        You have broken the limit of requests! 
        You can try again in ${(Number(date) / 60 / 1000).toFixed(0)} minutes!
        `);
      } else {
        alert(`New limit (${response.limit} requests) set!`);
      }
    })
  }

  public setRegistred(status: Boolean): void {
    this.isRegistred = status;
  }

}
