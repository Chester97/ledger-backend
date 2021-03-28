import { Controller, Get, Param, Res } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { Response } from 'express';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  foo(@Res() res: Response, @Param() param) {
    this.summaryService.foo();
    res.send('Siemka').status(200);
  }
}
