import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TradingPlansService } from '../trading-plans.service';

@Component({
  selector: 'app-trading-plan-detail',
  templateUrl: './trading-plan-detail.component.html',
  styleUrls: ['./trading-plan-detail.component.css']
})
export class TradingPlanDetailComponent implements OnInit {
  tradingPlanEntryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tradingPlanService: TradingPlansService,
    private router: Router
  ) { }

  private createForm() {
    this.tradingPlanEntryForm = this.formBuilder.group({
      underlying:       ['', Validators.required],
      notes:            ['']
    });
  }

  saveTradingPlan() {
  }

  ngOnInit() {
  }

}
