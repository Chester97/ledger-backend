import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoicesController } from './invoices/invoices.controller';
import { InvoicesService } from './invoices/invoices.service';
import { InvoicesModule } from './invoices/invoices.module';
import { SummaryService } from './summary/summary.service';

@Module({
  imports: [InvoicesModule],
  controllers: [AppController, InvoicesController],
  providers: [AppService, InvoicesService, SummaryService],
})
export class AppModule {}
