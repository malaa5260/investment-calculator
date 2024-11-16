import { Injectable, signal } from '@angular/core';
import type { InvestmentInput } from './investment-input.model';
import type { InvestmentResults } from './investment-results.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  
  resultsDataSignal = signal<InvestmentResults[]>(new Array<InvestmentResults>());
  
  constructor() { }

  calculateInvestmentResults(data: InvestmentInput) {
    const { initialInvestment, duration, expectedReturn, annualInvestment } = data;
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      } as InvestmentResults);
    }
    this.resultsDataSignal.set(annualData);
  }

}
