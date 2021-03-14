import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Res,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { InvoicesService } from './invoices.service';
import {
  AddInvoiceDto,
  IdInvoiceDto,
  UpdateInvoiceDto,
} from './dto/invoice.dto';

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
    const deletedInvoice = this.invoicesService.removeSpecificInvoice(id);
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
  @UsePipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: false,
      always: true,
      stopAtFirstError: true,
      validateCustomDecorators: true,
    }),
  )
  addInvoice(@Res() res: Response, @Body() body: AddInvoiceDto) {
    const invoice = this.invoicesService.addInvoice(body);
    return invoice
      ? res.json(invoice)
      : res
          .json({ message: 'Invoice already exist', status: 'failed' })
          .status(404);
  }

  /* FILTER INVOICES BY PARAMS IN BODY */
  @Post('/search')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: false,
      always: true,
      stopAtFirstError: true,
      validateCustomDecorators: true,
    }),
  )
  searchBy(@Res() res: Response, @Body() body) {
    return res.send(`You are filtering data by: ${JSON.stringify(body)}`);
  }

  /* UPDATE SPECIFIC INVOICE */
  @Patch('/update/:id')
  updateInvoice(
    @Res() res: Response,
    @Body() body: UpdateInvoiceDto,
    @Param() param: IdInvoiceDto,
  ) {
    const { id } = param;
    const result = this.invoicesService.updateSpecificInvoice(body, param);
    return result
      ? res.send({ message: 'Record Updated' }).status(200)
      : res.send({ message: 'Cannot update' }).status(400);
  }
}
