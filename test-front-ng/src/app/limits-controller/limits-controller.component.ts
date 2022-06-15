import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestService } from '../shared/request.service';

@Component({
  selector: 'app-limits-controller',
  templateUrl: './limits-controller.component.html',
  styleUrls: ['./limits-controller.component.css']
})
export class LimitsControllerComponent implements OnInit {
  ipForm: FormGroup;
  tokenForm: FormGroup;
  render: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public requestService: RequestService,
    ) {
    this.render = !!localStorage.getItem('token');   

    this.ipForm = this.formBuilder.group({
      ipValue: Number,
    });
    this.tokenForm = this.formBuilder.group({
      tokenValue: Number,
    });
  }

  ngOnInit(): void { 
    
    this.ipForm = this.formBuilder.group({
      ipValue: 0,
    });
    this.tokenForm = this.formBuilder.group({
      tokenValue: 0,
    });
  }

  setIpLimit(): void {
    const payload: number = this.ipForm.getRawValue().ipValue;
    if(payload > 1) this.requestService.sendSetLimitRequest('ip', payload);
  }
  setTokenLimit(): void {
    const payload: number = this.tokenForm.getRawValue().tokenValue;    
    if(payload > 1) this.requestService.sendSetLimitRequest('token', payload);
  }
}
