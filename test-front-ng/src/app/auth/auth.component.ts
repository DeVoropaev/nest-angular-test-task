import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IForm, RequestService } from '../shared/request.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public requestService: RequestService,
    ) {
    this.requestService.showCredentialsIncorrect = false;
    this.form = this.formBuilder.group({
      login: '',
      password: '',
    });
  }

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
      this.requestService.sendAuthRequest('signin', payload);        
    }
}
