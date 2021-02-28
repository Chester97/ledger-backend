import {
  IncomeSoldValidator,
  IncomeTotalValidator,
} from '../helpers/invoiceValidation.decorator';

export class IncomeDto {
  @IncomeSoldValidator() soldGoods: number;
  @IncomeTotalValidator() totalGoods: number;
}
