import {
  ExpenseOtherValidator,
  ExpenseTotalValidator,
} from '../helpers/invoiceValidation.decorator';

export class ExpensesDto {
  @ExpenseOtherValidator() other: number;
  @ExpenseTotalValidator() total: number;
}
