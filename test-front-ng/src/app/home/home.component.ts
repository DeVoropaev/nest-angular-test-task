import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  render: Boolean = false;

  constructor(public requestService: RequestService) {}

  ngOnInit(): void {
  }

  logout(): void {
    this.requestService.setRegistred(false);
    localStorage.removeItem('token');
  }

}
