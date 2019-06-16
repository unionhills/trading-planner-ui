import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradingPlansRoutingModule } from './trading-plans-routing.module';
import { TradingPlansComponent } from './trading-plans.component';
import { TradingPlansService } from './trading-plans.service';

@NgModule({
    declarations: [TradingPlansComponent],
    imports: [
        CommonModule,
        TradingPlansRoutingModule
    ],
    providers: [
        TradingPlansService
    ]
})
export class TradingPlansModule { }
