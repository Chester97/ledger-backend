import { Injectable } from '@nestjs/common';
import {
  AddInvoiceDto,
  IdInvoiceDto,
  InvoiceDto,
  UpdateInvoiceDto,
} from './dto/invoice.dto';
import { INVOICES_DATA } from './tests/invoicesData.mock';
import { nanoid } from 'nanoid';
import { isEmpty } from 'rambda';

@Injectable()
export class InvoicesService {
  private invoiceDtos: InvoiceDto[] = INVOICES_DATA;

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
    if (isEmpty(this.invoiceDtos)) return false;
    const invoices = this.invoiceDtos.filter(({ id }) => invoiceID !== id);
    this.invoiceDtos = invoices;
    return true;
  }

  updateSpecificInvoice(invoice: UpdateInvoiceDto, idObject: IdInvoiceDto) {
    const { id } = idObject;
    const updatedDB = this.invoiceDtos.map((item) =>
      item.id === id ? { ...item, ...invoice } : item,
    );
    this.invoiceDtos = updatedDB;
    return true;
  }
}
