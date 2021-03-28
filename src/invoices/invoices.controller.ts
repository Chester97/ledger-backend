import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { InvoicesService } from './invoices.service';
import {
  AddInvoiceDto,
  IdInvoiceDto,
  UpdateInvoiceDto,
} from './dto/invoice.dto';
import { isEmpty } from 'rambda';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  /* GET ALL INVOICES */
  @Get()
  async invoices(@Res() res: Response): Promise<Response> {
    const invoices = await this.invoicesService.getAllInvoices();
    return res.json(invoices);
  }

  /* TEST_SUMMARY */
  @Get('/test')
  async summary(@Res() res: Response): Promise<any> {
    const summary = await this.invoicesService.sumExpenses();
    console.log(summary);
    res.send('Jest git').status(200);
  }

  /* GET SPECIFIC INVOICE */
  @Get('/:id')
  async invoice(@Res() res: Response, @Param() param): Promise<Response> {
    const { id } = param;
    const invoice = await this.invoicesService.getSpecificInvoice(id);
    return res.json(invoice);
  }

  /* DELETE SPECIFIC BY ID(RECORD ID NOT COMPANY ID) INVOICE */
  @Delete('/:id')
  async removeInvoice(@Res() res: Response, @Param() param) {
    const { id } = param;
    const deletedInvoice = await this.invoicesService.removeSpecificInvoice(id);
    console.log(deletedInvoice);
    return deletedInvoice ? res.status(204).json({}) : res.status(409).json({});
  }

  /* DELETE SPECIFIC BY DATE INVOICE */
  @Delete('/:date')
  removeAllInvoices(@Res() res: Response, @Param() param) {
    const { date } = param;
    return res.send(`Record with ${date} id has been deleted`);
  }

  /* ADD ONE OR MANY INVOICES */
  @Post('/add')
  async addInvoice(@Res() res: Response, @Body() body: AddInvoiceDto) {
    const invoice = await this.invoicesService.addInvoice(body);
    return invoice
      ? res.json(invoice)
      : res
          .json({ message: 'Invoice already exist', status: 'failed' })
          .status(404);
  }

  /* FILTER INVOICES BY PARAMS IN BODY */
  @Post('/search')
  searchBy(@Res() res: Response, @Body() body) {
    return res.send(`You are filtering data by: ${JSON.stringify(body)}`);
  }

  /* UPDATE SPECIFIC INVOICE */
  @Patch('/update/:id')
  async updateInvoice(
    @Res() res: Response,
    @Body() body: UpdateInvoiceDto,
    @Param() param: IdInvoiceDto,
  ) {
    if (isEmpty(body))
      return res.send({ message: 'Body should not  be empty' }).status(400);
    const result = await this.invoicesService.updateSpecificInvoice(
      body,
      param,
    );
    return result
      ? res.send({ message: 'Record Updated' }).status(200)
      : res.send({ message: 'Cannot update' }).status(400);
  }
}
