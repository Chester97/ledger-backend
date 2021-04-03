import {
  IncomeSoldValidator,
  IncomeTotalValidator,
  IncomeSumValidator,
} from '../helpers/invoiceValidation.decorator';
import { OmitType } from '@nestjs/mapped-types';
import { Schema } from 'mongoose';

export const IncomeSchema = new Schema({
  soldGoods: { type: Number, required: true },
  totalGoods: { type: Number, required: true },
});

export class IncomeDto {
  @IncomeSoldValidator() soldGoods: number;
  @IncomeTotalValidator() totalGoods: number;
  @IncomeSumValidator() sum?: number;
}

export class AddIncomeDto extends OmitType(IncomeDto, ['sum'] as const) {}
