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
import { Response, Request } from 'express';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  invoices(@Res() res: Response): Response {
    return res.send('Here You have all saved invoices');
  }

  @Get('/:id')
  invoice(@Res() res: Response, @Param() param): Response {
    const { id } = param;
    return res.send(`Here You have an invoice by ${id} id.`);
  }

  // naprawić middleware
  @Delete('/:id')
  removeInvoice(@Res() res: Response, @Param() param) {
    const { id } = param;
    return res.send(`Record with ${id} id has been deleted`);
  }

  @Post('/add')
  addInvoice(@Res() res: Response, @Body() body) {
    return res.send('Success, record has been added');
  }

  @Patch('/update/:id')
  updateInvoice(@Res() res: Response, @Body() body, @Param() param) {
    const { id } = param;
    return res.send(
      `Record with ${id} id has been updated by: ${JSON.stringify(body)}`,
    );
  }
}
