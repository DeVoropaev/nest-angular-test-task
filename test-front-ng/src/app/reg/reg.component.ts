import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestService, IForm } from '../shared/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public requestService: RequestService,
    ) {
    this.requestService.showUserAlreadyExists = false;
    this.form = this.formBuilder.group({
    login: '',
    password: '',
  });}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: '',
      password: '',
    });
  }

  submit (): void {
    const payload: IForm = {
      login: this.form.getRawValue().login,
      password: this.form.getRawValue().password,
    }
    this.requestService.sendAuthRequest('signup', payload);
  }
}
