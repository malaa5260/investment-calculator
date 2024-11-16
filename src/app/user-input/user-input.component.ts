import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { InvestmentInput } from '../investment-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  //investmentInputModel: InvestmentInput = { initialInvestment: 0, annualInvestment: 0, expectedReturn: 5, duration: 10 } as InvestmentInput;
  investmentInputModel = signal<InvestmentInput>({ initialInvestment: 0, annualInvestment: 0, expectedReturn: 5, duration: 10 })
  // calculate = output<InvestmentInput>();
  private investmentService = inject(InvestmentService);
  
  onSubmit() {
    this.investmentService.calculateInvestmentResults(this.investmentInputModel());
    this.investmentInputModel.set({ initialInvestment: 0, annualInvestment: 0, expectedReturn: 5, duration: 10 });
  }
}
