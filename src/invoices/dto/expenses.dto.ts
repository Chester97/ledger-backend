import {
  ExpenseOtherValidator,
  ExpenseTotalValidator,
  ExpenseSumValidator,
} from '../helpers/invoiceValidation.decorator';
import { OmitType } from '@nestjs/mapped-types';
import { Schema } from 'mongoose';

export const ExpensesSchema = new Schema({
  other: { type: Number, required: true },
  total: { type: Number, required: true },
});

export class ExpensesDto {
  @ExpenseOtherValidator() other: number;
  @ExpenseTotalValidator() total: number;
  @ExpenseSumValidator() sum?: number;
}

export class AddExpensesDto extends OmitType(ExpensesDto, ['sum'] as const) {}
