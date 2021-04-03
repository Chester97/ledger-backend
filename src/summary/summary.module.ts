import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SummarySchema } from './dto/summary.dto';
import { InvoiceSchema } from '../invoices/dto/invoice.dto';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Summary', schema: SummarySchema }]),
    MongooseModule.forFeature([{ name: 'Invoice', schema: InvoiceSchema }]),
  ],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
