import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingPlansComponent } from './trading-plans.component';

const routes: Routes = [
     { path: 'trading-plans', component: TradingPlansComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TradingPlansRoutingModule { }
