import { Component } from '@angular/core';
import { RequestService } from './shared/request.service';

export interface IAppState {
  loggedIn: Boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-front-ng';

  constructor(
    public requestService: RequestService,
  ) {}
  logout(): void {
    this.requestService.setRegistred(false);
    localStorage.removeItem('token');
  }
}
