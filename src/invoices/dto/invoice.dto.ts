import { ContractorDto } from './contractor.dto';
import { incomeDto } from './income.dto';
import { expensesDto } from './expenses.dto';

export class InvoiceDto {
  position: number;
  date_of_event: string;
  registry: string;
  description: string;
  contractor: ContractorDto;
  income: incomeDto;
  expenses: expensesDto;
}
