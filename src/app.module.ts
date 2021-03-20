import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoicesController } from './invoices/invoices.controller';
import { InvoicesService } from './invoices/invoices.service';
import { InvoicesModule } from './invoices/invoices.module';
import { SummaryService } from './summary/summary.service';

@Module({
  imports: [
    InvoicesModule,
    MongooseModule.forRoot(
      'mongodb+srv://user_test:narusaku404@cluster.ragh7.mongodb.net/ledger',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
