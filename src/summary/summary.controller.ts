import { Controller, Get, Param, Res } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { Response } from 'express';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  async foo(@Res() res: Response, @Param() param) {
    await this.summaryService.sumExpensesAndIncomes();
    res.send('Siemka').status(200);
  }
}
