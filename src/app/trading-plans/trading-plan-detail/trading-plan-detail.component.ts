import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TradingPlan } from '../model/trading-plan.model';
import { TradingPlansService } from '../trading-plans.service';
import { InMemoryDataService } from '../../in-memory-data.service';


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
    private router: Router,
    private inMemoryDataService: InMemoryDataService
  ) {}

  private createForm() {
    this.tradingPlanEntryForm = this.formBuilder.group({
      underlying: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit() {
    this.createForm();
  }

  saveTradingPlan() {
    console.log('TradingPlanDetailComponent::saveTradingPlan()');

    if (!this.tradingPlanEntryForm.valid) {
      alert(`Some of your entries are missing or invalid, please correct them`);
      return;
    }

    const tradingPlan: TradingPlan = this.inMemoryDataService.generateRandomTradingPlanDto(undefined);
    tradingPlan.underlying = this.tradingPlanEntryForm.value.underlying;
    tradingPlan.notes = this.tradingPlanEntryForm.value.notes;

    this.tradingPlanService.createTradingPlan(tradingPlan);
//  this.router.navigateByUrl('/trading-plans');
  }
}
