import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Res,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { nanoid } from 'nanoid';
import { BodyRequestGuard } from '../guards/body.guard';
import { InvoicesService } from './invoices.service';
import { InvoiceDto } from './dto/invoice.dto';

type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  /* GET ALL INVOICES */
  @Get()
  invoices(@Res() res: Response): Response {
    // Here I should return all invoices with summary which is sum of my company collected invoices and sold invoices
    const invoices = this.invoicesService.getAllInvoices();
    return res.json(invoices);
  }

  /* GET SPECIFIC INVOICE */
  @Get('/:id')
  invoice(@Res() res: Response, @Param() param): Response {
    const { id } = param;
    const invoice = this.invoicesService.getSpecificInvoice(id);
    return res.json(invoice);
  }

  /* DELETE SPECIFIC BY ID(RECORD ID NOT COMPANY ID) INVOICE */
  @Delete('/:id')
  removeInvoice(@Res() res: Response, @Param() param) {
    const { id } = param;
    return res.send(`Record with ${id} id has been deleted`);
  }

  /* DELETE SPECIFIC BY DATE INVOICE */
  @Delete('/:date')
  removeAllInvoices(@Res() res: Response, @Param() param) {
    const { date } = param;
    return res.send(`Record with ${date} id has been deleted`);
  }

  /* ADD ONE OR MANY INVOICES */
  @Post('/add')
  addInvoice(@Res() res: Response, @Body() body: Omit<InvoiceDto, 'id'>) {
    const invoice = this.invoicesService.addInvoice(body);
    return res.json(invoice);
  }

  /* FILTER INVOICES BY PARAMS IN BODY */
  @Post('/search')
  @UseGuards(BodyRequestGuard)
  searchBy(@Res() res: Response, @Body() body) {
    return res.send(`You are filtering data by: ${JSON.stringify(body)}`);
  }

  /* UPDATE SPECIFIC INVOICE */
  @Patch('/update/:id')
  updateInvoice(
    @Res() res: Response,
    @Body() body: AtLeast<InvoiceDto, 'id'>,
    @Param() param: Pick<InvoiceDto, 'id'>,
  ) {
    const { id } = param;
    console.log(nanoid());
    return res.send(
      `Record with ${id} id has been updated by: ${JSON.stringify(body)}`,
    );
  }
}
