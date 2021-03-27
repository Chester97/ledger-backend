import { Injectable } from '@nestjs/common';
import {
  AddInvoiceDto,
  IdInvoiceDto,
  InvoiceDocumnet,
  InvoiceDto,
  UpdateInvoiceDto,
} from './dto/invoice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INVOICES_DATA } from './tests/invoicesData.mock';
import { nanoid } from 'nanoid';
import { all, isEmpty, isNil } from 'rambda';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel('Invoice')
    private readonly invoiceModel: Model<InvoiceDocumnet>,
  ) {}
  private invoiceDtos: InvoiceDto[] = INVOICES_DATA;
  private positionInvoice = 3;

  addInvoice(invoice: AddInvoiceDto): any {
    const newInvoiceRecord: InvoiceDto = {
      id: nanoid(),
      position: ++this.positionInvoice,
      ...invoice,
    };
    const { registry } = newInvoiceRecord;
    if (this.isInvoiceExistByRegistry(registry)) {
      return false;
    }
    // do wywalenia
    this.invoiceDtos.push(newInvoiceRecord);
    const createdInvoiceRecord = new this.invoiceModel(newInvoiceRecord);

    // addInvoice będzie zwracał Promisa
    createdInvoiceRecord.save();
    return newInvoiceRecord;
  }

  isInvoiceExistByRegistry(registryNumber: string): boolean {
    if (this.invoiceDtos.length < 1) return false;
    const isInvoiceExist = this.invoiceDtos.filter(
      ({ registry }) => registry === registryNumber,
    );
    return !isEmpty(isInvoiceExist);
  }

  async getSpecificInvoice(invoiceID: string) {
    const specificInvoice = await this.invoiceModel.findOne(
      { id: invoiceID },
      '-_id -__v',
    );
    return isNil(specificInvoice)
      ? { message: 'Invoice does not exist' }
      : specificInvoice;
  }

  async getAllInvoices() {
    const allInvoices = await this.invoiceModel.find({}, '-_id -__v');
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
}
