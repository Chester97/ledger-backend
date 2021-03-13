import { Injectable } from '@nestjs/common';
import { AddInvoiceDto, InvoiceDto } from './dto/invoice.dto';
import { nanoid } from 'nanoid';
import { isEmpty } from 'rambda';

const firstItem: InvoiceDto = {
  id: 'dek66dKCUdfhJR5LfqZZS',
  position: 5,
  dateOfEvent: '2021-02-23',
  registry: 'abc1234678',
  description: 'kulalalal',
  income: {
    soldGoods: 232323,
    totalGoods: 3232323,
  },
  contractor: {
    name: 'Kamil',
    surname: 'Kowalczuk',
    companyName: 'KKF Company',
    nip: '54333222343',
    address: 'Pietkiewicza 4D/29',
  },
  expenses: {
    other: 323,
    total: 3232,
  },
};

@Injectable()
export class InvoicesService {
  private readonly invoiceDtos: InvoiceDto[] = [firstItem];

  addInvoice(invoice: AddInvoiceDto): any {
    const newInvoiceRecord: InvoiceDto = { id: nanoid(), ...invoice };
    const { registry } = newInvoiceRecord;
    if (this.isInvoiceExistByRegistry(registry)) {
      return false;
    }
    this.invoiceDtos.push(newInvoiceRecord);
    return newInvoiceRecord;
  }

  isInvoiceExistByRegistry(registryNumber: string): boolean {
    if (this.invoiceDtos.length < 1) return false;
    const isInvoiceExist = this.invoiceDtos.filter(
      ({ registry }) => registry === registryNumber,
    );
    return !isEmpty(isInvoiceExist);
  }

  getSpecificInvoice(invoiceID: string) {
    const currentInvoice = this.invoiceDtos.filter(
      ({ id }) => id === invoiceID,
    );
    return isEmpty(currentInvoice)
      ? { message: 'Cannot find invoice' }
      : currentInvoice[0];
  }

  getAllInvoices() {
    return isEmpty(this.invoiceDtos) ? [] : this.invoiceDtos;
  }

  removeSpecificInvoice(invoiceID: string) {
    const invoices = this.invoiceDtos.filter(({ id }) => invoiceID !== id);
  }
}
