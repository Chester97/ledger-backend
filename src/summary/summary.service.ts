import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SummaryDocument } from './dto/summary.dto';
import { InvoiceDocument } from '../invoices/dto/invoice.dto';

const sum = {
  total: 232323,
};

@Injectable()
export class SummaryService {
  constructor(
    @InjectModel('Summary')
    private readonly summaryModel: Model<SummaryDocument>,
    @InjectModel('Invoice')
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}

  async allSumSummaryExpenses() {
    const foo = await this.invoiceModel.aggregate([
      { $match: {} },
      {
        $group: {
          _id: null,
          amount: { $sum: { $add: ['$expenses.total', '$expenses.other'] } },
        },
      },
      {
        $out: 'summary',
      },
    ]);
    return foo;
  }

  async sumExpensesAndIncomes() {
    const expensesSum = await this.invoiceModel.aggregate([
      { $match: {} },
      {
        $project: {
          invoiceId: '$id',
          totalIncome: {
            $sum: { $add: ['$income.soldGoods', '$income.totalGoods'] },
          },
          totalExpenses: {
            $sum: { $add: ['$expenses.total', '$expenses.other'] },
          },
        },
      },
      {
        $out: 'summary',
      },
    ]);

    return expensesSum;
  }
}
