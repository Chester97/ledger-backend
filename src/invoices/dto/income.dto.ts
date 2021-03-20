import {
  IncomeSoldValidator,
  IncomeTotalValidator,
} from '../helpers/invoiceValidation.decorator';
import { Schema } from 'mongoose';

export const IncomeSchema = new Schema({
  soldGoods: { type: Number, required: true },
  totalGoods: { type: Number, required: true },
});

export class IncomeDto {
  @IncomeSoldValidator() soldGoods: number;
  @IncomeTotalValidator() totalGoods: number;
}
