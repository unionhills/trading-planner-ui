import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { TradingPlan } from './model/trading-plan.model';

@Injectable({
  providedIn: 'root'
})
export class TradingPlansService {
  private serviceUrl = 'http://localhost:3000/api/trading-plans';

  constructor(private http: HttpClient) {}

  public getTradingPlans(): Observable<TradingPlan[]> {
    console.log('TradingPlansService::getTradingPlans()');

    return this.http.get<TradingPlan[]>(this.serviceUrl).pipe(
      tap(data => console.log('getTradingPlans(): ' + JSON.stringify(data))),
      catchError(this.handleError<TradingPlan[]>(`getTradingPlans`))
    );
  }

  public createTradingPlan(tradingPlan: TradingPlan): Observable<TradingPlan> {
    console.log('TradingPlansService::createTradingPlan(): ' + tradingPlan.id);

    return this.http.post<TradingPlan>(this.serviceUrl, tradingPlan).pipe(
      tap(data => console.log('createTradingPlan(): ' + JSON.stringify(data))),
      catchError(this.handleError<TradingPlan>(`createTradingPlan`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
