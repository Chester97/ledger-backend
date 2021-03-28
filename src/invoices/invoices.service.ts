import { Injectable } from '@nestjs/common';
import {
  AddInvoiceDto,
  IdInvoiceDto,
  InvoiceDocument,
  InvoiceDto,
  UpdateInvoiceDto,
} from './dto/invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INVOICES_DATA } from './tests/invoicesData.mock';
import { nanoid } from 'nanoid';
import { isEmpty, isNil, omit } from 'rambda';
import { ExpensesDto } from './dto/expenses.dto';
import { IncomeDto } from './dto/income.dto';

const obj = {
  _id: '605f40b0aa79090cc9da7fd1',
  id: 'YVoBIDHH--wdxZUJlR73-',
  position: 4,
  dateOfEvent: '2021-02-23',
  registry: 'truskawki987',
  description: 'kulalalal',
  contractor: {
    name: 'Kamil',
    surname: 'Kowalczuk',
    companyName: 'KKF Company',
    nip: '54338222343',
    address: 'Pietkiewicza 4D/29',
  },
  income: { soldGoods: 212121, totalGoods: 22323 },
  expenses: { total: 3232, other: 21212 },
  __v: 0,
};

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel('Invoice')
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}
  private invoiceDtos: InvoiceDto[] = INVOICES_DATA;
  private readonly projectFields = '-_id -__v';

  async addInvoice(invoice: AddInvoiceDto): Promise<InvoiceDto | boolean> {
    const { registry } = invoice;
    const isInvoiceExist = await this.isInvoiceExistByRegistry(registry);
    if (isInvoiceExist) {
      return false;
    }
    const position = await this.countRecords();
    const newInvoiceRecord: InvoiceDto = {
      id: nanoid(),
      position,
      ...invoice,
    };
    const createdInvoiceRecord = new this.invoiceModel(newInvoiceRecord);
    const addedInvoice = await createdInvoiceRecord.save();

    return addedInvoice ? newInvoiceRecord : false;
  }

  async isInvoiceExistByRegistry(registryNumber: string): Promise<boolean> {
    const isInvoiceExist = await this.invoiceModel.exists({
      registry: registryNumber,
    });

    return isInvoiceExist;
  }

  async getSpecificInvoice(invoiceID: string) {
    const specificInvoice = await this.invoiceModel.findOne(
      { id: invoiceID },
      this.projectFields,
    );
    return isNil(specificInvoice)
      ? { message: 'Invoice does not exist' }
      : specificInvoice;
  }

  async getAllInvoices() {
    const allInvoices = await this.invoiceModel.find({}, this.projectFields);
    return isEmpty(this.invoiceDtos) || isNil(allInvoices) ? [] : allInvoices;
  }

  async removeSpecificInvoice(invoiceID: string) {
    const removedInvoice = await this.invoiceModel.deleteOne({ id: invoiceID });
    const { deletedCount } = removedInvoice;

    return !!deletedCount;
  }

  async updateSpecificInvoice(
    invoice: UpdateInvoiceDto,
    idObject: IdInvoiceDto,
  ) {
    const { id } = idObject;
    const updatedInvoice = await this.invoiceModel.findOneAndUpdate(
      { id },
      invoice,
    );

    return isNil(updatedInvoice) ? false : true;
  }

  async getLastRecord() {
    const lastRecord = await this.invoiceModel
      .find({})
      .sort({ _id: -1 })
      .limit(1);

    return lastRecord;
  }

  async countRecords(): Promise<number> {
    const lastInvoice = await this.getLastRecord();
    if (isEmpty(lastInvoice)) return 0;
    const { position } = lastInvoice[0];
    return position + 1;
  }

  async sumExpenses() {
    const foo = await this.invoiceModel.aggregate([
      { $match: {} },
      {
        $project: {
          total: { $sum: { $add: ['$expenses.total', '$expenses.other'] } },
        },
      },
    ]);
  }

  async allSumSummaryExpenses() {
    const foo = await this.invoiceModel.aggregate([
      { $match: {} },
      {
        $group: {
          _id: null,
          amount: { $sum: { $add: ['$expenses.total', '$expenses.other'] } },
        },
      },
    ]);
    return foo;
  }

  async sumIncome() {
    const foo = await this.invoiceModel.aggregate([
      { $match: {} },
      {
        $project: {
          total: {
            $sum: { $add: ['$income.soldGoods', '$income.totalGoods'] },
          },
        },
      },
    ]);
    return foo;
  }
}
