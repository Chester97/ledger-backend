import { Injectable } from '@nestjs/common';
import { InvoiceDto } from './dto/invoice.dto';
import { errorResponseObject } from './helpers/errorResponseObject';
import { nanoid } from 'nanoid';
import { isEmpty } from 'rambda';

const firstItem: InvoiceDto = {
  id: 'dek66dKCUdfhJR5LfqZZS',
  position: 5,
  dateOfEvent: '2021-02-23',
  registry: 'abc1234678',
  description: 'kulalalal',
  contractor: {
    name: 'Kamil',
    surname: 'Kowalczuk',
    companyName: 'KKF Company',
    nip: '54333222343',
    address: 'Pietkiewicza 4D/29',
  },
  income: {
    soldGoods: 232323,
    totalGoods: 3232323,
  },
  expenses: {
    other: 323,
    total: 3232,
  },
};

@Injectable()
export class InvoicesService {
  private invoiceDtos: InvoiceDto[] = [firstItem];

  addInvoice(invoice: Omit<InvoiceDto, 'id'>): any {
    const newInvoiceRecord: InvoiceDto = { id: nanoid(), ...invoice };
    const { registry } = newInvoiceRecord;
    if (this.isInvoiceExistByRegistry(registry)) {
      return errorResponseObject('This invoice is already exist in DB!');
    }
    console.log('DODAJE FAKTURE');
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
    if (isEmpty(invoices)) {
      this.invoiceDtos = invoices;
      return true;
    }
    return false;
  }
}
