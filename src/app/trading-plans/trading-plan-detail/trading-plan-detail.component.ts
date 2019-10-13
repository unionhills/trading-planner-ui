import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { TradingPlan } from '../model/trading-plan.model';
import { TrendOutlook, OrderStatus } from '../trading-plan.enum';
import { TradingPlansService } from '../trading-plans.service';
import { InMemoryDataService } from '../../in-memory-data.service';

@Component({
  selector: 'app-trading-plan-detail',
  templateUrl: './trading-plan-detail.component.html',
  styleUrls: ['./trading-plan-detail.component.css']
})
export class TradingPlanDetailComponent implements OnInit {
  tradingPlanEntryForm: FormGroup;
  tradingPlan: TradingPlan;
  tradingPlanId: string;

  constructor(
    private formBuilder: FormBuilder,
    private tradingPlanService: TradingPlansService,
    private router: Router,
    private route: ActivatedRoute,
    private inMemoryDataService: InMemoryDataService
  ) {
    this.route.paramMap.subscribe(params => {
      this.tradingPlanId = params.get('id');
      console.log(
        `TradingPlanDetailComponent route params: ${this.tradingPlanId}`
      );
    });
  }

  private populateForm(mutableTradingPlan?: TradingPlan) {
    if (!mutableTradingPlan)
      mutableTradingPlan = this.inMemoryDataService.generateRandomTradingPlanDto(
        null
      );

    this.tradingPlanEntryForm = this.formBuilder.group({
      underlying: [mutableTradingPlan.underlying, Validators.required],
      underlyingDescription: [mutableTradingPlan.underlyingDescription],
      marketOutlook: [mutableTradingPlan.marketOutlook],
      marketTrend: [mutableTradingPlan.marketTrend],
      underlyingOutlook: [mutableTradingPlan.underlyingOutlook],
      underlyingTrend: [mutableTradingPlan.underlyingTrend],
      timeFrame: [mutableTradingPlan.timeFrame],
      strategy: [mutableTradingPlan.strategy],
      costPerContract: [
        mutableTradingPlan.costPerContract,
        Validators.compose([Validators.required, Validators.min(1)])
      ],
      numberOfContracts: [
        mutableTradingPlan.numberOfContracts,
        Validators.compose([Validators.required, Validators.min(1)])
      ],
      stopLoss: [mutableTradingPlan.stopLoss],
      technicalStopLoss: [mutableTradingPlan.technicalStopLoss],
      timeStop: [mutableTradingPlan.timeStop],
      limit: [mutableTradingPlan.limit],
      technicalLimit: [mutableTradingPlan.technicalLimit],
      plannedTradeEntryDate: [mutableTradingPlan.plannedTradeEntryDate],
      plannedTradeExitDate: [mutableTradingPlan.plannedTradeExitDate],
      entryReason: [mutableTradingPlan.entryReason],
      contingencies: [mutableTradingPlan.contingencies],
      status: [mutableTradingPlan.status],
      notes: [mutableTradingPlan.notes]
    });
  }

  ngOnInit() {
    if (this.tradingPlanId) {
      // ToDo: Figure out how to load a form from Observable data
      //    this.populateTradingPlan(this.tradingPlanId);
    } else {
      this.populateForm();
    }
  }

  private populateTradingPlan(tradingPlanId: string) {
    this.tradingPlanService.getTradingPlan(tradingPlanId).subscribe(
      (tradingPlan: TradingPlan) => {
        this.tradingPlan = tradingPlan;
        this.populateForm(tradingPlan);
      },
      (error: any) => console.log(error),
      () => {}
    );
  }

  saveTradingPlan() {
    console.log('TradingPlanDetailComponent::saveTradingPlan()');

    if (!this.tradingPlanEntryForm.valid) {
      alert(`Some of your entries are missing or invalid, please correct them`);
      return;
    }

    const tradingPlan: TradingPlan = this.inMemoryDataService.generateRandomTradingPlanDto(
      null
    );

    tradingPlan.underlying = this.tradingPlanEntryForm.value.underlying;
    tradingPlan.underlyingDescription = this.tradingPlanEntryForm.value.underlyingDescription;

    tradingPlan.marketOutlook = this.tradingPlanEntryForm.value.marketOutlook;
    tradingPlan.marketTrend = this.tradingPlanEntryForm.value.marketTrend;

    tradingPlan.underlyingOutlook = this.tradingPlanEntryForm.value.underlyingOutlook;
    tradingPlan.underlyingTrend = this.tradingPlanEntryForm.value.underlyingTrend;

    tradingPlan.timeFrame = this.tradingPlanEntryForm.value.timeFrame;
    tradingPlan.strategy = this.tradingPlanEntryForm.value.strategy;

    tradingPlan.costPerContract = this.tradingPlanEntryForm.value.costPerContract;
    tradingPlan.numberOfContracts = this.tradingPlanEntryForm.value.numberOfContracts;

    tradingPlan.stopLoss = this.tradingPlanEntryForm.value.stopLoss;
    tradingPlan.technicalStopLoss = this.tradingPlanEntryForm.value.technicalStopLoss;

    tradingPlan.limit = this.tradingPlanEntryForm.value.limit;
    tradingPlan.technicalLimit = this.tradingPlanEntryForm.value.technicalLimit;

    tradingPlan.plannedTradeEntryDate = this.tradingPlanEntryForm.value.plannedTradeEntryDate;
    tradingPlan.plannedTradeExitDate = this.tradingPlanEntryForm.value.plannedTradeExitDate;

    tradingPlan.entryReason = this.tradingPlanEntryForm.value.entryReason;
    tradingPlan.contingencies = this.tradingPlanEntryForm.value.contingencies;

    tradingPlan.status = this.tradingPlanEntryForm.value.status;
    tradingPlan.notes = this.tradingPlanEntryForm.value.notes;

    this.tradingPlanService.createTradingPlan(tradingPlan).subscribe(
      (tradingPlan: TradingPlan) => {
        console.log(
          'TradingPlanDetailComponent::saveTradingPlan(): ' +
            JSON.stringify(tradingPlan)
        );
        this.router.navigateByUrl('/trading-plans');
      },
      (error: any) => console.log(error),
      () => {}
    );
  }
}
